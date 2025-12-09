import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {IdDto} from "./dto/id.dto";
import {CreateCategoryDto, UpdateCategoryDto} from "./dto/category.dto";

@Injectable()
export class BlogService {
  constructor(readonly prismaService: PrismaService) {}

  /**
   * @description 查询所有blogMenu和关联的blogItem的数量
   * @return 博客菜单列表
   */
  async getAllMenu() {
    return this.prismaService.blogCategory.findMany({
      select: {
        id: true,
        order: true,
        name: true,
        groupName: true,
        _count: {
          select: {
            blog_post: true
          }
        }
      },
      orderBy: {
        id: 'asc'
      }
    });
  }

  /**
   * @description 获取博客列表
   * @param params 博客菜单id
   * @param pageSize 页大小
   * @param pageNum 页码
   * @return 博客列表
   */
  async getBlogList(params: IdDto, pageSize: number, pageNum: number) {
    // 计算跳过的记录数
    const skip = (pageNum - 1) * pageSize;
    // 执行分页查询
    const results = await this.prismaService.blogPost.findMany({
      where: { categoryId: params.id },
      select: { id: true, title: true },
      skip: skip,
      take: pageSize
    });
    // 获取总记录数用于计算总页数
    const total = await this.prismaService.blogPost.count({
      where: { categoryId: params.id }
    });
    return {
      items: results,
      meta: {
        total,
        page: pageNum,
        limit: pageSize
      }
    }
  }

  /**
   * 获取博客详情
   * @param params
   */
  async getBlogById(params: IdDto) {
    return this.prismaService.blogPost.findUnique({
      where: { id: params.id }
    });
  }

  /**
   * 创建博客分类
   */
  async createBlogCategoryService(createCategoryDto: CreateCategoryDto) {
    return this.prismaService.blogCategory.create({
      data: createCategoryDto
    })
  }

  /**
   * 修改博客分类
   */
  async updateBlogCategoryService(idDto: IdDto, updateCategoryDto: UpdateCategoryDto) {
    return this.prismaService.blogCategory.update({
      where: {id: idDto.id},
      data: updateCategoryDto
    })
  }
}
