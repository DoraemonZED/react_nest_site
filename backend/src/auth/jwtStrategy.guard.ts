import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, StrategyOptions, Strategy, } from "passport-jwt";
import {ConfigService} from "@nestjs/config";
import {InjectRedis} from "@nestjs-modules/ioredis";
import {Redis} from "ioredis";

@Injectable()
export class JwtStrategyGuard extends PassportStrategy(Strategy) {

  constructor(
    private readonly configService: ConfigService,
    @InjectRedis() private readonly redis: Redis
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('jwt.secret')
    } as StrategyOptions);
  }

  // JWT验证 - Step 4: 被守卫调用
  async validate(payload: any) {
    const isLogin = await this.redis.get(payload.account)
    if (!isLogin) {
      throw new UnauthorizedException('登录已过期')
    } else {
      this.redis.expire(payload.account, 3600) // 更新过期时间
    }
    return {
      userId: payload.id,
      account: payload.account
    };
  }
}