import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { IController } from "../../../@types/types";
import { DeleteMealService } from "./DeleteMealService";

export class DeleteMealController implements IController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = z
      .object({
        id: z.string().uuid(),
      })
      .parse(request.params);

    const deleteMealService = new DeleteMealService();

    await deleteMealService.execute(id);

    return reply.status(204).send();
  }
}
