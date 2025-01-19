import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res} from '@nestjs/common'
import { CreateUserDto } from "./dto/create-user.dto";
import { UserLoginDto } from "./dto/user-login.dto";
import {ApiBearerAuth, ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";
import { FunResult } from "../../common/decorator/fun-result.decorator";
import { UserInfoEntity} from "./entities/user.entity";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { UserService } from "./user.service";
import {AuthService} from "../../auth/auth.service";
import {ResultData} from "../../common/utils/result";
import {InjectRedis} from "@nestjs-modules/ioredis";
import {Redis} from "ioredis";

@ApiTags('用户相关接口')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  @ApiOperation({ summary: '用户注册' })
  @ApiBody({type: CreateUserDto})
  @Post('register')
  @FunResult(UserInfoEntity)
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto)
  }

  @ApiOperation({ summary: '用户登录' })
  @ApiBody({type: UserLoginDto})
  @Post('login')
  @FunResult(String)
  @UseGuards(AuthGuard('local'))
  async login(@Req() req: Request) {
    const user = req.user as Record<string, any>
    const token = this.authService.generateToken(user)
    await this.redis.set(user.account, token, 'EX', 3600)
    return ResultData.ok({...user, token})
  }

  @ApiOperation({ summary: '获取用户列表'})
  @ApiBearerAuth()
  @Get('list')
  @FunResult(UserInfoEntity, true, true)
  @UseGuards(AuthGuard('jwt'))
  async list(@Req() req: Request) {
    // TODO: 返回所有用户（后期管理使用）
    return ResultData.ok([])
  }
}
