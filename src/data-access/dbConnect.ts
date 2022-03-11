import { Sequelize } from 'sequelize';
import config from 'config';
// import Logger from '../utils/logger';

export const sequelize = new Sequelize({
  dialect: config.get('databaseParams.dbDialect'),
  host: config.get('databaseParams.dbHost'),
  port: config.get('databaseParams.dbPort'),
  username: config.get('databaseParams.dbUsername'),
  password: config.get('databaseParams.dbPassword'),
  database: config.get('databaseParams.dbDatabase'),
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  logging: false
  // logging: (message) => Logger.info(message)
});
