import {
  DataTypes,
  Optional,
  Model,
  HasManyAddAssociationsMixin
} from 'sequelize';

import { sequelize } from '../data-access/dbConnect';

import { UserModel } from './user.model';

export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

interface Group {
  id: string;
  name: string;
  permissions: Array<Permission>;
}

type CreateGroupModel = Optional<Group, 'id'>;

export class GroupModel
  extends Model<Group, CreateGroupModel>
  // eslint-disable-next-line prettier/prettier
  implements CreateGroupModel {
  declare id: string;
  declare name: string;
  declare permissions: Permission[];

  // declare readonly createdAt: Date;
  // declare readonly updatedAt: Date;

  declare addUserModels: HasManyAddAssociationsMixin<UserModel, string>;

  static async addUsersToGroup(
    groupId: string,
    userIds: string[]
  ): Promise<GroupModel | null> {
    try {
      const foundGroup: GroupModel | null = await sequelize.transaction(
        async (t) => {
          const group: GroupModel | null = await GroupModel.findOne({
            where: {
              id: groupId
            },
            include: UserModel,
            transaction: t
          });
          await group?.addUserModels(userIds, { transaction: t });
          return group;
        }
      );

      return foundGroup;
    } catch (error) {
      throw new Error('Transaction error');
    }
  }
}

GroupModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 100]
      }
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: ['READ']
    }
  },
  {
    tableName: 'groups',
    sequelize,
    timestamps: false
  }
);

setTimeout(() => {
  GroupModel.belongsToMany(UserModel, {
    through: 'usergroup',
    timestamps: false
  });
}, 0);
