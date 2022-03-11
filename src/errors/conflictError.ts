import BaseError from './BaseError';
import { StatusCodes } from 'http-status-codes';

export default class ConflictError extends BaseError {
  constructor(
    name: string,
    statusCode = StatusCodes.CONFLICT,
    description = 'Conclict Request.',
    isOperational = true
  ) {
    super(name, statusCode, isOperational, description);
  }
}
