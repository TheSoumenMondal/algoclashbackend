import dotenv from "dotenv";

dotenv.config();

export const serverConfig = {
  PORT: process.env.PORT || 3000,
  REDIS_HOST: process.env.REDIS_HOST || "localhost",
  REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
};
