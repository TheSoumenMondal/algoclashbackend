import { FastifyInstance } from "fastify";
import { submissionRoute } from "./submission.route.js";

export async function v1Route(fastify : FastifyInstance){
    fastify.register(submissionRoute,{prefix : "/submissions"})
}