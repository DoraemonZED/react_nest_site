import { Card, CardBody } from "@heroui/react";
import { useNavigate } from "react-router-dom";

import { FadeIn } from "@/components/FadeIn";
import { CategoryResponse } from "@/services/blogService.ts";

interface CategoryListProps {
  categories: CategoryResponse[]
  loading: boolean
}

export default function CategoryList({
  categories,
  loading
}: CategoryListProps) {
  const navigate = useNavigate();

  // 按 groupName 对分类进行分组
  const groupedCategories = categories.reduce(
    (acc, category) => {
      if (!acc[category.groupName]) {
        acc[category.groupName] = [];
      }
      acc[category.groupName].push(category);
      return acc;
    },
    {} as Record<string, CategoryResponse[]>,
  );

  const handleClick = (id: number) => {
    navigate(`/blog/${id}`)
  }

  return (
    <aside className="w-full shrink-0">
      {loading ? (
        <div>Loading...</div>
      ) : (
        Object.entries(groupedCategories).map(([groupName, categories]) => (
          <div key={groupName} className="mb-6">
            <h3 className="text-lg font-medium mb-2">{groupName}</h3>
            <div className="space-y-2">
              {categories.map((category, index) => (
                <FadeIn key={category.id} delay={index * 0.1}>
                  <Card onPress={() => handleClick(category.id)} isPressable className="bg-content1 hover:bg-content2 w-full">
                    <CardBody className="py-2 px-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{category.name}</span>
                        <span className="text-small text-default-500">
                          {category._count.blog_post || 0}
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
