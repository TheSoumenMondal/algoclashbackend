import { FastifyInstance } from "fastify";
import SubmissionRepository from "./submission.repository.js";
import Submission from "../models/submissionModel.js";
import fastifyPlugin from "fastify-plugin";

async function repositoryPlugin(fastify: FastifyInstance) {
  const submissionRepository = new SubmissionRepository(Submission);
  fastify.decorate("submissionRepository", submissionRepository);
}

export default fastifyPlugin(repositoryPlugin);