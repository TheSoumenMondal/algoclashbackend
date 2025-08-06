import { FastifyInstance } from "fastify";
import { v1Route } from "./v1/index.js";

export async function apiRoute(fastify : FastifyInstance){
    fastify.register(v1Route,{prefix : "/v1"})
}