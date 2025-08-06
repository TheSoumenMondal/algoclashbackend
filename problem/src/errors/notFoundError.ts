import BaseError from "./baseError.js";

export default class NotFoundError extends BaseError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode || 404);
    this.name = "NotFoundError";
  }
}