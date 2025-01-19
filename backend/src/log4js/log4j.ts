import * as Log4js from 'log4js';

// ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF
Log4js.configure({
  appenders: {
    // 控制台打印
    console: {
      type: 'console'
    },
    // 输出到文件
    file: {
      type: 'datefile',
      filename: './logs/default',
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
    }
  },
  categories: {
    // 指定使用定义的哪个appenders， level输出大于等于这个等级的日志
    default: { appenders: ['console'], level: 'info' },
    file: { appenders: ['file'], level: 'info' }
  }
})

export const logger = Log4js.getLogger() // 输出到控制台
// export const logger = Log4js.getLogger('file') // 输出到文件