import { sequelize } from '../data-access/dbConnect';
import { GroupModel } from '../model/group.model';
import { UserModel } from '../model/user.model';
import { CreateGroupInput, UpdateGroupInput } from '../schema/group.schema';

export async function createGroup(
  input: CreateGroupInput['body']
): Promise<GroupModel> {
  try {
    const newGroup: GroupModel = await sequelize.transaction(async (t) => {
      const group: GroupModel = await GroupModel.create(input, {
        transaction: t
      });

      return group;
    });

    return newGroup;
  } catch (error: any) {
    throw new Error(error.errors[0].message);
  }
}

export async function getGroups(): Promise<GroupModel[]> {
  try {
    const groups: GroupModel[] = await sequelize.transaction(async (t) => {
      const dbUsers: GroupModel[] = await GroupModel.findAll({
        transaction: t
      });

      return dbUsers;
    });

    return groups;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getGroupById(
  paramID: string
): Promise<GroupModel | null> {
  try {
    const foundGroup: GroupModel | null = await sequelize.transaction(
      async (t) => {
        const group = await GroupModel.findOne({
          where: {
            id: paramID
          },
          transaction: t,
          include: UserModel,
          logging: false
        });
        return group;
      }
    );

    return foundGroup;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function updateGroup(
  queryID: string,
  update: UpdateGroupInput['body']
): Promise<GroupModel | null> {
  try {
    const group: GroupModel | null = await sequelize.transaction(async (t) => {
      const [count, groups] = await GroupModel.update(
        { ...update },
        {
          where: {
            id: queryID
          },
          returning: true,
          transaction: t
        }
      );
      return count > 0 ? groups[0] : null;
    });

    return group;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteGroup(queryID: string): Promise<boolean> {
  try {
    await sequelize.transaction(async (t) => {
      await GroupModel.destroy({
        where: {
          id: queryID
        },
        transaction: t
      });
    });

    return true;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function addUsersToGroupService(
  groupID: string,
  userIDs: string[]
) {
  try {
    const updatedGroup: GroupModel | null = await GroupModel.addUsersToGroup(
      groupID,
      userIDs
    );
    return updatedGroup;
  } catch (error: any) {
    throw new Error(error);
  }
}
