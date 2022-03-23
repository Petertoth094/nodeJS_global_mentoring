import { Request, Response, NextFunction } from 'express';
import { ForbiddenError, UnauthorizedError } from '../errors';
import { verifyJWT } from '../utils/jwt.utils';

const verifyAccesToken = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    throw new UnauthorizedError('Authorization token is missing');
  }

  const authHeader = req.headers.authorization;
  const bearerToken = authHeader.split(' ');
  const token = bearerToken[1];
  const { payload, expired } = verifyJWT(token);
  if (expired) {
    throw new ForbiddenError('JWT Token is expired!');
  }
  if (!payload) {
    throw new ForbiddenError('Invalid JWT Token!');
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // req.payload = payload;
  return next();
};

export default verifyAccesToken;
