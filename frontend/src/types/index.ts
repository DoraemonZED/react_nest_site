import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface CategoryResponse {
  id: number;
  category: string;
  name: string;
  sort: number;
  _count: {
    posts: number;
  };
}