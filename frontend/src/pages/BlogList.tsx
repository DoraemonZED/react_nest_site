'use client';

import { Card, CardBody, Pagination } from "@heroui/react";
import { useNavigate } from "react-router-dom";

export default function BlogList() {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/blog/detail/${id}`);
  }

  return (
    <div className="flex px-10 py-5 flex-col items-center">
      <main className="flex-1 w-full mb-10">
        <div className="grid gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <Card
              key={item}
              isPressable
              className="bg-content1 hover:bg-content2 cursor-pointer"
              onPress={() => handleClick(item)}
            >
              <CardBody className="px-4 py-6">
                <h2 className="text-xl font-semibold">博客标题 {item}</h2>
                <p className="text-default-500 mt-2">
                  这是博客 {item} 的简介内容...
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </main>
      <Pagination initialPage={1} total={10} color="primary"/>
    </div>
  );
} 