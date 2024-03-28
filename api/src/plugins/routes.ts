import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import v1Routes from "../api/v1/routes/";

const addRoutes: FastifyPluginAsync = async (fastify, options) => {
  fastify.register(v1Routes, { prefix: "/v1" });
};
export default fp(addRoutes, "4.x");
