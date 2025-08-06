import { Request, Response } from "express";
import { CreateSubmissionDTO } from "../dto/createSubmissionDTO.js";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../utils/apiResponse.js";

async function addNewSubmission(req: Request, res: Response) {
  try {
    const submissionData = req.body as CreateSubmissionDTO;

    // TODO: Implement the following steps:
    // 1. Fetch test cases from problem service using submissionData.problemId
    // 2. Use the submissionHelper.queueSubmission() function with test cases
    // 3. Return success response with queued status
    
    const apiResponse = new ApiResponse(
      StatusCodes.NOT_IMPLEMENTED,
      "Submission endpoint requires integration with problem service",
      { 
        userId: submissionData.userId,
        problemId: submissionData.problemId,
        required: "Fetch test cases from problem service and call queueSubmission()",
        helperFunction: "Use utils/submissionHelper.queueSubmission() when test cases are available"
      },
      null
    );

    return res.status(StatusCodes.NOT_IMPLEMENTED).json(apiResponse);
  } catch (error) {
    const apiResponse = new ApiResponse(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to process submission",
      null,
      error
    );

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(apiResponse);
  }
}

export default addNewSubmission;
