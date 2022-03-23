import BaseError from './BaseError';
import { StatusCodes } from 'http-status-codes';

export default class ForbiddenError extends BaseError {
  constructor(
    message: string,
    description = '',
    name = 'Forbidden Request Error',
    statusCode = StatusCodes.FORBIDDEN,
    isOperational = true
  ) {
    super(message, description, name, statusCode, isOperational);
    this.description = description || message;
  }
}
