import {forwardRef, Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {AuthService} from "./auth.service";
import {LocalStrategyGuard} from "./localStrategy.guard";
import {JwtStrategyGuard} from "./jwtStrategy.guard";
import {PassportModule} from "@nestjs/passport";
import {UserModule} from "../route/user/user.module";

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('jwt')
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    forwardRef(() => UserModule),
  ],
  providers: [
    AuthService,
    LocalStrategyGuard,
    JwtStrategyGuard,
  ],
  exports: [
    AuthService,
    LocalStrategyGuard,
    JwtStrategyGuard,
  ]
})
export class AuthModule {}