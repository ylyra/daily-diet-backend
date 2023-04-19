import type { FastifyReply, FastifyRequest } from "fastify";
import { IController } from "../../../@types/types";
import { CreateMealService } from "./CreateMealService";
import { createMealSchema } from "./schema";

export class CreateMealController implements IController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { description, is_in_diet, name, created_at } =
      createMealSchema.parse(request.body);

    const createMealService = new CreateMealService();

    const meal = await createMealService.execute({
      description,
      is_in_diet,
      name,
      created_at,
    });

    return {
      meal,
    };
  }
}
