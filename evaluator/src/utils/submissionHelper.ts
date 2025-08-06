import submissionProducer from "../producers/submissionProducer.js";
import { SubmissionPayload } from "../types/submissionPayload.js";

export interface SubmissionRequest {
  userId: string;
  problemId: string;
  code: string;
  language: string;
  inputCase: string;
  outputCase: string;
}

export async function queueSubmission(submissionRequest: SubmissionRequest): Promise<void> {
  const submissionPayload: Record<string, SubmissionPayload> = {
    [submissionRequest.userId]: {
      code: submissionRequest.code,
      language: submissionRequest.language,
      inputCase: submissionRequest.inputCase,
      outputCase: submissionRequest.outputCase,
    }
  };

  await submissionProducer(submissionPayload);
}
