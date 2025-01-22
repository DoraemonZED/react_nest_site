import {BlogListReqListParams, BlogListResponse, CategoryResponse} from "@/types";
import { http } from "@/utils/request";

export const blogApi = {
  getBlogMenu: () => http.get<CategoryResponse[]>('/blog/menu'),
  getBlogList: (params: BlogListReqListParams, id: string) => http.get<BlogListResponse>('/blog/list/' + id, { params }),
}