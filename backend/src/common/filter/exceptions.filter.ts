import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Logger } from '../utils/Logger';

/**
 * 这里的报错基本是代码报错
 */
@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const logFormat = `
###########################################
Request original url: ${request.originalUrl}
Method: ${request.method}
Status code: ${status}
Response: ${exception}
${exception.stack}
###########################################
`
    Logger.error('服务异常', logFormat);
    response.status(200).json({
      code: status,
      msg: `Service Error: ${exception}`,
    });
  }
}
