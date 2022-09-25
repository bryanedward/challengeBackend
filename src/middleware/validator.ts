import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export function handleLanguageHeader(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    res.status(404).json({
      ok: false,
      errors: err.mapped(),
    });
  }
  next();
}
