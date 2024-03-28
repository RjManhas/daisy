import { FastifyInstance } from "fastify";

async function v1Routes(fastify: FastifyInstance) {
  fastify.register(require("./health/index"), { prefix: "/health" });
  fastify.register(require("./auth/index"), { prefix: "/auth" });
}
export = v1Routes;
