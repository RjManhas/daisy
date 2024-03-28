// fastify types import
import { FastifyRequest, FastifyReply } from "fastify";

// heath handler function
async function registerHandler(
  request: FastifyRequest<{
    Body: {
      username: string;
      password: string;
    };
  }>,
  reply: FastifyReply,
) {
  try {

		const {username, password} = await request.body;

    return reply.status(200).send({ message: "ok", success: true, data: {username, password} });
  } catch (error: any) {
    request.log.error(error);
    return reply.status(500).send({
      message: reply.errorTypes.main[1000],
      success: false,
      data: {},
      error_code: 1000,
    });
  }
}

export default registerHandler;
