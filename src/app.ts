import dotenv from 'dotenv';
import express from 'express';
import config from 'config';

import { sequelize } from './model/user.model';

import log from './utils/logger';
import router from './routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(router);

const port = config.get<number>('port');

const startApp = async () => {
  try {
    await sequelize.authenticate();
    log.info('Connection to DB has been established successfully.');
    app.listen(port, async () => {
      log.info(`App started at http://localhost:${port}`);
      // await sequelize.sync(); // Creating database if not exists
    });
  } catch (error) {
    log.error(error);
    process.exit(1);
  }
};

startApp();
