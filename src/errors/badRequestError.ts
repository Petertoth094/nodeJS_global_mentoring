import BaseError from './BaseError';
import { StatusCodes } from 'http-status-codes';

export default class BadRequestError extends BaseError {
  constructor(
    name: string,
    statusCode = StatusCodes.BAD_REQUEST,
    description = 'Bad Request.',
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}
