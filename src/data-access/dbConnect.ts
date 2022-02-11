import { Sequelize } from 'sequelize';
import config from 'config';

export const sequelize = new Sequelize({
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
