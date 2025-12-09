import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { Request } from "express";
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../common/guard/local-auth.guard';
import { UserLoginDto } from '../user/dto/ user-login.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('系统认证接口')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: '登录认证' })
  @ApiBody({type: UserLoginDto})
  async login(@Req() req: Request) {
    return this.authService.login(req.user as Record<string, any>);
  }
}
