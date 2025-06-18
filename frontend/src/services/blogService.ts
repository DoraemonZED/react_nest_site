import { http } from "@/utils/request";

export interface CategoryResponse {
  id: number;
  category: string;
  name: string;
  sort: number;
  count: number
}

export interface BlogListResponse {
  items: BlogListItems[]
  total: number
  pageSize: number
  pageNum: number
}

export interface BlogListReqListParams {
  pageNum: number;
  pageSize: number;
}

export interface BlogListItems {
  content: string;
  id: number;
  title: string;
}

export const blogService = {
  // 获取博客菜单
  async getBlogMenu(): Promise<CategoryResponse[]> {
    const response = await http.get('/blog/menu');
    return response.data;
  },
  // 根据菜单获取详情列表
  async getBlogList(params: BlogListReqListParams, id: string): Promise<BlogListResponse> {
    const response = await http.get('/blog/list/' + id, { params })
    return response.data;
  }
}