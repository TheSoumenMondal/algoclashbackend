import Submission from "../models/submissionModel.js";
import { SubmissionType } from "../types/submissionType.js";

class SubmissionRepository {
  private submissionModel: typeof Submission;

  constructor(submissionModel: typeof Submission) {
    this.submissionModel = submissionModel;
  }

  async createSubmission(data: SubmissionType) {
    const submission = await this.submissionModel.create(data);
    return submission;
  }
}

export default SubmissionRepository;
