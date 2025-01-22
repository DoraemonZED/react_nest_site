import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Header,
  HttpCode, UploadedFiles, HttpException, Req, Put, Query
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import {FileInterceptor, FilesInterceptor} from "@nestjs/platform-express";
import {ApiBody, ApiOperation} from "@nestjs/swagger";
import {SaveOriginImgDto} from "./dto/save-origin-img.dto";
import { ResultData } from 'src/common/utils/result';
import { PageDto } from './dto/page.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('menu')
  @ApiOperation({ summary: '获取所有menu' })
  async getList() {
    return ResultData.ok(await this.blogService.getAllMenu())
  }

  @Post('menu')
  @ApiOperation({ summary: '创建menu' })
  creatList(@Body() createBlogDto: CreateBlogDto) {
    return ''
  }

  @Delete('menu/:id')
  @ApiOperation({ summary: '删除menu' })
  deleteList(@Body() createBlogDto: CreateBlogDto) {
    return ''
  }

  @Get('list/:id')
  @ApiOperation({ summary: '根据menuId获取博客列表' })
  @HttpCode(200)
  async getBlogList(
    @Param('id') id: string,
    @Query() pageDto: PageDto
  ) {
    return ResultData.ok(await this.blogService.getBlogList(id, pageDto.pageSize, pageDto.pageNum))
  }

  @Put('list/:id')
  @ApiOperation({ summary: '编辑博客' })
  @HttpCode(200)
  edit(@Body() createBlogDto: CreateBlogDto) {
    return ''
  }

  
  @Post('uploadImg')
  @HttpCode(200)
  @ApiOperation({ summary: '博客中上传文件到服务器返回资源链接' })
  @UseInterceptors(
    FilesInterceptor('files', 10, {fileFilter(req: any, file: {
        fieldname: string;
        originalname: string;
        encoding: string;
        mimetype: string;
        size: number;
        destination: string;
        filename: string;
        path: string;
        buffer: Buffer
      }, callback: (error: (Error | null), acceptFile: boolean) => void) {
        // 控制上传文件类型为图片
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (allowedMimeTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new HttpException('Invalid file type.', 400), false)
        }
      }})
  )
  async uploadImg(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body: Record<string, string>) {
    const fileRes = await this.blogService.saveImageToLocal(files, body.fileName)
    return {
      code: 200,
      data: fileRes
    }
  }
  
  @Post('saveOriginImgToLocal')
  @ApiOperation({ summary: '提交远程图片的地址，服务器保存图片并返回资源链接' })
  @ApiBody({type: SaveOriginImgDto})
  @HttpCode(200)
  async saveOriginImg(@Body() fileOriginUrl: SaveOriginImgDto) {
    return {
      "msg": "",
      "code": 0,
      "data": {
        originalURL: fileOriginUrl.url,
        url: 'http://localhost:8910/static/upload/aaa.jpg'
      }
    };
  }
}
