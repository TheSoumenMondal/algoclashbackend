class BaseError extends Error {
  name: string;
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = new.target.name;
    this.statusCode = statusCode;
    this.stack = new Error().stack;
  }
}

export default BaseError;
