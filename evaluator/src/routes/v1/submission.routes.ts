import { Router } from "express";
import addNewSubmission from "../../controllers/submission.controller.js";
import { validate } from "../../validator/validator.js";
import { createSubmissionZodSchema } from "../../dto/createSubmissionDTO.js";

const submissionRouter = Router();

submissionRouter.post(
  "/",
  validate(createSubmissionZodSchema),
  addNewSubmission
);

export default submissionRouter;
