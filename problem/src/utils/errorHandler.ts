import { NextFunction, Request, Response } from "express";
import BaseError from "../errors/baseError.js";
import ErrorResponse from "./errorResponse.js";
import { StatusCodes } from "http-status-codes";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  
  console.error("Error occurred:", err);
  console.error("Error stack:", err.stack);

  if (err instanceof BaseError) {
    const errorResponse = new ErrorResponse(
      err.statusCode,
      err.message,
      false,
      err.name
    );
    return res.status(err.statusCode).json(errorResponse);
  } else {
    const interServerErrorResponse = new ErrorResponse(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Internal Server Error",
      false,
      err.message || "Something went wrong"
    );
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(interServerErrorResponse);
  }
};

export default errorHandler;
