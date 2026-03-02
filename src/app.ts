import express from "express";
import cors from "cors";
import { router } from "./presentation/routes";
import { errorHandler } from "./presentation/middlewares/errorHandler";
import { env } from "./infrastructure/config/env";

const app = express();

const allowedOrigins = env.CORS_ORIGIN
  ? env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : ["https://mini-kanban-frontend.vercel.app", "http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins
  })
);
app.use(express.json());
app.use(router);
app.use(errorHandler);

export { app };
