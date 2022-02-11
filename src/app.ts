/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import dotenv from 'dotenv';
import express from 'express';
import config from 'config';

import { sequelize } from './data-access/dbConnect';

import log from './utils/logger';
import router from './routes';

import { UserModel } from './model/user.model';
import { GroupModel } from './model/group.model';

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
      // await sequelize.sync(); // Creating database if not exists
      // await UserModel.sync();
      // await GroupModel.sync();
      log.info(`App started at http://localhost:${port}`);
    });
  } catch (error) {
    log.error(error);
    process.exit(1);
  }
};

startApp();
