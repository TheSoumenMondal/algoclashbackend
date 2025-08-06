import { NextFunction, Request, Response } from "express";
import BaseError from "../errors/baseError.js";
import { StatusCodes } from "http-status-codes";

export async function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log(error.stack);
  if (error instanceof BaseError) {
    return res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
      data: null,
      error: error.name,
    });
  } else {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "An unexpected error occurred",
      data: null,
      error: error.name || "InternalServerError",
    });
  }
}
