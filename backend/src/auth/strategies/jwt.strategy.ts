import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private redisService: RedisService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 从Authorization头获取token
      ignoreExpiration: true, // 忽略过期检查(让redis来认证)
      secretOrKey: configService.get('jwt.secret'), // 与JwtModule一致
    });
  }

  /**
   * 验证JWT token
   * @param payload JWT解码后的payload(这里的payload已经是被jwt系统解析后的参数)
   * @returns 用户信息或抛出异常
   */
  async validate(payload: any) {
    // 验证token是否在Redis中存在
    const validToken = await this.redisService.get(`user:token:${payload.username}`) as string | null;
    if (!validToken) {
      throw new UnauthorizedException('无效的token或已登出');
    } else {
      await this.redisService.set(`user:token:${payload.username}`, validToken, this.configService.get('jwt.expiresTime'));
    }
    return { username: payload.username };
  }
}