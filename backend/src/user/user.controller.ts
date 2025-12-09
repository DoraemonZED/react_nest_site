import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../common/guard/jwt-auth.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import { UserInfoDto } from './dto/user-info.dto';
import {SkipResponseInterceptor} from "../common/decorator/skip-response-interceptor.decorator";

@ApiTags('用户相关接口')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard) // 使用JWT守卫保护路由
  @Get()
  @SkipResponseInterceptor()
  @ApiBearerAuth()
  @ApiOperation({ summary: '查询所有用户' })
  @ApiResponse({type: UserInfoDto, isArray: true})
  async findAll() {
    return this.userService.findAllUser();
  }

  @Post('/register')
  @ApiOperation({ summary: '用户注册' })
  @ApiBody({type: CreateUserDto}) // 这里可不写在，下面@Body中会自动被推断
  @ApiResponse({type: CreateUserDto})
  async register(@Body() createBlogDto: CreateUserDto) {
    return this.userService.createUser(createBlogDto);
  }
}
