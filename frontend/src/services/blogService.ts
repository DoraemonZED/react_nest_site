import { http } from "@/utils/request";

export interface CategoryResponse {
  id: number;
  groupName: string;
  name: string;
  sort: number;
  _count: {
    blog_post: number
  }
}

export interface BlogListReqListParams {
  pageNum: number;
  pageSize: number;
}

export interface BlogListItems {
  id: number;
  title: string;
}

export interface BlogInfo {
  content: string;
  id: number;
  title: string;
  author: string;
}

export const blogService = {
  // 获取博客菜单
  async getBlogMenu() {
    const response = await http.get<CategoryResponse[]>('/blog/category');
    return response.data;
  },
  // 根据菜单获取详情列表
  async getBlogList(params: BlogListReqListParams, id: string) {
    return await http.get<BlogListItems[], true>('/blog/list/' + id, {params});
  },
  // 根据id获取博客
  async getBlogInfo(id: string) {
    const response = await http.get<BlogInfo>(`/blog/post/${id}`);
    return response.data;
  }
}