import { Queue } from "bullmq";
import redisConnection from "../config/redisConfig.js";
import { QUEUE } from "../utils/constant.js";

export default new Queue(QUEUE.EVALUATION_QUEUE, {
  connection: redisConnection,
});
