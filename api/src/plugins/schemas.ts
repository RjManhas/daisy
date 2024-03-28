import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

const addSchemas: FastifyPluginAsync = async (fastify, options) => {
  fastify.addSchema({
    $id: "defaultResponse",
    type: "object",
    properties: {
      success: { type: "boolean" },
      message: { type: "string" },
      data: { type: "object", additionalProperties: true },
    },
  });

  fastify.addSchema({
    $id: "errorResponse",
    type: "object",
    properties: {
      success: { type: "boolean" },
      message: { type: "string" },
      error_code: { type: "number" },
      data: { type: "object", additionalProperties: true },
    },
  });

  fastify.addSchema({
    $id: "userAuthResponse",
    type: "object",
    required: ["username", "password"],
    properties: {
      username: { type: "string" },
      password: { type: "string" },
    },
  });
};

export default fp(addSchemas, "4.x");
