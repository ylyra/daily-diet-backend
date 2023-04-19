import { knex } from "../../../database";

export class ListMealsService {
  async execute(id: string) {
    const meals = await knex("meals").where("user_id", id).select("*");

    return meals;
  }
}
