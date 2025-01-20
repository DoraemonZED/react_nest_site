import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import { Card } from "@heroui/card";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  GithubIcon,
  MessageIcon
} from "@/components/icons";
import { motion, AnimatePresence } from 'framer-motion';
import HamburgerButton from './HamburgerButton';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div className="p-2.5">
        <Card className="backdrop-blur-sm bg-content1/80">
          <div className="p-4">
            <div className="flex justify-between items-center max-w-5xl px-6 mx-auto">
              <Link to="/" className="text-foreground font-bold text-xl">
                Logo
              </Link>
              
              {/* 使用独立的汉堡菜单按钮组件 */}
              <HamburgerButton isOpen={isOpen} onPress={toggleMenu} />

              {/* 导航链接 - 中等屏幕以上显示 */}
              <div className="hidden md:flex items-center gap-4">
                <Link to="/" className="text-foreground hover:text-primary">首页</Link>
                <Link to="/blog" className="text-foreground hover:text-primary">博客</Link>
                <Link to="/game" className="text-foreground hover:text-primary">游戏</Link>
                <Link to="/resume" className="text-foreground hover:text-primary">简历</Link>
                
                {/* 主题切换开关 */}
                <ThemeSwitch />

                {/* GitHub图标 */}
                <Button
                  isIconOnly
                  variant="light"
                  as="a"
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon className="text-default-500" />
                </Button>

                {/* 短信图标 */}
                <Button
                  isIconOnly
                  variant="light"
                >
                  <MessageIcon className="text-default-500" />
                </Button>

                {/* 头像 */}
                <Avatar
                  isBordered
                  src="/sss"
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* 移动端下拉菜单 - 添加动画 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full px-2.5 md:hidden"
            style={{ top: "100%" }}
          >
            <Card className="backdrop-blur-sm bg-content1/90">
              <div className="p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex flex-col items-center gap-4"
                >
                  <Link to="/" className="text-foreground hover:text-primary" onClick={toggleMenu}>首页</Link>
                  <Link to="/blog" className="text-foreground hover:text-primary" onClick={toggleMenu}>博客</Link>
                  <Link to="/game" className="text-foreground hover:text-primary" onClick={toggleMenu}>游戏</Link>
                  <Link to="/resume" className="text-foreground hover:text-primary" onClick={toggleMenu}>简历</Link>
                  <div className="flex items-center gap-4">
                    <ThemeSwitch />
                    <Button
                      isIconOnly
                      variant="light"
                      as="a"
                      href="/23"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GithubIcon className="text-default-500" />
                    </Button>
                    <Button
                      isIconOnly
                      variant="light"
                    >
                      <MessageIcon className="text-default-500" />
                    </Button>
                    <Avatar
                      isBordered
                      src="/sss"
                      className="cursor-pointer"
                    />
                  </div>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar; 