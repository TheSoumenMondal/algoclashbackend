import BaseError from "./baseError.js";

class ValidationError extends BaseError {
  constructor(message: string = "Validation failed.") {
    super(message, 400);
    this.name = "ValidationError";
  }
}

export default ValidationError;
