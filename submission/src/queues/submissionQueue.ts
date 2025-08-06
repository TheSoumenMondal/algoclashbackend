import { Queue } from "bullmq";
import redisConnection from "../config/redisConfig.js";
import { SUBMISSION_QUEUE } from "../utils/constants.js";

export default new Queue(SUBMISSION_QUEUE, { connection: redisConnection });
