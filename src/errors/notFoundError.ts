import BaseError from './BaseError';
import { StatusCodes } from 'http-status-codes';

export default class NotFoundError extends BaseError {
  constructor(
    message: string,
    description = '',
    name = 'Not Found Error',
    statusCode = StatusCodes.NOT_FOUND,
    isOperational = true
  ) {
    super(message, description, name, statusCode, isOperational);
    this.description = description || message;
  }
}
