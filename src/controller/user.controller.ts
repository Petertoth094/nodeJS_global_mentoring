import { Request, Response } from 'express';
import {
  CreateUserInput,
  DeleteUserInput,
  GetUserByIdInput,
  UpdateUserInput
} from '../schema/user.schema';
import {
  createUser,
  deleteUser,
  getAutoSuggestUsers,
  getUserById,
  getUsers,
  removeUser,
  updateUser
} from '../service/user.service';
import logger from '../utils/logger';

import { UserModel } from '../model/user.model';

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response
) {
  try {
    const body = req.body;

    const createdUser: UserModel = await createUser(body);

    return res.status(200).json({
      successful: true,
      result: {
        createdUser
      }
    });
  } catch (err: any) {
    logger.error(err);
    return res.status(400).json({
      successful: false,
      // error: 'User params wrong or user already exists!'
      error: err?.message
    });
  }
}

export async function getUsersHandler(req: Request, res: Response) {
  try {
    const users: UserModel[] = await getUsers();

    return res.status(200).json({
      successful: true,
      result: {
        users
      }
    });
  } catch (err: any) {
    logger.error(err);
    return res.status(400).json({
      successful: false,
      error: err?.message
    });
  }
}

export async function getUserByIdHandler(
  req: Request<GetUserByIdInput['params']>,
  res: Response
) {
  try {
    const userID: string = req.params.id;

    const foundUser: UserModel | null = await getUserById(userID);
    if (!foundUser) {
      return res.status(400).json({
        successful: false,
        error: `No user found with id: ${userID}`
      });
    }

    return res.status(200).json({
      successful: true,
      result: {
        foundUser
      }
    });
  } catch (err: any) {
    logger.error(err);
    return res.status(400).json({
      successful: false,
      error: err?.message
    });
  }
}

export async function getAutoSuggestUsersHandler(req: Request, res: Response) {
  try {
    const { loginSubStr, limit } = req.params;

    const users: UserModel[] = await getAutoSuggestUsers(
      loginSubStr,
      parseInt(limit, 10)
    );

    return res.status(200).json({
      successful: true,
      result: {
        users
      }
    });
  } catch (err: any) {
    logger.error(err);
    return res.status(400).json({
      successful: false,
      error: err?.message
    });
  }
}

export async function updateUserHandler(
  req: Request<
    GetUserByIdInput['params'],
    {},
    Partial<UpdateUserInput['body']>
  >,
  res: Response
) {
  try {
    const userID: string = req.params.id;
    const updateParams = req.body;

    const updatedUser: UserModel | null = await updateUser(
      userID,
      updateParams
    );

    if (!updatedUser) {
      return res.status(400).json({
        successful: false,
        error: `No user found with id: ${userID}`
      });
    }

    return res.status(200).json({
      successful: true,
      result: {
        updatedUser
      }
    });
  } catch (err: any) {
    logger.error(err);
    return res.status(400).json({
      successful: false,
      error: err?.message
    });
  }
}

export async function removeUserHandler(
  req: Request<DeleteUserInput['params']>,
  res: Response
) {
  try {
    const userID: string = req.params.id;
    const removedUser: UserModel | null = await removeUser(userID);

    if (!removedUser) {
      return res.status(400).json({
        successful: false,
        error: `No user found with id: ${userID}`
      });
    }

    return res.status(200).json({
      successful: true,
      result: {
        removedUser
      }
    });
  } catch (err: any) {
    logger.error(err);
    return res.status(400).json({
      successful: false,
      error: err?.message
    });
  }
}

export async function deleteUserHandler(
  req: Request<DeleteUserInput['params']>,
  res: Response
) {
  try {
    const userID: string = req.params.id;

    const success: boolean = await deleteUser(userID);

    if (!success) {
      return res.status(400).json({
        successful: false,
        error: `No user found with id: ${userID}`
      });
    }

    return res.status(200).send('User deleted');
  } catch (err: any) {
    logger.error(err);
    return res.status(400).json({
      successful: false,
      error: err?.message
    });
  }
}
