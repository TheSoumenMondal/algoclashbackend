import { Job } from "bullmq";
import { IJob } from "../types/bullMQJobDefination.js";

class SampleJob implements IJob {
  name: string;
  payload: Record<string, unknown>;
  constructor(payload: Record<string, unknown>) {
    this.name = this.constructor.name;
    this.payload = payload;
  }

  handler(job?: Job): void {
    console.log(`Handling job: ${this.name}`);
    console.log(`Job details:`, job?.data);
  }

  failed(job?: Job): void {
    console.error(`Job failed: ${this.name}`, job);
  }
}


export default SampleJob;