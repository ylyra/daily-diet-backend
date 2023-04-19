import { randomUUID } from "node:crypto";

import { knex } from "../../../database";
import { CreateMealSchema } from "./schema";

export class CreateMealService {
  async execute({
    created_at,
    description,
    is_in_diet,
    name,
  }: CreateMealSchema) {
    return await knex("meals")
      .insert({
        id: randomUUID(),
        name,
        description,
        is_in_diet,
        created_at: created_at,
      })
      .returning("*")
      .first();
  }
}
