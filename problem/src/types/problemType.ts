import { Document } from "mongoose";

interface ITestCases {
  input: string;
  output: string;
}

type Difficulty = "easy" | "medium" | "hard";

interface ICodeStubs {
  language: string;
  startingCode: string;
  userCode: string;
  endingCode?: string;
}

interface IProblem extends Document {
  title: string;
  description: string;
  testCases: ITestCases[];
  difficulty: Difficulty;
  codeStubs: ICodeStubs[]; //Taking the array of code stubs as we will accpet more than one language and for that we have to store the starting and ending code for each of the languages
  editorial?: string;
}

export { IProblem , ITestCases , ICodeStubs };
