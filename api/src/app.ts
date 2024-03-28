import Fastify from "fastify";
import { startText } from "./services/logger/";
import { embedType } from "./interfaces";
import * as dotenv from "dotenv";
import config from "./config";
import logger from "./services/logger/";

dotenv.config();

declare module "fastify" {
  interface FastifyBaseLogger {
    success: Function;
    request: Function;
    system: Function;
    discord: {
      info: (
        o: unknown,
        embed: embedType,
        ...n: (undefined | unknown[])[]
      ) => void;
      error: (
        o: unknown,
        embed: embedType,
        ...n: (undefined | unknown[])[]
      ) => void;
      warn: (
        o: unknown,
        embed: embedType,
        ...n: (undefined | unknown[])[]
      ) => void;
      fatal: (
        o: unknown,
        embed: embedType,
        ...n: (undefined | unknown[])[]
      ) => void;
    };
  }
}

const fastify = Fastify({
  // @ts-ignore
  logger: logger,
  disableRequestLogging: true,
});

fastify.register(import("./plugins/plugins"));

// the start function
const start = async () => {
  try {
    startText();

    await fastify.ready();
    await fastify.listen({ port: config.port, host: config.host });

    await fastify.log.discord.info(
      `Server started on ${config.host}:${config.port}`,
      {
        title: "Server Started",
        description: "Server started on " + config.host + ":" + config.port,
      },
    );
  } catch (err) {
    fastify.log.fatal(err);
    process.exit(1);
  }
};

module.exports = start();
