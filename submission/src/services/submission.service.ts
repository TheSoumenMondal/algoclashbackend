import fetchProblemDetails from "../api/problemAdminApi.js";
import { submissionQueueProducer } from "../producers/submissionQueueProducer.js";
import SubmissionRepository from "../repository/submission.repository.js";
import { CodeStub } from "../types/codeStubType.js";
import { SubmissionType } from "../types/submissionType.js";

class SubmissionService {
  private submissionRepository: SubmissionRepository;

  constructor(submissionRepository: SubmissionRepository) {
    this.submissionRepository = submissionRepository;
  }

  async addSubmission(submissionData: Partial<SubmissionType>) {
    const problemId = submissionData.problemId;
    const userId = submissionData.userId;
    console.log("Problem ID:", problemId);

    const problemServiceResponse = await fetchProblemDetails(
      problemId as string
    );

    if (!problemServiceResponse) {
      throw new Error("Failed to fetch problem details");
    }

    console.log("Problem Service Response:", problemServiceResponse);

    const language = submissionData.language;

    console.log("Language:", language);
    const codeStubsLanguage: CodeStub =
      problemServiceResponse.data.codeStubs.find(
        (codeStub: CodeStub) =>
          codeStub.language.toLowerCase() === language!.toLowerCase()
      );

    console.log("Code Stubs Language:", codeStubsLanguage);

    console.log("All Code Stubs:", problemServiceResponse.data?.codeStubs);

    submissionData.code =
      codeStubsLanguage.startingCode +
      `\n\n` +
      submissionData.code +
      `\n\n` +
      codeStubsLanguage.endingCode;

    const submission = await this.submissionRepository.createSubmission(
      submissionData as SubmissionType
    );
    if (!submission) {
      throw new Error("Failed to create submission");
    }
    console.log("Submission created successfully:", submission);

    console.log("Adding job to submission queue");
    await submissionQueueProducer({
      [submission._id.toString()]: {
        code: submissionData.code as string,
        language: submissionData.language as string,
        inputCase: problemServiceResponse.data.testCases[0].input,
        outputCase: problemServiceResponse.data.testCases[0].output,
        userId: userId as string,
        submissionId: submission._id.toString(),
      },
    });

    console.log("Successfully added job to submission queue");

    return {
      message: "Submission created successfully",
      submissionId: submission._id.toString(),
    };
  }
}

export default SubmissionService;
