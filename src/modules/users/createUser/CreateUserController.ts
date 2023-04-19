import type { FastifyReply, FastifyRequest } from "fastify";
import { sign } from "jsonwebtoken";

import { IController } from "../../../@types/types";
import { env } from "../../../env";
import { CreateUserService } from "./CreateUserService";
import { createUserSchema } from "./schema";

export class CreateUserController implements IController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = createUserSchema.parse(request.body);

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email, password });

    if (!user) return reply.status(400).send({ error: "User already exists" });

    const token = sign({}, env.JWT_SECRET, {
      subject: user.id,
      expiresIn: "30d",
    });

    return reply.status(201).send({
      token,
    });
  }
}
