# React Nestjs App

这是一个使用 monorepo 架构的全栈项目，包含 React 前端和 NestJS 后端。

## 环境要求

- Node.js 16+
- Docker & Docker Compose
- npm 7+ (支持 workspaces)

## 安装步骤

1. 克隆项目
```bash
git clone https://xxx/xxx.git
```
2. 安装依赖
```bash
npm install
```
3. 启动服务
```bash
npm run start:frontend  # 启动前端开发服务器 (Vite)
npm run start:backend
```
4. 启动 Docker 服务
```bash
npm run docker:up
```

## 项目结构

- `packages/frontend`: React 前端项目
- `packages/backend`: NestJS 后端项目
- `docker`: Docker 配置文件

## 服务访问地址

- 前端应用: http://localhost:3000
- 后端 API: http://localhost:3001
- MySQL: localhost:3306
  - 用户名: root
  - 密码: root
  - 数据库: app_db
- Redis: localhost:6379
- MinIO: 
  - API: http://localhost:9000
  - Console: http://localhost:9001
  - 用户名: minioadmin
  - 密码: minioadmin
- Elasticsearch: http://localhost:9200

