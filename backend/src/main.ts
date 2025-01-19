import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { mw as requestIpMw } from 'request-ip';
import rateLimit from 'express-rate-limit';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { LogMiddleware } from './common/middleware/log.middleware';
import { logger } from './log4js/log4j';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { ExceptionsFilter } from './common/filter/exceptions-filter';
import { HttpExceptionsFilter } from './common/filter/http-exceptions-filter';
import {NestExpressApplication} from "@nestjs/platform-express";
import {join} from "path";

async function bootstrap() {
  // 使用log4js
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: logger,
  });
  const config = app.get(ConfigService);
  // 全局api前缀
  app.setGlobalPrefix(config.get<string>('app.prefix'))
  // 静态文件目录
  app.useStaticAssets(join(__dirname, '../public'), {prefix: '/static'})
  // 跨域
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
  // 设置访问频率
  app.use(
    rateLimit({
      windowMs: 15 * 1000 * 60, // 15分钟
      limit: 1000, // 1000次
    }),
  );
  // 获取真实 ip
  app.use(requestIpMw({ attributeName: 'ip' }));
  // 日志中间件
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(new LogMiddleware().use);
  // 接口请求参数验证，dto
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 只有定义的字段才通过
      transform: true, // 转换成Dto类
      disableErrorMessages: false,
    }),
  );
  // 全局参数序列化，entity中@Exclude不会返回
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalInterceptors(new TransformInterceptor())
  // ############## 拦截所有异常
  app.useGlobalFilters(new ExceptionsFilter())
  app.useGlobalFilters(new HttpExceptionsFilter())
  // 接口文档配置
  const docs = new DocumentBuilder()
    .setTitle('个人网站接口文档')
    .setDescription('The API description')
    .addBearerAuth()
    .setVersion('1.0')
    .addTag('y-h-love.api')
    .build();
  const document = SwaggerModule.createDocument(app, docs);
  SwaggerModule.setup('api-docs', app, document);
  // 启动服务
  const port = config.get<number>('app.port');
  await app.listen(port);
  // 打印启动结果
  logger.log(`文档地址：http://localhost:${port}/api-docs`);
  logger.log(`api接口：http://localhost:${port}/api`);
}

bootstrap();
