import BaseError from "./baseError.js";

export default class NotImplementedError extends BaseError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
    this.name = "NotImplementedError";
  }
}
