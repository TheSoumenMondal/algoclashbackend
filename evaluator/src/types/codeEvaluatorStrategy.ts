interface CodeExecutorStrategy {
  execute(
    code: string,
    inputTestCase: string,
    outputTestCase: string
  ): Promise<CodeExecutionResponse>;
}

export default CodeExecutorStrategy;

export type CodeExecutionResponse = {
  status: string;
  output: string;
};
