import { FastifyInstance } from "fastify";

import fastifyPlugin from "fastify-plugin";
import SubmissionService from "./submission.service.js";

export async function ServicePlugin(fastify: FastifyInstance) {
  const submissionService = new SubmissionService(fastify.submissionRepository);
  fastify.decorate("submissionService", submissionService);
}

export default fastifyPlugin(ServicePlugin);
