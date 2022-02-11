import { Op } from 'sequelize';

import { UserModel } from '../model/user.model';
import { CreateUserInput, UpdateUserInput } from '../schema/user.schema';

export async function createUser(
  input: CreateUserInput['body']
): Promise<UserModel> {
  try {
    const newUser: UserModel = await UserModel.create(input);

    return newUser;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getUsers(): Promise<UserModel[]> {
  try {
    const dbUsers: UserModel[] = await UserModel.findAll();

    return dbUsers;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getUserById(paramID: string): Promise<UserModel | null> {
  try {
    const foundUser: UserModel | null = await UserModel.findOne({
      where: {
        id: paramID
      }
    });

    return foundUser;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getAutoSuggestUsers(
  loginSubstring: string,
  limitParam: number
): Promise<UserModel[]> {
  try {
    const suggestedUsers: UserModel[] = await UserModel.findAll({
      limit: limitParam,
      order: [['login', 'ASC']],
      where: {
        login: {
          [Op.or]: {
            [Op.startsWith]: loginSubstring,
            [Op.endsWith]: loginSubstring,
            [Op.iLike]: `%${loginSubstring}%`
          }
        }
      }
    });

    return suggestedUsers;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function updateUser(
  queryID: string,
  update: UpdateUserInput['body']
): Promise<UserModel | null | undefined> {
  try {
    const [foundCounter] = await UserModel.update(
      { ...update },
      {
        where: {
          id: queryID
        }
      }
    );
    if (foundCounter > 0) {
      const returnUser = await UserModel.findOne({
        where: {
          id: queryID
        }
      });
      return returnUser;
    }
    return undefined;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function removeUser(
  queryID: string
): Promise<UserModel | null | undefined> {
  try {
    const [foundCounter] = await UserModel.update(
      { isDeleted: true },
      {
        where: {
          id: queryID
        }
      }
    );
    if (foundCounter > 0) {
      const removedUser = await UserModel.findOne({
        where: {
          id: queryID
        }
      });
      return removedUser;
    }
    return undefined;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteUser(queryID: string): Promise<boolean> {
  try {
    await UserModel.destroy({
      where: {
        id: queryID
      }
    });

    return true;
  } catch (error: any) {
    throw new Error(error);
  }
}
