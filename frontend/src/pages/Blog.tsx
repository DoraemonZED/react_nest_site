import { Card, Button, Drawer, DrawerContent, DrawerBody, DrawerFooter } from "@heroui/react";
import CategoryList from "@/components/CategoryList";
import { blogApi } from '@/services/blogApi';
import { CategoryResponse } from '@/types';
import { useEffect, useState, useRef } from "react";
import Footer from "@/components/Footer";

interface BlogLayoutProps {
  children: React.ReactNode
}

export default function Blog({ children }: BlogLayoutProps) {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
    <div className="relative mx-auto">
      {/* 中屏显示的菜单按钮 */}
      <Button
        className="fixed left-0 top-28 md:hidden z-40"
        isIconOnly
        variant="light"
        onPress={() => setIsDrawerOpen(true)}
      >
        <Card className="p-2">
          <span className="iconfont icon-fenlei"></span>
        </Card>
      </Button>

      {/* 抽屉菜单 */}
      <Drawer
        isOpen={isDrawerOpen}
        onOpenChange={(open) => setIsDrawerOpen(open)}
        placement="left"
        size="sm"
        className="z-[100]"
        backdrop="blur"
        portalContainer={document.body}
        motionProps={{
          variants: {
            enter: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.3 }
            },
            exit: {
              x: -100,
              opacity: 0,
              transition: { duration: 0.3 }
            },
          },
        }}
      >
        <DrawerContent>
          {() => (
            <>
              <DrawerBody className="styled-scrollbar" data-lenis-prevent>
                <CategoryList
                  categories={categories}
                  loading={isLoading}
                  error={error}
                />
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>

      <div className="md:flex md:flex-row">
        {/* 大屏显示的侧边栏 */}
        <div className="hidden md:block sticky top-20 md:self-start">
          <Card className="h-[calc(100vh-95px)] w-[280px] overflow-y-auto styled-scrollbar p-2 box-border" data-lenis-prevent>
            <CategoryList
              categories={categories}
              loading={isLoading}
              error={error}
            />
          </Card>
        </div>
        {/* 右侧文章内容 */}
        <div className="flex-1 md:ml-2">
          <Card className="h-[1000px]">{children}</Card>
          <Footer />
        </div>
      </div>
    </div>
  )
}