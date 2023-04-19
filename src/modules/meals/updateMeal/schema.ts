import { z } from "zod";
import { createMealSchema } from "../createMeal/schema";

export const updateMealSchema = createMealSchema;

export type UpdateMealSchema = z.infer<typeof updateMealSchema>;
