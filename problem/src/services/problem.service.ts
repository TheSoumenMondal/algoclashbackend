import ProblemRepository from "../repository/problem.repository.js";
import { IProblem } from "../types/problemType.js";
import NotFoundError from "../errors/notFoundError.js";
import { StatusCodes } from "http-status-codes";
import ValidationError from "../errors/validationError.js";
import { sanitizeMarkdown } from "../utils/sanitizeCode.js";

class ProblemService {
  private problemRepository: ProblemRepository;

  constructor(problemRepository: ProblemRepository) {
    this.problemRepository = problemRepository;
  }

  async createProblem(problemData: Partial<IProblem>): Promise<IProblem> {
    if (
      !problemData.title ||
      !problemData.description ||
      !problemData.testCases ||
      !problemData.codeStubs
    ) {
      throw new ValidationError(
        "title, description, testCases and codeStubs are required."
      );
    }

    if (
      !Array.isArray(problemData.testCases) ||
      !Array.isArray(problemData.codeStubs)
    ) {
      throw new ValidationError("testCases and codeStubs must be arrays");
    }

    if (
      problemData.testCases.length === 0 ||
      problemData.codeStubs.length === 0
    ) {
      throw new ValidationError(
        "testCases and codeStubs cannot be empty arrays"
      );
    }

    const safeDescription = await sanitizeMarkdown(problemData.description);

    const problemDataWithSafeDescription = {
      ...problemData,
      description: safeDescription,
    };

    return await this.problemRepository.createProblem(
      problemDataWithSafeDescription
    );
  }

  async getAllProblems(): Promise<IProblem[]> {
    return await this.problemRepository.getAllProblems();
  }

  async getProblemById(id: string): Promise<IProblem> {
    if (!id) {
      throw new ValidationError("Problem ID is required.");
    }
    const problem = await this.problemRepository.getProblemById(id);
    if (!problem) {
      throw new NotFoundError(
        `Problem with id ${id} not found`,
        StatusCodes.NOT_FOUND
      );
    }
    return problem;
  }

  async updateProblem(
    id: string,
    problemData: Partial<IProblem>
  ): Promise<IProblem> {
    if (!id) {
      throw new ValidationError("Problem ID is required for update.");
    }

    if (
      !problemData.title &&
      !problemData.description &&
      !problemData.testCases &&
      !problemData.codeStubs
    ) {
      throw new ValidationError(
        "At least one field must be provided for update."
      );
    }

    if (problemData.testCases !== undefined) {
      if (!Array.isArray(problemData.testCases)) {
        throw new ValidationError("testCases must be an array");
      }
      if (problemData.testCases.length === 0) {
        throw new ValidationError("testCases cannot be an empty array");
      }
    }

    if (problemData.codeStubs !== undefined) {
      if (!Array.isArray(problemData.codeStubs)) {
        throw new ValidationError("codeStubs must be an array");
      }
      if (problemData.codeStubs.length === 0) {
        throw new ValidationError("codeStubs cannot be an empty array");
      }
    }

    let updatedProblemData = { ...problemData };
    if (problemData.description) {
      const safeDescription = await sanitizeMarkdown(problemData.description);
      updatedProblemData = {
        ...problemData,
        description: safeDescription,
      };
    }

    const updatedProblem = await this.problemRepository.updateProblem(
      id,
      updatedProblemData
    );
    if (!updatedProblem) {
      throw new NotFoundError(
        `Problem with id ${id} not found`,
        StatusCodes.NOT_FOUND
      );
    }
    return updatedProblem;
  }

  async deleteProblem(id: string): Promise<IProblem> {
    if (!id) {
      throw new ValidationError("Problem ID is required for deletion.");
    }

    const deletedProblem = await this.problemRepository.deleteProblem(id);
    if (!deletedProblem) {
      throw new NotFoundError(
        `Problem with id ${id} not found`,
        StatusCodes.NOT_FOUND
      );
    }
    return deletedProblem;
  }
}

export { ProblemService };
