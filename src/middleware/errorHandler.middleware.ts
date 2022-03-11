/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { BaseError } from '../errors';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  if (err instanceof BaseError) {
    return res
      .status(err.statusCode)
      .send({ succesfull: false, message: err.name });
  }
  res.status(500).send({ succesfull: false, message: 'Something went wrong' });
};

const isOperationalError = (err: Error) => {
  if (err instanceof BaseError) {
    return err.isOperational;
  }
  return false;
};

export { errorHandler, isOperationalError };
