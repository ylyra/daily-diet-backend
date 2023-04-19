import { hash } from "bcrypt";
import { randomUUID } from "node:crypto";

import { knex } from "../../../database";
import { CreateUserSchema } from "./schema";

export class CreateUserService {
  async execute({ email, name, password }: CreateUserSchema) {
    const passwordHash = await hash(password, 8);

    return await knex("users")
      .insert({
        id: randomUUID(),
        name,
        email,
        password: passwordHash,
      })
      .returning("*")
      .first();
  }
}
