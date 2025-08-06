import express from "express";
import {
  pingCheck,
  createProblem,
  getAllProblems,
  getProblemById,
  updateProblem,
  deleteProblem,
} from "../../controllers/problem.controller.js";

const problemRouter = express.Router();

problemRouter.get("/ping", pingCheck);
problemRouter.post("/", createProblem);
problemRouter.get("/", getAllProblems);
problemRouter.get("/:id", getProblemById);
problemRouter.put("/:id", updateProblem);
problemRouter.delete("/:id", deleteProblem);

export default problemRouter;
