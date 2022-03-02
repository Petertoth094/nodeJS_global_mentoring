/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import config from 'config';

import router from './routes';

import { sequelize } from './data-access/dbConnect';
import { UserModel } from './model/user.model';
import { GroupModel } from './model/group.model';

import Logger from './utils/logger';
import { morganChalk } from './middleware/logResource';

import {
  errorHandler,
  isOperationalError
} from './middleware/errorHandler.middleware';

dotenv.config();

const app = express();
const port = config.get<number>('port');

app.use(cookieParser());
app.use(express.json());

app.use(cors());

app.use(morganChalk);

app.use(router);
app.use(errorHandler);

const startApp = async () => {
  try {
    await sequelize.authenticate();
    Logger.info('Connection to DB has been established successfully.');
    app.listen(port, async () => {
      // await sequelize.sync(); // Creating database if not exists
      // await UserModel.sync();
      // await GroupModel.sync();
      Logger.info(`App started at http://localhost:${port}`);
    });
  } catch (error) {
    Logger.error(error);
    process.exitCode = 1;
  }
};

startApp();

process
  .on('unhandledRejection', (reason: Error, p: Promise<any>) => {
    throw reason;
  })
  .on('uncaughtException', (err: Error) => {
    Logger.error(err);
    if (!isOperationalError(err)) {
      Logger.error('Restarting session');
      process.exitCode = 1;
    }
  });
