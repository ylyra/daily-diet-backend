import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { IController } from "../../../@types/types";
import { UpdateMealService } from "./UpdateMealService";
import { updateMealSchema } from "./schema";

export class UpdateMealController implements IController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = z
      .object({
        id: z.string().uuid(),
      })
      .parse(request.params);
    const { description, is_in_diet, name, created_at } =
      updateMealSchema.parse(request.body);

    const updateMealService = new UpdateMealService();

    await updateMealService.execute({
      id,
      description,
      is_in_diet,
      name,
      created_at,
    });

    return reply.status(204).send();
  }
}
