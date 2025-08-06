import { FastifyInstance } from "fastify";
import SubmissionService from "../services/submission.service.js";
import SubmissionRepository from "../repository/submission.repository.js";
import { Redis } from "ioredis";

declare module "fastify" {
  interface FastifyInstance {
    submissionService: SubmissionService;
    submissionRepository: SubmissionRepository;
    config: {
      PORT: string;
      REDIS_HOST: string;
      REDIS_PORT: number;
    };
    redisConnection: Redis;
  }
}
