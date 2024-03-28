import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

const addHooks: FastifyPluginAsync = async (fastify, options) => {
  fastify.addHook("onRoute", (routeOptions) => {
    fastify.log.system(
      "Route: " +
        routeOptions.url +
        " Method: " +
        routeOptions.method +
        " Loaded",
    );
  });

  fastify.addHook("onRequest", (request, reply, done) => {
    fastify.log.request(
      "Request: " +
        request.id +
        " Method: " +
        request.method +
        " URL: " +
        request.url +
        " IP: " +
        request.ip +
        " User Agent: " +
        request.headers["user-agent"],
    );
    done();
  });

  fastify.addHook("onError", async (request, reply, error) => {
    fastify.log.error(`Error: ${error.message}`);
    reply
      .status(500)
      .send({
        message: { reply: reply.errorTypes.main[1000] },
        success: false,
        data: {},
        error_code: 1000,
      });
  });
};

export default fp(addHooks, "4.x");
