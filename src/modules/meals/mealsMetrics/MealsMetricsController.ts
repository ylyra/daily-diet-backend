import type { FastifyReply, FastifyRequest } from "fastify";
import { IController } from "../../../@types/types";
import { MealsMetricsService } from "./MealsMetricsService";

export class MealsMetricsController implements IController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const user_id = request.user.id;

    const mealsMetricsService = new MealsMetricsService();

    const metrics = await mealsMetricsService.execute(user_id);

    return {
      metrics,
    };
  }
}
