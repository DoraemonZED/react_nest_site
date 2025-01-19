import { IStrategyOptions, Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { UserService } from "../route/user/user.service";
import { compare } from "bcryptjs";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import {UserInfoEntity} from "../route/user/entities/user.entity";
import {classToPlain, serialize, TransformInstanceToPlain} from "class-transformer";

@Injectable()
export class LocalStrategyGuard extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password'
    } as IStrategyOptions);
  }

  async validate(username: string, password: string) {
    const user: UserInfoEntity = await this.userService.findOneByAccount(username)
    if (!user) {
      throw new UnauthorizedException('用户名不存在')
    }
    const checkPassword = await compare(password, user.password)
    if (!checkPassword) {
      throw new UnauthorizedException('密码错误')
    }
    return classToPlain(user)
  }
}