// fastify type import
import { FastifyInstance } from "fastify";

// handlers imports
import registerHandler from "../../controllers/auth/register";

// helper imports

// health routes function
async function authRoutes(server: FastifyInstance) {
  // health route get method
  server.post("/register/", {
    schema: {
      response: {
        200: { $ref: "defaultResponse" },
        500: { $ref: "errorResponse" },
      },
      body: {
        type: "object",
        required: ["username", "password"], // Make username and password required
        properties: {
          username: { type: "string" },
          password: { type: "string" }, // Assuming password is a string
        },
      },
    },
    handler: registerHandler,
  });
}

export default authRoutes;
