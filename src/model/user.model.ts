import { DataTypes, Sequelize, Model } from 'sequelize';
import config from 'config';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export default interface User {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
  // eslint-disable-next-line semi
}

export type UserView = Optional<User, 'password'>;

type CreateUserModel = Optional<User, 'id' | 'isDeleted'>;

const sequelize = new Sequelize({
  dialect: config.get('dbDialect'),
  host: config.get('dbHost'),
  port: config.get('dbPort'),
  username: config.get('dbUsername'),
  password: config.get('dbPassword'),
  database: config.get('dbDatabase'),
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

class UserModel
  extends Model<User, CreateUserModel>
  implements CreateUserModel {
  declare id: string;
  declare login: string;
  declare password: string;
  declare age: number;
  declare isDeleted: boolean;

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

export { sequelize, UserModel };
