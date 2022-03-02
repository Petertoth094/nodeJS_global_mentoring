import { NextFunction, Request, Response } from 'express';
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

import { UserModel } from '../model/user.model';
import Logger from '../utils/logger';

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput['body']>,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;

    const createdUser: UserModel = await createUser(body);

    return res.status(201).send({
      successful: true,
      result: {
        createdUser
      }
    });
  } catch (err: any) {
    err.message = `Method: ${
      createUserHandler.name
    } - Arguments: ${JSON.stringify({
      ...req.body,
      ...req.params
    })} - Message: ${err}`;
    Logger.error(err);
    return next(err);
  }
}

export async function getUsersHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users: UserModel[] = await getUsers();

    return res.status(200).json({
      successful: true,
      result: {
        users
      }
    });
  } catch (err: any) {
    err.message = `Method: ${
      getUsersHandler.name
    } - Arguments: ${JSON.stringify({
      ...req.body,
      ...req.params
    })} - Message: ${err}`;
    Logger.error(err);
    return next(err);
  }
}

export async function getUserByIdHandler(
  req: Request<GetUserByIdInput['params']>,
  res: Response,
  next: NextFunction
) {
  try {
    const userID: string = req.params.id;

    const foundUser: UserModel | null = await getUserById(userID);
    if (!foundUser) {
      return res.status(404).json({
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
    err.message = `Method: ${
      getUserByIdHandler.name
    } - Arguments: ${JSON.stringify({
      ...req.body,
      ...req.params
    })} - Message: ${err}`;
    Logger.error(err);
    return next(err);
  }
}

export async function getAutoSuggestUsersHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
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
    err.message = `Method: ${
      getAutoSuggestUsersHandler.name
    } - Arguments: ${JSON.stringify({
      ...req.body,
      ...req.params
    })} - Message: ${err}`;
    Logger.error(err);
    return next(err);
  }
}

export async function updateUserHandler(
  req: Request<
    GetUserByIdInput['params'],
    {},
    Partial<UpdateUserInput['body']>
  >,
  res: Response,
  next: NextFunction
) {
  try {
    const userID: string = req.params.id;
    const updateParams = req.body;

    const updatedUser: UserModel | null = await updateUser(
      userID,
      updateParams
    );

    if (!updatedUser) {
      return res.status(404).json({
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
    err.message = `Method: ${
      updateUserHandler.name
    } - Arguments: ${JSON.stringify({
      ...req.body,
      ...req.params
    })} - Message: ${err}`;
    Logger.error(err);
    return next(err);
  }
}

export async function removeUserHandler(
  req: Request<DeleteUserInput['params']>,
  res: Response,
  next: NextFunction
) {
  try {
    const userID: string = req.params.id;
    const removedUser: UserModel | null = await removeUser(userID);

    if (!removedUser) {
      return res.status(404).json({
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
    err.message = `Method: ${
      removeUserHandler.name
    } - Arguments: ${JSON.stringify({
      ...req.body,
      ...req.params
    })} - Message: ${err}`;
    Logger.error(err);
    return next(err);
  }
}

export async function deleteUserHandler(
  req: Request<DeleteUserInput['params']>,
  res: Response,
  next: NextFunction
) {
  try {
    const userID: string = req.params.id;

    const success: boolean = await deleteUser(userID);

    if (!success) {
      return res.status(404).json({
        successful: false,
        error: `No user found with id: ${userID}`
      });
    }

    return res.status(200).send('User deleted');
  } catch (err: any) {
    err.message = `Method: ${
      deleteUserHandler.name
    } - Arguments: ${JSON.stringify({
      ...req.body,
      ...req.params
    })} - Message: ${err}`;
    Logger.error(err);
    return next(err);
  }
}
