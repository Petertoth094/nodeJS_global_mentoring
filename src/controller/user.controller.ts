import { Request, Response } from 'express';
import {
  CreateUserInput,
  DeleteUserInput,
  GetUserByIdInput,
  UpdateUserInput
} from '../schema/user.schema';
import {
  createUser,
  getAutoSuggestUsers,
  getUserById,
  getUsers,
  removeUser,
  updateUser
} from '../service/user.service';
import logger from '../utils/logger';

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) {
  try {
    // const userId = res.locals.user.id

    const body = req.body;

    const user = await createUser(body);

    if (!user) {
      return res.status(409).send('User already exists');
    }

    return res.status(200).send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(400).send('createUserHandler error');
  }
}

export async function getUsersHandler(req: Request, res: Response) {
  try {
    const users = await getUsers();
    if (!users) {
      return res.status(500).send('Database is empty');
    }
    return res.status(200).send(users);
  } catch (error) {
    logger.error(error);
    return res.status(400).send('getUsersHandler error');
  }
}

export async function getUserByIdHandler(
  req: Request<GetUserByIdInput['params']>,
  res: Response
) {
  try {
    const userID = req.params.id;

    const user = await getUserById(userID);

    if (!user) {
      return res.status(400).send('No user found in the database');
    }

    return res.status(200).send(user);
  } catch (error) {
    logger.error(error);
    return res.status(400).send('getUserByIdHandler error');
  }
}

export async function updateUserHandler(
  req: Request<UpdateUserInput['params'], {}, UpdateUserInput['body']>,
  res: Response
) {
  try {
    const userLogin = req.params.id;
    const update = req.body;

    const updatedUser = await updateUser(userLogin, update);

    if (!updatedUser) {
      return res.status(400).send('Wrong login param');
    }

    return res.status(200).send(updatedUser);
  } catch (error) {
    logger.error(error);
    return res.status(409).send('updateUserHandler error');
  }
}

export async function getAutoSuggestUsersHandler(req: Request, res: Response) {
  try {
    const { loginSubStr, limit } = req.body;
    const users = await getAutoSuggestUsers(loginSubStr, limit);

    if (!users) {
      return res.status(400).send('Wrong login param or no users found');
    }

    return res.status(200).send(users);
  } catch (error) {
    logger.error(error);
    return res.status(409).send('getAutoSuggestUsersHandler error');
  }
}

export async function removeUserHandler(
  req: Request<DeleteUserInput['params']>,
  res: Response
) {
  try {
    const userID = req.params.id;
    const removedUser = await removeUser(userID);

    if (!removedUser) {
      return res.status(200).send('Wrong login param or no users found');
    }

    return res.status(200).send(removedUser);
  } catch (error) {
    logger.error(error);
    return res.status(409).send('removeUserHandler error');
  }
}
interface ReqParam {
  loginSubStr: string;
  limit: number;
}

export async function getAutoSuggestUsersHandler2(
  req: Request<{}, {}, {}, ReqParam>,
  res: Response
) {
  try {
    const { loginSubStr, limit } = req.query;
    const users = await getAutoSuggestUsers(loginSubStr, limit);

    if (!users) {
      return res.status(400).send('Wrong login param or no users found');
    }

    return res.status(200).send(users);
  } catch (error) {
    logger.error(error);
    return res.status(409).send('getAutoSuggestUsersHandler error');
  }
}
