import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { logger } from '../../log4js/log4j';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data) => {
        const logFormat = `${req.ip} ${req.originalUrl} ${req.method} ${res.statusCode}`
        logger.info(logFormat)
        return data;
      }),
    );
  }
}
