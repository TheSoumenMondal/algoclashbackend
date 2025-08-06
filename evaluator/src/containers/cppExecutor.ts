import { CPP_IMAGE } from "../utils/constant.js";
import createContainer from "./containerFactory.js";
import { decodeDockerStream } from "./dockerHelper.js";
import pullImageFromDockerHub from "./pullDockerContainer.js";
import CodeExecutorStrategy, {
  CodeExecutionResponse,
} from "../types/codeEvaluatorStrategy.js";

class CppExecutor implements CodeExecutorStrategy {
  async execute(
    code: string,
    inputTestCase: string,
    outputTestCase: string
  ): Promise<CodeExecutionResponse> {
    const rawlogBuffer: Buffer[] = [];
    await pullImageFromDockerHub(CPP_IMAGE);
    const escapedCode = code
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\$/g, "\\$");
    const escapedInput = inputTestCase
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\$/g, "\\$");


      console.log(code, inputTestCase, outputTestCase);


    const command = [
      "/bin/sh",
      "-c",
      `echo "${escapedCode}" > main.cpp && g++ main.cpp -o main && echo "${escapedInput}" | ./main`,
    ];

    const cppDockerContainer = await createContainer(CPP_IMAGE, command);

    console.log("C++ Docker container created successfully");

    await cppDockerContainer.start();

    const loggerStream = await cppDockerContainer.logs({
      follow: true,
      stdout: true,
      stderr: true,
      timestamps: false,
    });

    loggerStream.on("data", (chunk) => {
      rawlogBuffer.push(chunk);
    });

    try {
      const output = await this.fetchDecodedStreamOutput(
        loggerStream,
        rawlogBuffer
      );
      return {
        output,
        status: "SUCCESS",
      };
    } catch (error) {
      console.error("Error fetching Docker stream output:", error);
      return {
        output: error instanceof Error ? error.message : "Unknown error",
        status: "ERROR",
      };
    }finally {
      await cppDockerContainer.remove();
      console.log("C++ Docker container removed successfully");
    }
  }
  private async fetchDecodedStreamOutput(
    loggerStream: NodeJS.ReadableStream,
    rawlogBuffer: Buffer[]
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      loggerStream.on("end", () => {
        try {
          const completeBuffer = Buffer.concat(rawlogBuffer);
          const decodedStream = decodeDockerStream(completeBuffer);
          resolve(decodedStream.stdout + decodedStream.stderr);
        } catch (error) {
          reject(error);
        }
      });

      loggerStream.on("error", (error) => {
        reject(error);
      });
    });
  }
}

export default CppExecutor;
