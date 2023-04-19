import type { Tables } from "knex/types/tables";
import { knex } from "../../../database";

export class MealsMetricsService {
  private calculateMealsMetrics(meals: Tables["meals"][]) {
    const total = meals.length;

    const totalInDiet = meals.filter((meal) => meal.is_in_diet).length;

    const totalOffDiet = meals.filter((meal) => !meal.is_in_diet).length;

    let bestDaysSequence = 0;
    let currentDaysSequence = 0;

    for (let i = 0; i < meals.length; i++) {
      if (meals[i].is_in_diet) {
        currentDaysSequence++;
      } else {
        if (currentDaysSequence > bestDaysSequence) {
          bestDaysSequence = currentDaysSequence;
        }

        currentDaysSequence = 0;
      }
    }

    return {
      total,
      totalInDiet,
      totalOffDiet,
      bestDaysSequence,
    };
  }

  async execute(user_id: string) {
    const meals = await knex("meals").where({
      user_id,
    });

    if (meals.length > 0) {
      const mealsMetrics = this.calculateMealsMetrics(meals);

      return mealsMetrics;
    }

    return {
      total: 0,
      totalInDiet: 0,
      totalOffDiet: 0,
      bestDaysSequence: 0,
    };
  }
}
