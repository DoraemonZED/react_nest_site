### 1.初始化
`npm prisma init`
### 2.生成 Prisma 客户端
`npx prisma generate`
### 3.创建迁移文件
`npx prisma migrate dev --name [描述性迁移名称]`
### 4.应用迁移到数据库(上一步的 prisma migrate dev 命令会自动应用迁移,如果是生产环境使用deploy)
`npx prisma migrate deploy`

### 1.仅更新客户端而不迁移数据库
`npx prisma generate`
### 2.重置数据库并重新迁移（开发环境）
`npx prisma migrate reset`
### 3.检查数据库状态
`npx prisma migrate status`
### 4.创建空迁移文件（手动编写 SQL）
`npx prisma migrate dev --create-only --name [迁移名称]`
### 5.重置
`npx prisma migrate reset `