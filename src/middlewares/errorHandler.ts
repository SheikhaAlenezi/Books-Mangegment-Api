import { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("error", err.message);
  res
    .status(err.status || 500)
    .json({ message: err.message || "server internal error" });
};
export default errorHandler;
