import { loading } from '@/utils/loading';
import { message } from '@/utils/message';
import qs from 'qs'; // 假设使用 qs 库来处理查询字符串

// 基础配置
const BASE_URL = '/api';

// 响应类型枚举
export enum ResponseType {
  JSON = 'json',
  TEXT = 'text',
  BLOB = 'blob',
  ARRAYBUFFER = 'arraybuffer',
  FORMDATA = 'formdata'
}

// 扩展的请求配置接口
interface ExtendedRequestInit extends RequestInit {
  showLoading?: boolean;
  showError?: boolean;
  responseType?: ResponseType;
  prefix?: string;
  params?: Record<string, any>; // 添加 params 属性
}

interface IResponse<T> {
  code: number;
  data: T;
  msg?: string;
}

interface IPageResponse<T> extends IResponse<T> {
  total: number
  page: number
  limit: number
  totalPages: number
}

// API响应接口
export type ApiResponse<T = any, P extends boolean = false> = P extends true ? IPageResponse<T> : IResponse<T>;

// 处理响应数据
async function handleResponse(response: Response, responseType: ResponseType) {
  switch (responseType) {
    case ResponseType.JSON:
      return response.json();
    case ResponseType.TEXT:
      return response.text();
    case ResponseType.BLOB:
      return response.blob();
    case ResponseType.ARRAYBUFFER:
      return response.arrayBuffer();
    case ResponseType.FORMDATA:
      return response.formData();
    default:
      return response.json();
  }
}

// 检查响应状态
function checkStatus(response: Response): void {
  if (response.status >= 200 && response.status < 300) {
    return;
  }
  const error = new Error(response.statusText);
  error.message = `${response.status}: ${response.statusText}`;
  throw error;
}

// 主请求函数
export async function request<T = any, P extends boolean = false>(
  url: string,
  options: ExtendedRequestInit = {}
): Promise<ApiResponse<T, P>> {
  const {
    showLoading = true,
    showError = true,
    responseType = ResponseType.JSON,
    prefix = BASE_URL,
    params = {}, // 默认为空对象
    ...fetchOptions
  } = options;
  // 默认请求配置
  const defaultOptions: RequestInit = {
    credentials: 'include', // 携带 cookies
    headers: {
      'Content-Type': 'application/json',
    },
  };
  // 合并配置
  const mergedOptions = {
    ...defaultOptions,
    ...fetchOptions,
    headers: {
      ...defaultOptions.headers,
      ...fetchOptions.headers,
    } as HeadersInit,
  };
  // 处理 GET 请求的 params 参数
  if (mergedOptions.method === 'GET' && Object.keys(params).length > 0) {
    url = `${url}?${qs.stringify(params)}`;
  }
  // 处理 POST 请求的 body
  if (mergedOptions.body) {
    if (mergedOptions.body instanceof FormData) {
      // 如果 body 是 FormData，不需要设置 Content-Type
      mergedOptions.headers = new Headers(mergedOptions.headers as HeadersInit);
      mergedOptions.headers.delete('Content-Type'); // 删除自动设置的 Content-Type
    } else if (typeof mergedOptions.body === 'object') {
      mergedOptions.body = JSON.stringify(mergedOptions.body);
      const headers = new Headers(mergedOptions.headers as HeadersInit);
      headers.set('Content-Type', 'application/json');
      mergedOptions.headers = headers;
    }
  }
  let loadingInstance;
  try {
    if (showLoading) {
      loadingInstance = loading.open();
    }
    const fullUrl = url.startsWith('http') ? url : `${prefix}${url}`;
    const response = await fetch(fullUrl, mergedOptions);
    // 检查响应状态
    checkStatus(response);
    // 处理响应数据
    const data = await handleResponse(response, responseType) as ApiResponse<T, P>;
    // 处理业务逻辑错误
    if (data.code && data.code >= 300) {
      throw new Error(data.msg || '请求失败');
    }
    return data;
  } catch (error) {
    showError && message.error(error instanceof Error ? error.message : '请求失败');
    return {code: 5001} as ApiResponse<T, P>;
  } finally {
    loadingInstance && loadingInstance.close();
  }
}

// 便捷方法
export const http = {
  get<T = any, P extends boolean = false>(url: string, options?: ExtendedRequestInit) {
    return request<T, P>(url, { ...options, method: 'GET' });
  },

  post<T = any, P extends boolean = false>(url: string, data?: any, options?: ExtendedRequestInit) {
    return request<T, P>(url, { ...options, method: 'POST', body: data });
  },

  put<T = any, P extends boolean = false>(url: string, data?: any, options?: ExtendedRequestInit) {
    return request<T, P>(url, { ...options, method: 'PUT', body: data });
  },

  delete<T = any, P extends boolean = false>(url: string, options?: ExtendedRequestInit) {
    return request<T, P>(url, { ...options, method: 'DELETE' });
  },
};
