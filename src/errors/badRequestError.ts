import BaseError from './BaseError';
import { StatusCodes } from 'http-status-codes';

export default class BadRequestError extends BaseError {
  constructor(
    message: string,
    description = '',
    name = 'Bad Request Error',
    statusCode = StatusCodes.BAD_REQUEST,
    isOperational = true
  ) {
    super(message, description, name, statusCode, isOperational);
    this.description = description || message;
  }
}
