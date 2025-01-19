import { Injectable, NestMiddleware } from "@nestjs/common";
import { logger } from "../../log4js/log4j";
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    next();
  }
}
