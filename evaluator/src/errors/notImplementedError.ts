import BaseError from "./baseError.js";

class NotImplementedError extends BaseError {
  constructor(message: string = "This feature is not implemented yet.") {
    super(message, 501);
    this.name = "NotImplementedError";
  }
}

export default NotImplementedError;
