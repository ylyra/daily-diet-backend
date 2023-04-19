import type { FastifyReply, FastifyRequest } from "fastify";

interface IController {
  handle(request: FastifyRequest, reply: FastifyReply): Promise<any>;
}

export { IController };
