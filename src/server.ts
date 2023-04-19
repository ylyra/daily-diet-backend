import Fastify from "fastify";
import { app } from "./app";
import { env } from "./env";
import { mealsRoutes } from "./routes/meals";
import { usersRoutes } from "./routes/users";

app.register(usersRoutes, {
  prefix: "/users",
});
app.register(mealsRoutes, {
  prefix: "/meals",
});

app.setErrorHandler(function (error, _, reply) {
  if (error instanceof Fastify.errorCodes.FST_ERR_BAD_STATUS_CODE) {
    // Log error
    this.log.error(error);
    // Send error response
    reply.status(500).send({ ok: false });
  } else {
    // fastify will use parent error handler to handle this
    reply.send(error);
  }
});

app.listen(
  {
    port: env.PORT,
  },
  (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log(`Server listening on ${address}`);
  }
);
