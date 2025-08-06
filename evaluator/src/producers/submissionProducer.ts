import submissionQueue from "../queue/submissionQueue.js";
import { SubmissionPayload } from "../types/submissionPayload.js";

export default async function (payload: Record<string, SubmissionPayload>) {
  await submissionQueue.add("SubmissionJob", payload);
}
