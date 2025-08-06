import { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import { apiRoute } from "./routes/index.js";
import ServicePlugin from "./services/servicePlugin.js";
import repositoryPlugin from "./repository/repositoryPlugin.js";
import { connectDB } from "./config/dbConfig.js";

const app = async (fastify: FastifyInstance, _options: any) => {
  // Connect to MongoDB
  await connectDB();
  
  await fastify.register(repositoryPlugin);
  await fastify.register(ServicePlugin);
  await fastify.register(apiRoute, { prefix: "/api" });
};

export default fastifyPlugin(app);
