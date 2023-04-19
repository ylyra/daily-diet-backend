import type { FastifyReply, FastifyRequest } from "fastify";
import { IController } from "../../../@types/types";
import { ListMealsService } from "./ListMealsService";

export class ListMealsController implements IController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const user_id = request.user.id;

    const listMealsService = new ListMealsService();

    const meals = await listMealsService.execute(user_id);

    return {
      ok: true,
      meals,
    };
  }
}
