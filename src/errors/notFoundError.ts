import BaseError from './BaseError';
import { StatusCodes } from 'http-status-codes';

export default class NotFoundError extends BaseError {
  constructor(
    name: string,
    statusCode = StatusCodes.NOT_FOUND,
    description = 'Not found.',
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}
