class BaseError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = new.target.name;
    this.statusCode = statusCode;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default BaseError;
