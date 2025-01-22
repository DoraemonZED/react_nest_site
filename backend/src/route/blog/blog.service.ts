import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import {Express} from "express";
import * as fs from "fs";
import {InjectRepository} from "@nestjs/typeorm";
import {BlogItemEntity} from "./entities/blog-item.entity";
import {BlogMenuEntity} from "./entities/blog-menu.entity";
import {Repository} from "typeorm";

@Injectable()
export class BlogService {
  constructor(
      @InjectRepository(BlogItemEntity) private readonly blogItem: Repository<BlogItemEntity>,
      @InjectRepository(BlogMenuEntity) private readonly blogMenu: Repository<BlogMenuEntity>,
  ) {}

  /**
   * @description 查询所有blogMenu和关联的blogItem的数量
   * @return 博客菜单列表
   */
  async getAllMenu() {
    return await this.blogMenu.createQueryBuilder('blogMenu')
      .leftJoinAndSelect('blogMenu.blogItem', 'blogItem')
      .select([
        'blogMenu.id as id',
        'blogMenu.sort as sort',
        'blogMenu.name as name',
        'blogMenu.category as category',
        'COUNT(blogItem.id) as count'
      ])
      .groupBy('blogMenu.id')
      .getRawMany();
  }
  
  /**
   * @description 获取博客列表
   * @param id 博客菜单id
   * @param pageSize 页大小
   * @param pageNum 页码
   * @return 博客列表
   */
  async getBlogList(id: string, pageSize: number, pageNum: number) {
    const skip = (pageNum - 1) * pageSize;
    const [items, total] = await Promise.all([
      this.blogItem.find({
        where: { menu: { id } },
        skip,
        take: pageSize,
      }),
      this.blogItem.count({
        where: { menu: { id } }
      })
    ]);

    return {
      items,
      total,
      pageSize,
      pageNum
    };
  }

  /**
   * @description 保存文件至目录
   * @param files 文件
   * @param dirName 存放目录
   * @return 成功文件的路径和失败文件
   */
  async saveImageToLocal(files: Array<Express.Multer.File>, dirName: string) {
    const result = {
      "errFiles": {},
      "succMap": {}
    }
    // 没有则需要创建文件
    const filePath = 'upload' + dirName
    const saveDir = 'public/' + filePath
    if (!fs.existsSync(saveDir)) {
      fs.mkdirSync(saveDir, { recursive: true })
    }
    for (let item of files) {
      const fileName = Buffer.from(item.originalname, "latin1").toString("utf8")
      try {
        await fs.promises.writeFile('public/' + filePath + fileName, item.buffer)
        result.succMap[fileName] = filePath + fileName
      } catch (e) {
        result.errFiles[fileName] = e.code
      }
    }
    return result
  }
}
