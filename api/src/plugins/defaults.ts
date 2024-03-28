const errorTypes = {
  main: {
    1000: "App Server Error, please contact admin",
    1001: "You exceeded the limit of requests per minute. Please try again after some time.",
  },
  http: {
    1101: "Unauthorized",
    1102: "Not authorized to access",
    1103: "unprocessable entity",
    1104: "Authentication failed",
  },
  auth: {
    1201: "Your session is expired, please login again ( token expired )",
    1202: "Your session is expired, please login again (user banned)",
    1203: "Your session is invalid (JWT verification error)",
    1204: "Your session is invalid (Error encountered while decoding JWT token)",
    1205: "Your session token is invalid (Invalid token)",
    1206: "You are Unauthorized, Please login",
    1207: "Authentication Error, User Not found",
    1208: "Your email provider is not accepted, please use another email provider or contact support at https://daisy.ac/discord.",
    1209: "Your username is not support, please change the letters in your username or contact support at https://daisy.ac/discord.",
    1210: "Your password is not strong enough, please use a stronger password or contact support at https://daisy.ac/discord.",
    1211: "The username you provided is already being used by another account, please use another username or contact support at https://daisy.ac/discord.",
  },
  session: {
    1301: "Invalid Credentials",
    1302: "Invalid email",
    1303: "Login Error",
    1304: "Your Account is disabled by the admin.",
    1305: "Wrong confirmation code! Try again.",
    1306: "Invalid email or password",
    1307: "Your account already exists in the app, please try to login.",
    1308: "Your request is invalid or your request time is over, please try again.",
    1309: "You are not authorized to access this app",
    1310: "Your email is still not confirmed, please confirm your email",
    1311: "Email link has expired",
    1312: "This number has already been registered",
    1313: "Confirmation code is expired! Try again",
    1314: "Your account was blocked by Admin. Please contact admin at https://daisy.ac/discord",
  },
};

import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

declare module "fastify" {
  interface FastifyReply {
    errorTypes: typeof errorTypes;
  }
}

const errorTypesPlugin: FastifyPluginAsync = async (fastify, options) => {
  fastify.decorateReply("errorTypes", { getter: () => errorTypes });
};

export default fp(errorTypesPlugin, "4.x");
