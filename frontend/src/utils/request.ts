import { loading } from '@/utils/loading';
import { message } from '@/utils/message';

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
}

// API响应接口
interface ApiResponse<T = any> {
  message?: string;
  data?: T;
  code?: number;
  [key: string]: any;
}

// 处理响应数据
async function handleResponse<T>(response: Response, responseType: ResponseType): Promise<T> {
  switch (responseType) {
    case ResponseType.JSON:
      return response.json();
    case ResponseType.TEXT:
      return response.text() as Promise<T>;
    case ResponseType.BLOB:
      return response.blob() as Promise<T>;
    case ResponseType.ARRAYBUFFER:
      return response.arrayBuffer() as Promise<T>;
    case ResponseType.FORMDATA:
      return response.formData() as Promise<T>;
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
export async function request<T = any>(
  url: string,
  options: ExtendedRequestInit = {}
): Promise<T> {
  const {
    showLoading = true,
    showError = true,
    responseType = ResponseType.JSON,
    prefix = BASE_URL,
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
    },
  };

  // 处理 POST 请求的 body
  if (mergedOptions.body && typeof mergedOptions.body === 'object') {
    mergedOptions.body = JSON.stringify(mergedOptions.body);
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
    const data = await handleResponse<ApiResponse<T>>(response, responseType);

    // 处理业务逻辑错误
    if (data.code && data.code !== 200) {
      throw new Error(data.message || '请求失败');
    }

    return data.data as T;
  } catch (error) {
    if (showError) {
      message.error(error instanceof Error ? error.message : '请求失败');
    }
    throw error;
  } finally {
    if (loadingInstance) {
      loadingInstance.close();
    }
  }
}

// 便捷方法
export const http = {
  get<T = any>(url: string, options?: ExtendedRequestInit) {
    return request<T>(url, { ...options, method: 'GET' });
  },

  post<T = any>(url: string, data?: any, options?: ExtendedRequestInit) {
    return request<T>(url, { ...options, method: 'POST', body: data });
  },

  put<T = any>(url: string, data?: any, options?: ExtendedRequestInit) {
    return request<T>(url, { ...options, method: 'PUT', body: data });
  },

  delete<T = any>(url: string, options?: ExtendedRequestInit) {
    return request<T>(url, { ...options, method: 'DELETE' });
  },
}; 