import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { logger } from './common/utils/Logger';
import { ConfigService } from '@nestjs/config';
import rateLimit from 'express-rate-limit';
import { mw as requestIpMw } from 'request-ip';
import { LogMiddleware } from './common/middleware/log.middleware';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ExceptionsFilter } from './common/filter/exceptions.filter';
import { HttpExceptionsFilter } from './common/filter/http-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: logger,
  });
  // 取配置信息
  const config = app.get(ConfigService);
  // 全局api前缀
  app.setGlobalPrefix(config.get<string>('app.prefix'))
  // 静态文件目录
  app.useStaticAssets('public', {prefix: '/static'})
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
  // 将请求体转换为json如：app.use(express.json())
  app.useBodyParser('json', { limit: '100kb' });
  // 解析url参数如：app.use(express.urlencoded({ extended: true }))
  app.useBodyParser('urlencoded', { extended: true });
  // 日志中间件
  app.use(new LogMiddleware().use);
  // 接口请求参数验证，dto
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 只有定义的字段才通过
      transform: true, // 转换成Dto类
      disableErrorMessages: false,
    }),
  );
  // 全局参数序列化（Dto中@Exclude不会被返回）
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  // 拦截所有异常输出格式##############
  app.useGlobalFilters(
    new ExceptionsFilter(),
    new HttpExceptionsFilter(),
  )
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
bootstrap().catch(err => {});
