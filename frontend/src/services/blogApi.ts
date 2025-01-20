import { CategoryResponse } from "@/types";
import { http } from "@/utils/request";

export const blogApi = {
  getBlogList: () => http.get<CategoryResponse[]>('/blog'),
}