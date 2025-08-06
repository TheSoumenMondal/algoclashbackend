import CppExecutor from "../containers/cppExecutor.js";
import JavaExecutor from "../containers/javaExecutor.js";
import PythonExecutor from "../containers/pythonExecutor.js";
import CodeExecutorStrategy from "../types/codeEvaluatorStrategy.js";

function createExecutor(codeLanguage: string): CodeExecutorStrategy | null {
  switch (codeLanguage.toLocaleLowerCase()) {
    case "cpp":
      return new CppExecutor();
    case "java":
      return new JavaExecutor();
    case "python":
      return new PythonExecutor();
    default:
      return null;
  }
}

export default createExecutor;
