import chalk from 'chalk';
import config from 'config';
import winston from 'winston';

const logLevel = config.get<string>('logLevel');

const format = winston.format.combine(
  winston.format.errors({ stack: true }),
  winston.format((info) => {
    info.level = info.level.toUpperCase();
    if (info.level === 'ERROR') {
      info.message = chalk.red(info.message);
    } else if (info.level === 'INFO') {
      info.message = chalk.blue(info.message);
    }
    return info;
  })(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize(),
  winston.format.printf(({ level, message, timestamp, stack }) => {
    timestamp = chalk.italic.gray(timestamp);
    if (stack) {
      return `[${level}] [${timestamp}] ${message} - ${stack}`;
    }
    return `[${level}] ${timestamp} ${message}`;
  })
);

const transports = [new winston.transports.Console()];

const Logger = winston.createLogger({
  level: logLevel,
  format,
  transports,
  // rejectionHandlers: [transports],
  // exceptionHandlers: [transports]
  exitOnError: false
});

export default Logger;
