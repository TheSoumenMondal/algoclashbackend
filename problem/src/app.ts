import express from "express";
import apiRouter from "./routes/index.js";
import bodyParser from "body-parser";
import ApiResponse from "./utils/apiResponse.js";
import errorHandler from "./utils/errorHandler.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.text());

app.get("/ping", (_req, res) => {
  console.log("Ping received");
  const response = new ApiResponse(200, "pong", true, "pong");
  return res.status(response.status).json(response);
});

app.use("/api", apiRouter);

app.use(errorHandler);

export default app;
