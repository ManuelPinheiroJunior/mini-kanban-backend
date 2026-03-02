import express from "express";
import { router } from "./presentation/routes";
import { errorHandler } from "./presentation/middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(router);
app.use(errorHandler);

export { app };
