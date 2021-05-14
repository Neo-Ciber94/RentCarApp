import "reflect-metadata";
import express from "express";
import { CorsOptions } from "cors";
import { useExpressServer } from "routing-controllers";

const PORT = process.env.PORT || 8000;
const app = express();

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
