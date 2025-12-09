import {Controller, Get, Post, Body, Patch, Param, Delete, Query, Req} from '@nestjs/common';
import { BlogService } from './blog.service';
import { ApiOperation } from '@nestjs/swagger';
import { ListPageDto } from './dto/list-page.dto';
import { IdDto } from "./dto/id.dto";
import {CreateCategoryDto, UpdateCategoryDto} from "./dto/category.dto";

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('category')
  @ApiOperation({ summary: '获取所有menu' })
  async getBlogMenu() {
    return this.blogService.getAllMenu();
  }

  @Post('category')
  @ApiOperation({ summary: '创建博客分类菜单'})
  async createBlogMenu(@Body() createBlogDto: CreateCategoryDto) {
    return this.blogService.createBlogCategoryService(createBlogDto);
  }

  @Patch('category/:id')
  @ApiOperation({ summary: '修改博客分类菜单' })
  async updateBlogMenu(
    @Param() id: IdDto,
    @Body() updateBlogDto: UpdateCategoryDto
  ) {
    return this.blogService.updateBlogCategoryService(id, updateBlogDto);
  }

  @Delete('category/:id')
  @ApiOperation({ summary: '修改博客分类菜单' })
  async deleteBlogMenu(@Req() req: Request, @Param('id') id: string) {}

  @Get('list/:id')
  @ApiOperation({ summary: '根据categoryId获取博客列表' })
  async getBlogList(
    @Param() param: IdDto,
    @Query() pageDto: ListPageDto
  ) {
    return this.blogService.getBlogList(param, pageDto.pageSize, pageDto.pageNum);
  }

  @Get('post/:id')
  @ApiOperation({ summary: '根据博客id获取博客' })
  async getBlogItem(@Param() params: IdDto) {
    return this.blogService.getBlogById(params)
  }

  @Patch('post/:id')
  @ApiOperation({ summary: '修改博客文章' })
  async updateBlogItem(@Param() params: IdDto) {

  }

  @Post('post')
  @ApiOperation({ summary: '创建博客文章' })
  async createBlogItem(@Body() createBlogDto: string) {

  }

  @Delete('post/:id')
  @ApiOperation({ summary: '删除博客文章' })
  async deleteBlogItem(@Param() params: IdDto) {

  }
}
