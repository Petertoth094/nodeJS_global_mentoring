import BaseError from './BaseError';
import { StatusCodes } from 'http-status-codes';

export default class UnauthorizedError extends BaseError {
  constructor(
    message: string,
    description = '',
    name = 'Unauthorized Error',
    statusCode = StatusCodes.UNAUTHORIZED,
    isOperational = true
  ) {
    super(message, description, name, statusCode, isOperational);
    this.description = description || message;
  }
}
