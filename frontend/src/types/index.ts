import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface CategoryResponse {
  id: number;
  category: string;
  name: string;
  sort: number;
  count: number
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
export interface BlogListResponse {
  items: BlogListItems[]
  total: number
  pageSize: number
  pageNum: number
}