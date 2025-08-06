import bodyParser from "body-parser";
import express from "express";
import { errorHandler } from "./utils/errorHandler.js";
import { serverAdapter } from "./config/bullBoardConfig.js";
import apiRouter from "./routes/index.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/admin/queues", serverAdapter.getRouter());

app.use("/api", apiRouter);

app.get("/ping", (_req, res) => {
  res.json({
    message: "Evaluator Service is running",
    bullBoard: "Visit /admin/queues for queue monitoring dashboard",
    timestamp: new Date().toISOString(),
  });
});

app.use(errorHandler);

export default app;
