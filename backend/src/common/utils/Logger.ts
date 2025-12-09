import { configure, getLogger } from 'log4js';

// ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF
export const configureLog4js = () => {
  configure({
    appenders: {
      console: { type: 'console' },
      file: {
        type: 'file',
        filename: 'logs/app.log',
        maxLogSize: 10 * 1024 * 1024, // 10MB
        backups: 5,
        compress: true,
      },
    },
    // 指定使用定义的哪个appenders， level输出大于等于这个等级的日志
    categories: {
      default: { appenders: ['console', 'file'], level: 'info' },
      http: { appenders: ['console'], level: 'debug' },
    },
  });
};

// 日志log4js初始化
configureLog4js()
export const logger = getLogger();
export const httpLogger = getLogger('http');


export class Logger {

  public static log(message: any, context?: string) {
    logger.info(`[${context}] ${message}`);
  }

  public static error(message: any, context?: string) {
    logger.error(`[${message}] ${context}`);
  }

  public static warn(message: any, context?: string) {
    logger.warn(`[${context}] ${message}`);
  }

  public static debug(message: any, context?: string) {
    logger.debug(`[${context}] ${message}`);
  }

  public static info(message: any, context?: string) {
    logger.info(`[${context}] ${message}`);
  }

  public static verbose(message: any, context?: string) {
    logger.trace(`[${context}] ${message}`);
  }
}
