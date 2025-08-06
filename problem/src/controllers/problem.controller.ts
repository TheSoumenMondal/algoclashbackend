import { Request, Response } from "express";
import ApiResponse from "../utils/apiResponse.js";
import { StatusCodes } from "http-status-codes";
import asyncHandler from "../utils/asyncHandler.js";
import ProblemRepository from "../repository/problem.repository.js";
import { ProblemService } from "../services/problem.service.js";

const problemRepo = new ProblemRepository();
const problemService = new ProblemService(problemRepo);

async function pingCheck(_req: Request, res: Response) {
  const response = new ApiResponse(
    StatusCodes.OK,
    "Server is up and running",
    true,
    "pong"
  );
  return res.status(response.status).json(response);
}

const createProblem = asyncHandler(async (req: Request, res: Response) => {
  const problemData = req.body;
  const problem = await problemService.createProblem(problemData);
  
  const response = new ApiResponse(
    StatusCodes.CREATED,
    "Problem created successfully",
    true,
    problem
  );
  return res.status(response.status).json(response);
});

const getAllProblems = asyncHandler(async (_req: Request, res: Response) => {
  const problems = await problemService.getAllProblems();
  
  const response = new ApiResponse(
    StatusCodes.OK,
    "Problems retrieved successfully",
    true,
    problems
  );
  return res.status(response.status).json(response);
});

const getProblemById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const problem = await problemService.getProblemById(id);
  
  const response = new ApiResponse(
    StatusCodes.OK,
    "Problem retrieved successfully",
    true,
    problem
  );
  return res.status(response.status).json(response);
});

const updateProblem = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const problemData = req.body;
  const updatedProblem = await problemService.updateProblem(id, problemData);
  
  const response = new ApiResponse(
    StatusCodes.OK,
    "Problem updated successfully",
    true,
    updatedProblem
  );
  return res.status(response.status).json(response);
});

const deleteProblem = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedProblem = await problemService.deleteProblem(id);
  
  const response = new ApiResponse(
    StatusCodes.OK,
    "Problem deleted successfully",
    true,
    deletedProblem
  );
  return res.status(response.status).json(response);
});

export {
  pingCheck,
  createProblem,
  getAllProblems,
  updateProblem,
  deleteProblem,
  getProblemById,
};
