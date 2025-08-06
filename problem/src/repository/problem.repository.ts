import { IProblem } from "../types/problemType.js";
import Problem from "../models/problem.model.js";
import mongoose from "mongoose";

class ProblemRepository {
  async createProblem(problemData: Partial<IProblem>): Promise<IProblem> {
    const problem = new Problem(problemData);
    return await problem.save();
  }

  async getAllProblems(): Promise<IProblem[]> {
    return await Problem.find({});
  }

  async getProblemById(id: string): Promise<IProblem | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await Problem.findById(id);
  }

  async updateProblem(
    id: string,
    problemData: Partial<IProblem>
  ): Promise<IProblem | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await Problem.findByIdAndUpdate(id, problemData, { new: true });
  }

  async deleteProblem(id: string): Promise<IProblem | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await Problem.findByIdAndDelete(id);
  }
}

export default ProblemRepository;
