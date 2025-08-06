import submissionQueue from "../queues/submissionQueue.js";
import { SubmissionPayload } from "../types/submissionPayload.js";
import { SUBMISSION_JOB } from "../utils/constants.js";

export async function submissionQueueProducer(
  payload: Record<string, SubmissionPayload>
) {
  console.log("Trying to add job to submission queue with payload:", payload);
  await submissionQueue.add(SUBMISSION_JOB, payload);
  console.log("Job added to SubmissionQueue:", payload);
}
