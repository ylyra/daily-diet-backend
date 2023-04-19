import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email().min(3).max(255),
  password: z.string().min(3).max(255),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
