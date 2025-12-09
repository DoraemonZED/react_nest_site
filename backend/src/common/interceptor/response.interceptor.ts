import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { map } from 'rxjs/operators';

// 用于跳过全局格式化拦截响应
export const SKIP_RESPONSE_INTERCEPTOR = 'SKIP_RESPONSE_INTERCEPTOR';

export interface IResponse<T> {
  readonly code: number;
  readonly data: T;
  readonly timestamp: string;
}

export interface IPaginatedResponse<T> extends IResponse<T[]> {
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export class Response<T> implements IResponse<T> {
  public readonly code: number;
  public readonly data: T;
  public readonly timestamp: string;

  constructor(code: number, data: T) {
    this.code = code;
    this.data = data;
    this.timestamp = new Date().toISOString();
  }
}

export class PaginatedResponse<T> extends Response<T[]> implements IPaginatedResponse<T> {
  public readonly total: number;
  public readonly page: number;
  public readonly limit: number;
  public readonly totalPages: number;
  constructor(
    code: number,
    data: T[],
    total: number,
    page: number,
    limit: number,
  ) {
    super(code, data);
    this.total = total;
    this.page = page;
    this.limit = limit;
    this.totalPages = Math.ceil(total / limit);
  }
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {

  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    // 检查是否标记了跳过此拦截器
    const skipInterceptor = this.reflector.get<boolean>(
      SKIP_RESPONSE_INTERCEPTOR,
      context.getHandler()
    );
    // 如果标记跳过，则直接返回原始响应
    if (skipInterceptor) {
      return next.handle();
    }
    // 拦截数据统一返回结果
    return next.handle().pipe(
      map((data) => {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const code = response.code;
        // 如果是分页数据
        if (data && data.items && data.meta) {
          const { items, meta } = data;
          return new PaginatedResponse(
            code,
            items,
            meta.total, // 总条数
            meta.page, // 当前页
            meta.limit, // 每页条数
          );
        }
        // 普通数组或对象
        return new Response(code, data);
      }),
    );
  }
}
