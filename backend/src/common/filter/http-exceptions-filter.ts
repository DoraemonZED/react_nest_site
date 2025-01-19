import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common';
import { logger } from '../../log4js/log4j';

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const logFormat = `
HTTP异常 ###########################################
Request original url: ${request.originalUrl}
Method: ${request.method}
Status code: ${status}
Response: ${exception.toString()}
###########################################
`
    logger.info(logFormat);
    response.status(200).json({
      code: status,
      msg: exceptionResponse?.message || exception.message,
    });
  }
}
