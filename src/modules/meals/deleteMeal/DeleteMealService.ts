import { knex } from "../../../database";

export class DeleteMealService {
  async execute(id: string) {
    await knex("meals").delete().where({ id });

    return;
  }
}
