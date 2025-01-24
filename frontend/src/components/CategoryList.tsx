'use client';

import { Card, CardBody } from "@heroui/react";
import { FadeIn } from '@/components/FadeIn';
import { CategoryResponse } from '@/types';
import { useNavigate } from "react-router-dom";

interface CategoryListProps {
  categories: CategoryResponse[];
  loading: boolean;
  error: string | null;
}

export default function CategoryList({ categories, loading, error }: CategoryListProps) {
  const navigate = useNavigate();

  // 按 groupName 对分类进行分组
  const groupedCategories = categories.reduce((acc, category) => {
    if (!acc[category.category]) {
      acc[category.category] = [];
    }
    acc[category.category].push(category);
    return acc;
  }, {} as Record<string, CategoryResponse[]>);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <aside className="w-full shrink-0">
      {loading ? (
        <div>Loading...</div>
      ) : (
        Object.entries(groupedCategories).map(([groupName, categories]) => (
          <div key={groupName} className="mb-6">
            <h3 className="text-lg font-medium mb-2">
              {groupName}
            </h3>
            <div className="space-y-2">
              {categories.map((category, index) => (
                <FadeIn 
                  key={category.id}
                  delay={index * 0.1}
                >
                  <Card
                    isPressable
                    className="bg-content1 hover:bg-content2 w-full"
                    onPress={() => navigate(`/blog/${category.id}`)}
                  >
                    <CardBody className="py-2 px-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">
                          {category.name}
                        </span>
                        <span className="text-small text-default-500">
                          {category.count || 0}
                        </span>
                      </div>
                    </CardBody>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        ))
      )}
    </aside>
  );
}