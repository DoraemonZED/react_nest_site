// skip-interceptor.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { SKIP_RESPONSE_INTERCEPTOR } from '../interceptor/response.interceptor'
// 在路由中使用@SkipGlobalInterceptor()禁用全局响应拦截器
export const SkipResponseInterceptor = () => SetMetadata(SKIP_RESPONSE_INTERCEPTOR, true);