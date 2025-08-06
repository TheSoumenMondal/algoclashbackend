import BaseError from "./baseError.js";

class NotFoundError extends BaseError {
  constructor(message: string = "Resource not found.") {
    super(message, 404);
    this.name = "NotFoundError";
  }
}

export default NotFoundError;
