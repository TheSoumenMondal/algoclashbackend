import { FastifyReply, FastifyRequest } from "fastify";
import { SubmissionType } from "../types/submissionType.js";

export async function pingController(_: FastifyRequest, reply: FastifyReply) {
  await reply.code(200).send({
    message: "Server is up and running",
    timestamp: new Date(),
  });
}

export async function createSubmission(req: FastifyRequest, res: FastifyReply) {
  const response = await req.server.submissionService.addSubmission(
    req.body as Partial<SubmissionType>
  );
  await res.code(201).send(response);
}
