import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { IController } from "../../../@types/types";
import { FindMealService } from "./FindMealService";

export class FindMealController implements IController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const user_id = request.user.id;
    const { id } = z
      .object({
        id: z.string().uuid(),
      })
      .parse(request.params);

    const findMealService = new FindMealService();

    const meal = await findMealService.execute({ id, user_id });

    return {
      ok: true,
      meal,
    };
  }
}
