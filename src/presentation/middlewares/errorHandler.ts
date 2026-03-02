import { NextFunction, Request, Response } from "express";
import { DomainError } from "../../domain/errors/DomainError";

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (error instanceof DomainError) {
    res.status(error.statusCode).json({
      message: error.message
    });
    return;
  }

  res.status(500).json({
    message: "Internal server error."
  });
}
