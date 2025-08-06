import { Worker } from "bullmq";
import redisConnection from "../config/redisConfig.js";
import axios from "axios";

function evaluationWorker(queue: string) {
  new Worker(
    queue,
    async (job) => {
      console.log(`Processing job ${job.id} in queue ${queue}`);
      console.log("Job data:", job.data);
      try {
        const response = await axios.post("http://localhost:3001", {
          userId: job.data.userId,
          payload: job.data,
        });
        console.log(response);
      } catch (error) {
        console.error(`Error processing job ${job.id}:`, error);
      }
    },
    { connection: redisConnection }
  );
}

export default evaluationWorker;
