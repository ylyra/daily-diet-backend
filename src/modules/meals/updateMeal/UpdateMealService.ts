import { randomUUID } from "node:crypto";

import { knex } from "../../../database";
import { UpdateMealSchema } from "./schema";

export class UpdateMealService {
  async execute({
    created_at,
    description,
    is_in_diet,
    name,
    id,
  }: UpdateMealSchema & { id: string }) {
    await knex("meals")
      .update({
        id: randomUUID(),
        name,
        description,
        is_in_diet,
        created_at: created_at,
      })
      .where({ id });

    return;
  }
}
