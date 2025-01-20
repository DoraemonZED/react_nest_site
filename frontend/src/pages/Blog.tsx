
import { Card } from "@heroui/react";
import CategoryList from "@/components/CategoryList";
import { blogApi } from '@/services/blogApi';
import { CategoryResponse } from '@/types';
import { useEffect, useState, useRef } from "react";

interface BlogLayoutProps {
  children: React.ReactNode
}

export default function Blog({ children }: BlogLayoutProps) {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    setIsLoading(true);

    blogApi.getBlogList()
      .then((data) => {
        setCategories(data as CategoryResponse[] || []);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="relative mx-auto md:flex md:flex-row">
      {/* 左侧导航 */}
      <div className="md:sticky md:top-[80px] md:self-start">
        <Card className="h-[calc(100vh-90px)] w-[280px] overflow-y-auto styled-scrollbar p-2 box-border" data-lenis-prevent>
          <CategoryList
            categories={categories}
            loading={isLoading}
            error={error}
          />
        </Card>
      </div>
      {/* 右侧文章内容 */}
      <Card className="flex-1 ml-2">{children}</Card>
    </div>
  )
}