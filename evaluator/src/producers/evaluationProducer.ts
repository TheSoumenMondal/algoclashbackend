import evaluationQueue from "../queue/evaluationQueue.js";
import { CodeExecutionResponse } from "../types/codeEvaluatorStrategy.js";

export default async function (payload: Record<string, unknown>) {
  await evaluationQueue.add("EvaluationJob", payload);
  console.log("Evaluation job added to the queue");
}
