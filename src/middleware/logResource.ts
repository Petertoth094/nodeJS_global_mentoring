import morgan from 'morgan';
import chalk from 'chalk';
import Logger from '../utils/logger';

export const morganChalk = morgan(
  (tokens, req, res) => {
    return [
      chalk.green.bold(tokens.method(req, res)),
      chalk.red.bold(tokens.status(req, res)),
      chalk.white(tokens.url(req, res)),
      chalk.yellow(`${tokens['response-time'](req, res)} ms`)
    ].join(' ');
  },
  { stream: { write: (message) => Logger.info(message) } }
);

/*
 * My logResource
 *
import { Request, Response, NextFunction } from 'express';
import Logger from '../utils/logger';

const getActualRequestDurationInMilliseconds = (start: [number, number]) => {
  const NS_PER_SEC = 1e9; //  convert to nanoseconds
  const NS_TO_MS = 1e6; // convert to milliseconds
  const diff = process.hrtime(start);
  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
};

const logResource = (req: Request, res: Response, next: NextFunction): void => {
  const currentDatetime: Date = new Date();
  const formattedDate = `${currentDatetime.getFullYear()}-${
    currentDatetime.getMonth() + 1
  }-${currentDatetime.getDate()} ${currentDatetime.getHours()}:${currentDatetime.getMinutes()}:${currentDatetime.getSeconds()}`;
  const method: string = req.method;
  const url: string = req.url;
  const status: number = res.statusCode;
  const start: [number, number] = process.hrtime();
  const durationInMilliseconds: number =
    getActualRequestDurationInMilliseconds(start);
  const log = `[${formattedDate}] ${method}:${url} ${status} ${durationInMilliseconds.toLocaleString()} ms`;
  Logger.info(log);
  next();
};

export default logResource;
 */
