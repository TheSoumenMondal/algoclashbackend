import mongoose from "mongoose";
import { ICodeStubs, IProblem, ITestCases } from "../types/problemType.js";

const TestCasesSchema = new mongoose.Schema<ITestCases>(
  {
    input: { type: String, required: [true, "Input is required"] },
    output: { type: String, required: [true, "Output is required"] },
  },
  { _id: false }
);

const CodeStubsSchema = new mongoose.Schema<ICodeStubs>({
  language: { type: String, required: [true, "Language is required"] },
  startingCode: { type: String},
  userCode: { type: String},
  endingCode: { type: String, default: "" },
},{_id : false});

const problemSchema = new mongoose.Schema<IProblem>({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  testCases: {
    type: [TestCasesSchema],
    required: [true, "Test cases are required"],
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: [true, "Difficulty is required"],
    default: "easy",
  },
  codeStubs: {
    type: [CodeStubsSchema],
    required: [true, "Code stubs are required"],
  },
  editorial: {
    type: String,
  },
});

const Problem = mongoose.model<IProblem>("Problem", problemSchema);

export default Problem;