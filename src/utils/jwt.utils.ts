import jwt from 'jsonwebtoken';
import config from 'config';
import Logger from './logger';

const privateKey = config.get<string>('privateKey');
const publicKey = config.get<string>('publicKey');

export function signJWT(payload: object, expiresIn: string | number) {
  return jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn });
}

export function verifyJWT(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);

    return { payload: decoded, expired: false };
  } catch (error: any) {
    Logger.error(error.message);
    return { payload: null, expired: error.message.includes('jwt expired') };
  }
}
