import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // 继承AuthGuard并指定使用jwt策略
  // 这个守卫会调用JwtStrategy的validate方法
}