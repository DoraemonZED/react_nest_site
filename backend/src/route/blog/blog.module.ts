import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {BlogItemEntity} from "./entities/blog-item.entity";
import {BlogMenuEntity} from "./entities/blog-menu.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([BlogItemEntity, BlogMenuEntity]),
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
