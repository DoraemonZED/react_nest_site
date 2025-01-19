import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { logger } from '../../log4js/log4j';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const logFormat = `
异常拦截 ###########################################
Request original url: ${request.originalUrl}
Method: ${request.method}
Status code: ${status}
Response: ${exception}
###########################################
`
    logger.error(logFormat);
    response.status(200).json({
      code: status,
      msg: `Service Error: ${exception}`,
    });
  }
}
