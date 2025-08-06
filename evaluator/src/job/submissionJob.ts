import { Job } from "bullmq";
import { IJob } from "../types/bullMQJobDefination.js";
import { SubmissionPayload } from "../types/submissionPayload.js";
import createExecutor from "../utils/executorFactory.js";
import { CodeExecutionResponse } from "../types/codeEvaluatorStrategy.js";
import evaluationProducer from "../producers/evaluationProducer.js";

class SubmissionJob implements IJob {
  name: string;
  payload: Record<string, SubmissionPayload>;
  constructor(payload: Record<string, SubmissionPayload>) {
    (this.name = this.constructor.name), (this.payload = payload);
  }
  async handler(job?: Job) {
    if (job) {
      const keys = Object.keys(this.payload);

      let codeLanguage, code, inputTestCase, outputTestCase;

      if (
        keys.length > 0 &&
        this.payload[keys[0]] &&
        typeof this.payload[keys[0]] === "object"
      ) {
        // Nested structure: { submissionID: { code, language, inputCase, outputCase } }
        const key = keys[0];
        const submissionData = this.payload[key];
        codeLanguage = submissionData.language;
        code = submissionData.code;
        inputTestCase = submissionData.inputCase;
        outputTestCase = submissionData.outputCase;
      } else {
        // Direct structure: { code, language, inputCase, outputCase }
        codeLanguage = (this.payload as any).language;
        code = (this.payload as any).code;
        inputTestCase = (this.payload as any).inputCase;
        outputTestCase = (this.payload as any).outputCase;
      }

      // Validate required fields
      if (!codeLanguage || !code) {
        throw new Error("Missing required fields: code and language");
      }

      if (!inputTestCase || !outputTestCase) {
        throw new Error("Missing input or output test cases");
      }

      const strategy = createExecutor(codeLanguage);

      if (strategy !== null) {
        const response: CodeExecutionResponse = await strategy.execute(
          code,
          inputTestCase,
          outputTestCase
        );

        evaluationProducer({
          response,
          userId: this.payload[keys[0]].userId,
          submissionId: this.payload[keys[0]].submissionId,
        });

        if (response.status === "COMPLETED" || response.status === "SUCCESS") {
          console.log("Code executed successfully");
          console.log("Your code output");
          console.log(response.output);
        } else {
          console.log("Code execution failed:", response.output);
        }

        return response;
      } else {
        throw new Error(
          `No execution strategy found for language: ${codeLanguage}`
        );
      }
    }
  }
  failed(job?: Job) {
    console.log(job?.name + " failed.");
  }
}

export default SubmissionJob;
