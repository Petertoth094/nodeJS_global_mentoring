import { NextFunction, Request, Response } from 'express';

import { UserModel } from '../model/user.model';
import { LoginUserInput } from '../schema/user.schema';
import { getUserByLogin } from '../service/user.service';
import { signJWT } from '../utils/jwt.utils';

import Logger from '../utils/logger';

export async function loginHandler(
  req: Request<{}, {}, LoginUserInput['body']>,
  res: Response,
  next: NextFunction
) {
  const { login: username, password } = req.body;

  try {
    const user: UserModel | null = await getUserByLogin(username);
    if (!user || user.password !== password) {
      return res.status(401).send('Invalid login or password');
    }

    const accessToken = signJWT({ username, age: user.age }, '10m');

    // res.cookie('accessToken', accessToken, {
    //   maxAge: 30000, // 5 min
    //   httpOnly: true
    // });

    return res.status(200).send({ accessToken });
  } catch (err: any) {
    err.message = `Method: ${loginHandler.name} - Arguments: ${JSON.stringify({
      ...req.body,
      ...req.params
    })} - Message: ${err}`;
    Logger.error(err);
    return next(err);
  }
}
