import { Job, Worker } from "bullmq";
import redisConnection from "../config/redisConfig.js";
import SubmissionJob from "../job/submissionJob.js";

function submissionWorker(queueName: string) {
  const worker = new Worker(
    queueName,
    async (job: Job) => {
      if (job.name === "SubmissionJob") {
        const submissionJobInstance = new SubmissionJob(job.data);
        await submissionJobInstance.handler(job);
        return true;
      }
      throw new Error(`Unknown job type: ${job.name}`);
    },
    {
      connection: redisConnection,
    }
  );

  worker.on("completed", (job) => {
    console.log(`Job ${job.id} completed successfully`);
  });

  worker.on("failed", (job, err) => {
    console.error(`Job ${job?.id} failed:`, err.message);
  });

  worker.on("error", (err) => {
    console.error("Worker error:", err);
  });

  return worker;
}

export default submissionWorker;
