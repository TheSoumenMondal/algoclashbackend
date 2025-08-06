import { Job, Worker } from "bullmq";
import SampleJob from "../job/sampleJob.js";
import redisConnection from "../config/redisConfig.js";

function sampleWorker(queueName: string) {
  new Worker(
    queueName,
    async (job: Job) => {
      if (job.name === "sampleJob") {
        const sampleJobInstance = new SampleJob(job.data);
        sampleJobInstance.handler(job);
      }
    },
    {
      connection: redisConnection,
    }
  );
}

export default sampleWorker;
