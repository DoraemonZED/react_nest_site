import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common';
import { Logger } from '../utils/Logger';

/**
 * 获取http异常(所有有状态码的报错)
 */
@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const logFormat = `
###########################################
Request original url: ${request.originalUrl}
Method: ${request.method}
Status code: ${status}
Response: ${exception.toString()}
${exception.stack}
${exceptionResponse?.message || exception.message}
###########################################
`
    Logger.error('http异常', logFormat);
    response.status(200).json({
      code: status,
      msg: exceptionResponse?.message || exception.message,
    });
  }
}
