import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

declare module "fastify" {
  interface FastifyRequest {
    client_id: string;
    client_secret: string;
  }
}

const configPlugin: FastifyPluginAsync = async (fastify, options) => {
  const oauthInfo = {
    client_id: "1209401264773926922",
    client_secret: "12tKyLJPBoc0dP3bHnVH7YCxQWiOq88U",
  };
  fastify.decorateRequest("client_id", { getter: () => oauthInfo.client_id });
  fastify.decorateRequest("client_secret", {
    getter: () => oauthInfo.client_secret,
  });
};

export default fp(configPlugin, "4.x");
