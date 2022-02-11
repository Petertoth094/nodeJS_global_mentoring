import { DataTypes, HasManyAddAssociationsMixin, Model } from 'sequelize';
import { CreateUserInput } from '../schema/user.schema';
import { GroupModel } from './group.model';

import { sequelize } from '../data-access/dbConnect';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export default interface User {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
  // eslint-disable-next-line semi
}

type CreateUserModel = Optional<User, 'id' | 'isDeleted'>;

export class UserModel
  extends Model<User, CreateUserModel>
  // eslint-disable-next-line prettier/prettier
  implements CreateUserModel {
  declare id: string;
  declare login: string;
  declare password: string;
  declare age: number;
  declare isDeleted: boolean;

  declare addGroupModels: HasManyAddAssociationsMixin<GroupModel, string>;

  // declare readonly createdAt: Date;
  // declare readonly updatedAt: Date;
}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 15]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 4,
        max: 130
      }
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  },
  {
    tableName: 'users',
    sequelize,
    timestamps: false
  }
);

setTimeout(() => {
  UserModel.belongsToMany(GroupModel, {
    through: 'usergroup',
    timestamps: false
  });
}, 0);
