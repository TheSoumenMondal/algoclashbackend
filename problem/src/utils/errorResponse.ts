import { ErrorResponseType } from "../types/errorResponseType.js";

class ErrorResponse implements ErrorResponseType {
  status: number;
  message: string;
  success: boolean;
  error: string;
  constructor(
    status: number,
    message: string,
    success: boolean,
    error: string
  ) {
    this.status = status;
    this.message = message;
    this.success = success;
    this.error = error;
  }
}

export default ErrorResponse;
