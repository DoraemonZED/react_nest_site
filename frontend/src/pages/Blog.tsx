import { Card, Button, Drawer, DrawerContent, DrawerBody } from "@heroui/react";
import CategoryList from "@/components/CategoryList";
import {blogService, CategoryResponse} from '@/services/blogService.ts';
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { Outlet } from 'react-router-dom';


export default function Blog() {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    blogService.getBlogMenu()
      .then((data) => {
        setCategories(data || []);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container relative mx-auto">
      {/* 中屏显示的菜单按钮 */}
      <Button
        className="fixed left-0 top-28 lg:hidden z-40"
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
                  error={null}
                />
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>

      <div className="lg:flex lg:flex-row">
        {/* 大屏显示的侧边栏 */}
        <div className="hidden lg:block sticky top-[5.35rem] lg:self-start">
          <Card className="h-[calc(100vh-6rem)] w-[280px] overflow-y-auto styled-scrollbar p-2 box-border" data-lenis-prevent>
            <CategoryList
              categories={categories}
              loading={isLoading}
              error={null}
            />
          </Card>
        </div>
        {/* 右侧文章内容 */}
        <div className="flex-1 lg:ml-2">
          <Card className="min-h-[calc(100vh-12rem)]">
            <Outlet />
          </Card>
          <Footer />
        </div>
      </div>
    </div>
  )
}