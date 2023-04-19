import type { FastifyInstance } from "fastify";
import { checkBearerTokenExists } from "../../middlewares/check-bearer-token-exists";
import { CreateUserController } from "../../modules/users/createUser/CreateUserController";

const createUserController = new CreateUserController();

export async function usersRoutes(app: FastifyInstance) {
  app.post(
    "/",
    {
      preHandler: [checkBearerTokenExists],
    },
    createUserController.handle
  );
}
