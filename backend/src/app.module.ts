import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';
import configuration from './config/index';
import { UserModule } from './route/user/user.module';
import { BlogModule } from './route/blog/blog.module';
import {MulterModule} from "@nestjs/platform-express";
import * as Minio from 'minio';

@Module({
  imports: [
    // 配置模块，加载配置信息
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configuration],
    }),
    // typeorm数据库配置
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('db.mysql')
    }),
    //redis缓存配置
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('redis')
    }),
    // 路由模块
    UserModule,
    BlogModule,
  ],
  providers: [
  ],
  exports: []
})
export class AppModule {}
