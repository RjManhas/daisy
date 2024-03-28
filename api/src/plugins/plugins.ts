import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import cors from "@fastify/cors";
import fastifyPrismaClient from "fastify-prisma-client";

const addRoutes: FastifyPluginAsync = async (fastify, options) => {
  fastify.register(cors);
  fastify.register(require("fastify-user-agent"));
  fastify.register(import("@fastify/helmet"));
  fastify.register(import("@web-server-userland/fastify-request-id"));
  fastify.register(import("./defaults"));
  fastify.register(import("./schemas"));
  fastify.register(import("./hooks"));
  fastify.register(import("./routes"));
  fastify.register(import("./config"));
  fastify.register(fastifyPrismaClient);
};
export default fp(addRoutes, "4.x");
