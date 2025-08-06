import Dockerode from "dockerode";
import CodeExecutorStrategy, {
  CodeExecutionResponse,
} from "../types/codeEvaluatorStrategy.js";
import { JAVA_IMAGE } from "../utils/constant.js";
import createContainer from "./containerFactory.js";
import { decodeDockerStream } from "./dockerHelper.js";
import pullImageFromDockerHub from "./pullDockerContainer.js";

class JavaExecutor implements CodeExecutorStrategy {
  async execute(
    code: string,
    inputTestCase: string,
    outputTestCase: string
  ): Promise<CodeExecutionResponse> {
    const rawlogBuffer: Buffer[] = [];
    await pullImageFromDockerHub(JAVA_IMAGE);

    console.log(code, inputTestCase, outputTestCase);

    const escapedCode = code
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\$/g, "\\$");
    const escapedInput = inputTestCase
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\$/g, "\\$");

    const command = [
      "/bin/sh",
      "-c",
      `echo "${escapedCode}" > Main.java && javac Main.java && echo "${escapedInput}" | java Main`,
    ];

    const javaDockerContainer = await createContainer(JAVA_IMAGE, command);

    console.log("Java Docker container created successfully");
    await javaDockerContainer.start();

    const loggerStream = await javaDockerContainer.logs({
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
        javaDockerContainer
      );

      if (dockerStreamOutput.trim() === outputTestCase.trim()) {
        console.log("Java code executed successfully");
        console.log("Output:", dockerStreamOutput);
        console.log("Expected Output:", outputTestCase);
        console.log({
          output: dockerStreamOutput,
          status: "PASSED",
        });
        return {
          output: dockerStreamOutput,
          status: "PASSED",
        };
      } else {
        console.log("Java code execution failed");
        console.log("Output:", dockerStreamOutput);
        console.log("Expected Output:", outputTestCase);
        console.log({
          output: dockerStreamOutput,
          status: "FAILED",
        });
        return {
          output: dockerStreamOutput,
          status: "FAILED",
        };
      }
    } catch (error) {
      console.error("Error fetching Docker stream output:", error);
      if (error === "Time limit exceeded") {
        await javaDockerContainer.kill();
        return {
          output: error as string,
          status: "TIME_LIMIT_EXCEEDED",
        };
      }
      return {
        output: "An error occurred during execution",
        status: "ERROR",
      };
    } finally {
      await javaDockerContainer.remove();
    }
  }

  private async fetchDecodedStreamOutput(
    loggerStream: NodeJS.ReadableStream,
    rawlogBuffer: Buffer[],
    container: Dockerode.Container
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(async () => {
        console.log("Timer called");
        container.stop();
        reject("Time limit exceeded");
      }, 2000);
      loggerStream.on("end", () => {
        clearTimeout(timer);
        const completeBuffer = Buffer.concat(rawlogBuffer);
        const decodedStream = decodeDockerStream(completeBuffer);
        if (decodedStream.stderr) {
          reject(decodedStream.stderr);
        } else {
          resolve(decodedStream.stdout);
        }
      });
    });
  }
}

export default JavaExecutor;
