import { Knex } from "knex";

declare module "knex/types/tables" {
  export interface Tables {
    users: {
      id: string;
      name: string;
      email: string;
      password: string;
      created_at: Date;
      updated_at: Date;
    };
    meals: {
      id: string;
      name: string;
      description: string;
      user_id: string;
      is_in_diet: boolean;
      created_at: Date;
      updated_at: Date;
    }
  }
}
