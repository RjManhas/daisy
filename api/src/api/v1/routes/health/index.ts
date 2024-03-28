// fastify type import
import { FastifyInstance } from "fastify";

// handlers imports
import healthHandler from "../../controllers/health";

// helper imports

// health routes function
async function healthRoutes(server: FastifyInstance) {
  // health route get method
  server.get("/", {
    schema: {
      response: {
        200: { $ref: "defaultResponse" },
        500: { $ref: "errorResponse" },
      },
    },
    handler: healthHandler,
  });
}

export default healthRoutes;
