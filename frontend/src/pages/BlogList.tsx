'use client';

import { Card, CardBody, Pagination } from "@heroui/react";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {blogApi} from "@/services/blogApi.ts";
import {BlogListItems} from "@/types";

export default function BlogList() {
  const navigate = useNavigate();
  const { menuId } = useParams<{ menuId: string }>();
  const [blogList, setBlogList] = useState<BlogListItems[]>([]);
  const pageSize = 10;
  const [pageNum, setPageNum] = useState(1);
  const [total, setTotal] = useState(10);

  if (!menuId) {
    return null;
  }

  useEffect(() => {
    blogApi.getBlogList({pageSize, pageNum}, menuId)
      .then((data) => {
        setBlogList(data.items)
        setPageNum(data.pageNum)
        setTotal(Math.ceil(data.total / 10))
      })
    setPageNum(1)
  }, [navigate])

  const handleClick = (id: number) => {
    navigate(`/blog/${menuId}/${id}`);
  }

  return (
    <div className="flex px-10 py-5 flex-col items-center">
      <span className="iconfont icon"></span>
      <main className="flex-1 w-full mb-10">
        <div className="grid gap-4">
          {blogList.map((item) => (
            <Card
              key={item.id}
              isPressable
              className="bg-content1 hover:bg-content2 cursor-pointer"
              onPress={() => handleClick(item.id)}
            >
              <CardBody className="px-4 py-6">
                <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className="text-default-500 mt-2">
                  这是博客 {item.title} 的简介内容...
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </main>
      <Pagination page={pageNum} total={total} color="primary"/>
    </div>
  );
} 