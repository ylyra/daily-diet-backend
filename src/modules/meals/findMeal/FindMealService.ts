import { knex } from "../../../database";

interface IRequest {
  id: string;
  user_id: string;
}

export class FindMealService {
  async execute({ id, user_id }: IRequest) {
    const meal = await knex("meals")
      .where({
        id,
        user_id,
      })
      .select("*")
      .first();

    return meal;
  }
}
