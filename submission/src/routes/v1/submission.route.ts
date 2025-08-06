import { FastifyInstance } from "fastify";
import {
  createSubmission,
  pingController,
} from "../../controllers/submission.controller.js";
import { pingRouteSchema, createSubmissionSchema } from "../../schema/submissionSchema.js";

export async function submissionRoute(fastify: FastifyInstance) {
  fastify.get(
    "/ping",
    { schema: { response: pingRouteSchema } },
    pingController
  );

  fastify.post(
    "/", 
    { schema: createSubmissionSchema }, 
    createSubmission
  );
}
