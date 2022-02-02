import dotenv from 'dotenv';
import express from 'express';
import config from 'config';

import log from './utils/logger';
import router from './routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(router);

const port = config.get<number>('port');

app.listen(port, () => {
  log.info(`App started at http://localhost:${port}`);
});
