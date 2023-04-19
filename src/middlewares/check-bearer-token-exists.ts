import type { FastifyReply, FastifyRequest } from "fastify";
import { verify } from "jsonwebtoken";
import { env } from "../env";

interface IPayload {
  sub: string;
}

export async function checkBearerTokenExists(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { authorization } = request.headers;

  if (!authorization) {
    return reply.status(401).send({
      ok: false,
      message: "Token not provided",
    });
  }

  const [, token] = authorization.split(" ");

  if (!token) {
    return reply.status(401).send({
      ok: false,
      message: "Token not provided",
    });
  }

  try {
    const { sub: user_id } = verify(token, env.JWT_SECRET) as IPayload;

    request.user = {
      id: user_id,
    };
  } catch {
    return reply.status(401).send({
      ok: false,
      message: "Session expired",
    });
  }
}
