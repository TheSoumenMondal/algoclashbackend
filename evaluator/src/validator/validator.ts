import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const validate =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        ...req.body,
      });
      next();
    } catch (error: any) {
      console.log(error);
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        status: StatusCodes.BAD_REQUEST,
        error: error.message || "Invalid request data",
        message: "Bad request",
      });
    }
  };
