import { Card, CardBody, Pagination } from "@heroui/react";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {BlogListItems, blogService} from "@/services/blogService.ts";

export default function BlogList() {
  const navigate = useNavigate()
  const { menuId } = useParams<{ menuId: string }>();
  const [blogList, setBlogList] = useState<BlogListItems[]>([]);
  const pageSize = 6;
  const [pageNum, setPageNum] = useState(1);
  const [pageTotal, setPageTotal] = useState(0);

  if (!menuId) {
    return null;
  }

  const isInitMount = useRef(true);
  useEffect(() => {
    if (isInitMount.current) {
      isInitMount.current = false;
      return
    }
    getData()
  }, [pageNum]);
  useEffect(() => {
    pageNum !== 1 ? setPageNum(1) : getData()
  }, [menuId]);

  const getData = async () => {
    let data = await blogService.getBlogList({pageSize, pageNum}, menuId)
    data.data && setBlogList(data.data)
    setPageTotal(data.totalPages)
  }

  const handleClick = (id: number) => {
    navigate(`/blog/${menuId}/${id}`)
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
      {
        pageTotal !== 0 && <Pagination
          onChange={(page) => setPageNum(page)}
          isCompact
          showControls
          page={pageNum}
          total={pageTotal}
          color="primary"/>
      }
    </div>
  );
} 