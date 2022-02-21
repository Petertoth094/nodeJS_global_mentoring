import { Op } from 'sequelize';
import { sequelize } from '../data-access/dbConnect';
import { ConflictError, NotFoundError } from '../errors';
import { GroupModel } from '../model/group.model';

import { UserModel } from '../model/user.model';
import { CreateUserInput, UpdateUserInput } from '../schema/user.schema';

export async function createUser(
  input: CreateUserInput['body']
): Promise<UserModel> {
  try {
    const newUser: UserModel = await sequelize.transaction(async (t) => {
      const user: UserModel = await UserModel.create(input, { transaction: t });

      return user;
    });

    return newUser;
  } catch (error: any) {
    throw new ConflictError(error.errors[0].message);
  }
}

export async function getUsers(): Promise<UserModel[]> {
  try {
    const users: UserModel[] = await sequelize.transaction(async (t) => {
      const dbUsers: UserModel[] = await UserModel.findAll({ transaction: t });

      return dbUsers;
    });
    return users;
  } catch (error: any) {
    throw new NotFoundError(error);
  }
}

export async function getUserById(paramID: string): Promise<UserModel | null> {
  try {
    const foundUser: UserModel | null = await sequelize.transaction(
      async (t) => {
        const user = await UserModel.findOne({
          where: {
            id: paramID
          },
          transaction: t,
          include: GroupModel,
          logging: false
        });
        return user;
      }
    );

    return foundUser;
  } catch (error: any) {
    throw new NotFoundError(`NotFound user with  request: ${paramID}`);
  }
}

export async function getAutoSuggestUsers(
  loginSubstring: string,
  limitParam: number
): Promise<UserModel[]> {
  try {
    const suggestedUsers: UserModel[] = await sequelize.transaction(
      async (t) => {
        const users: UserModel[] = await UserModel.findAll({
          limit: limitParam,
          order: [['login', 'ASC']],
          where: {
            login: {
              [Op.or]: {
                // [Op.startsWith]: loginSubstring,
                // [Op.endsWith]: loginSubstring,
                [Op.iLike]: `%${loginSubstring}%`
              }
            }
          },
          transaction: t
        });
        return users;
      }
    );

    return suggestedUsers;
  } catch (error: any) {
    throw new NotFoundError(error);
  }
}

export async function updateUser(
  queryID: string,
  update: UpdateUserInput['body']
): Promise<UserModel | null> {
  try {
    const user: UserModel | null = await sequelize.transaction(async (t) => {
      const [count, users] = await UserModel.update(
        { ...update },
        {
          where: {
            id: queryID
          },
          returning: true,
          transaction: t
        }
      );
      return count > 0 ? users[0] : null;
    });

    return user;
  } catch (error: any) {
    throw new NotFoundError(`NotFound user with  request: ${queryID}`);
  }
}

export async function removeUser(queryID: string): Promise<UserModel | null> {
  try {
    const user: UserModel | null = await sequelize.transaction(async (t) => {
      const [count, users] = await UserModel.update(
        { isDeleted: true },
        {
          where: {
            id: queryID
          },
          returning: true,
          transaction: t
        }
      );
      return count > 0 ? users[0] : null;
    });

    return user;
  } catch (error: any) {
    throw new NotFoundError(`NotFound user with  request: ${queryID}`);
  }
}

export async function deleteUser(queryID: string): Promise<boolean> {
  try {
    await sequelize.transaction(async (t) => {
      await UserModel.destroy({
        where: {
          id: queryID
        },
        transaction: t
      });
    });

    return true;
  } catch (error: any) {
    throw new NotFoundError(`NotFound user with  request: ${queryID}`);
  }
}
