import { StatusCodes } from "http-status-codes";
import BaseError from "./baseError.js";

export default class ValidationError extends BaseError {
  constructor(
    message = "Validation failed.",
    statusCode = StatusCodes.BAD_REQUEST
  ) {
    super(message, statusCode);
    this.name = "ValidationError";
  }
}
