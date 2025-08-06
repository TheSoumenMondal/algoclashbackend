import Dockerode from "dockerode";
import CodeExecutorStrategy, {
  CodeExecutionResponse,
} from "../types/codeEvaluatorStrategy.js";
import { PYTHON_IMAGE } from "../utils/constant.js";
import createContainer from "./containerFactory.js";
import { decodeDockerStream } from "./dockerHelper.js";
import pullImageFromDockerHub from "./pullDockerContainer.js";

class PythonExecutor implements CodeExecutorStrategy {
  async execute(
    code: string,
    inputTestCase: string,
    outputTestCase: string
  ): Promise<CodeExecutionResponse> {
    const rawlogBuffer: Buffer[] = [];
    await pullImageFromDockerHub(PYTHON_IMAGE);
    const escapedCode = code
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\n/g, "\\n");

    console.log(code, inputTestCase, outputTestCase);

    const escapedTestCases = inputTestCase.replace(/"/g, '\\"');

    const command = [
      "/bin/sh",
      "-c",
      `printf "${escapedCode}" > main.py && echo "${escapedTestCases}" | python3 main.py`,
    ];

    const pythonDockerContainer = await createContainer(PYTHON_IMAGE, command);

    console.log("Python Docker container created successfully");
    await pythonDockerContainer.start();

    const loggerStream = await pythonDockerContainer.logs({
      follow: true,
      stdout: true,
      stderr: true,
      timestamps: false,
    });

    loggerStream.on("data", (chunk) => {
      rawlogBuffer.push(chunk);
    });

    try {
      const dockerStreamOutput = await this.fetchDecodedStreamOutput(
        loggerStream,
        rawlogBuffer,
        pythonDockerContainer
      );

      if (dockerStreamOutput.trim() === outputTestCase.trim()) {
        console.log("Python code executed successfully");
        console.log("Output:", dockerStreamOutput);
        console.log("Expected Output:", outputTestCase);
        return {
          output: dockerStreamOutput,
          status: "COMPLETED",
        };
      } else {
        console.error("Python code execution failed");
        console.error("Output:", dockerStreamOutput);
        console.error("Expected Output:", outputTestCase);
        return {
          output: dockerStreamOutput,
          status: "FAILED",
        };
      }
    } catch (error) {
      console.error("Error fetching Docker stream output:", error);
      return {
        output: error instanceof Error ? error.message : "Unknown error",
        status: "ERROR",
      };
    } finally {
      await pythonDockerContainer.remove();
    }
  }

  private fetchDecodedStreamOutput(
    loggerStream: NodeJS.ReadableStream,
    rawlogBuffer: Buffer[],
    container: Dockerode.Container
  ): Promise<string> {
    return new Promise((res, rej) => {
      loggerStream.on("end", () => {
        const completeBuffer = Buffer.concat(rawlogBuffer);
        const decodedStream = decodeDockerStream(completeBuffer);
        if (decodedStream.stderr) {
          rej(decodedStream.stderr);
        } else {
          res(decodedStream.stdout);
        }
      });
    });
  }
}

export default PythonExecutor;
