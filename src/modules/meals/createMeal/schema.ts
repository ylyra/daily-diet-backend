import { z } from "zod";

export const createMealSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  is_in_diet: z.boolean().default(false),
  created_at: z.coerce
    .date()
    .optional()
    .default(() => new Date()),
});

export type CreateMealSchema = z.infer<typeof createMealSchema>;
