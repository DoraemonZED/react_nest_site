import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // 继承AuthGuard并指定使用local策略
  // 这个守卫会调用LocalStrategy的validate方法
}