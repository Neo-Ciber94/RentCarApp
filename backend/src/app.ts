import "reflect-metadata";
import express from "express";
import { CorsOptions } from "cors";
import { useExpressServer } from "routing-controllers";
import { createConnection } from "typeorm";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import session from "express-session";
import { SESSION_EXPIRATION, SESSION_SECRET } from "@shared/config";
import { TypeormStore } from "typeorm-store";
import { UserSession } from "./entities";

// Server port
const PORT = process.env.PORT || 8000;

// Create express application
const app = express();

// Set express middlewares
app.use(morgan("dev"));
app.use(cookieParser());
app.use(
  rateLimit({
    windowMs: 1000 * 60 * 5, // 1min
    max: 100, // 100 request max
  })
);

// Main async function
async function main() {
  // Initialize database
  await createConnection()
    .then(async (connection) => {
      await connection.runMigrations();
      console.log(`Connected to database: ${connection.driver.database}`);
    })
    .catch((e) => console.error(e));

  // Setup session
  app.use(
    session({
      secret: SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
      store: new TypeormStore({ repository: UserSession.getRepository() }),
      cookie: {
        httpOnly: true,
        maxAge: new Date(Date.now() + SESSION_EXPIRATION).getTime(),
      },
    })
  );

  // Cross origin resources sharing policy configuration
  const corsOptions: CorsOptions = {
    origin: "*",
  };

  // Initialize the routing controllers
  useExpressServer(app, {
    cors: corsOptions,
    routePrefix: "/api",
    middlewares: [__dirname + "/middlewares/*.ts"],
    controllers: [__dirname + "/controllers/*.ts"],
  });

  // Start listeting
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

main().catch((e) => console.error(e));
