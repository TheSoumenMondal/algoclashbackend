import dotenv from "dotenv";

dotenv.config();

const serverConfig = {
  PORT: process.env.PORT || 4000,
  REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  MONGODB_URI: process.env.MONGODB_URI,
  PROBLEM_ADMIN_SERVICE_URL: process.env.PROBLEM_SERVICE_URL!,
};

export default serverConfig;
