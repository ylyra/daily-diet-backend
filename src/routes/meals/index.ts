import type { FastifyInstance } from "fastify";
import { checkBearerTokenExists } from "../../middlewares/check-bearer-token-exists";
import { CreateMealController } from "../../modules/meals/createMeal/CreateMealController";
import { DeleteMealController } from "../../modules/meals/deleteMeal/DeleteMealController";
import { FindMealController } from "../../modules/meals/findMeal/FindMealController";
import { ListMealsController } from "../../modules/meals/listMeals/ListMealsController";
import { MealsMetricsController } from "../../modules/meals/mealsMetrics/MealsMetricsController";
import { UpdateMealController } from "../../modules/meals/updateMeal/UpdateMealController";

const createMealController = new CreateMealController();
const listMealsController = new ListMealsController();
const findMealController = new FindMealController();
const updateMealController = new UpdateMealController();
const deleteMealController = new DeleteMealController();
const mealsMetricsController = new MealsMetricsController();

export async function mealsRoutes(app: FastifyInstance) {
  app.addHook("preHandler", checkBearerTokenExists);

  app.get("/", listMealsController.handle);
  app.get("/:id", findMealController.handle);
  app.get("/metrics", mealsMetricsController.handle);
  app.post("/", createMealController.handle);
  app.patch("/:id", updateMealController.handle);
  app.delete("/:id", deleteMealController.handle);
}
