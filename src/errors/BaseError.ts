export default class BaseError extends Error {
  description: string;
  statusCode: number;
  isOperational: boolean;
  constructor(
    message: string,
    description: string,
    name = 'Base Error',
    statusCode: number,
    isOperational: boolean
  ) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.description = description;
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}
