import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import configuration from './common/config'
import {APP_INTERCEPTOR, Reflector} from "@nestjs/core";
import {ResponseInterceptor} from "./common/interceptor/response.interceptor";

@Module({
  imports: [
    // 配置模块，加载配置信息
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configuration],
    }),
    UserModule,
    BlogModule,
    AuthModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR, // 全局注册响应拦截器
      useClass: ResponseInterceptor,
    },
    Reflector,
  ],
})
export class AppModule {}
