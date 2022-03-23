import BaseError from './BaseError';
import { StatusCodes } from 'http-status-codes';

export default class ConflictError extends BaseError {
  constructor(
    message: string,
    description = '',
    name = 'Conclict Request Error',
    statusCode = StatusCodes.CONFLICT,
    isOperational = true
  ) {
    super(message, description, name, statusCode, isOperational);
    this.description = description || message;
  }
}
