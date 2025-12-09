import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { RedisService } from '../redis/redis.service';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 验证用户
   * @param username 用户名
   * @param password 密码
   * @returns 用户信息或null
   */
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * 用户登录
   * @param user 用户信息
   * @returns 包含access_token的对象
   */
  async login(user: any) {
    const payload = { username: user.username };
    const token = this.jwtService.sign(payload);
    // 将token存储到Redis，设置过期时间与JWT一致
    await this.redisService.set(`user:token:${user.username}`, token, this.configService.get('jwt.expiresTime'));
    return {
      accessToken: token,
    };
  }

  /**
   * 登出 - 从Redis删除token
   * @param username 用户ID
   */
  async logout(username: string): Promise<void> {
    await this.redisService.del(`user:token:${username}`);
  }
}