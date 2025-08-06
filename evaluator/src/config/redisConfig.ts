import { Redis } from "ioredis";
import { serverConfig } from "./serverConfig.js";

const RedisConfig = {
  host: serverConfig.REDIS_HOST,
  port: serverConfig.REDIS_PORT,
  maxRetriesPerRequest: null,
};


const redisConnection = new Redis(RedisConfig);

export default redisConnection;