# AI Coder Quest 🎮

一个闯关式 AI 编程教学平台。零基础用户通过 21 个关卡，从"打开终端"到"部署上线"，全程用自然语言指挥 AI 完成编程任务。

## 特点

- **闯关制学习**：5 章 21 关，循序渐进
- **AI 驱动**：学员全程使用 Claude Code / Codex 等 AI 工具完成任务
- **多种验证方式**：截图、URL 检测、正则匹配、GitHub 仓库检查
- **进度追踪**：自动解锁下一关，排行榜激励
- **管理后台**：教师审核提交、管理用户

## 技术栈

- **框架**：Next.js 16 (App Router, Turbopack)
- **认证**：Better Auth (邮箱密码 + GitHub OAuth)
- **数据库**：Supabase PostgreSQL
- **样式**：Tailwind CSS 4 + Radix UI
- **内容**：MDX 文件 + gray-matter
- **部署**：Vercel

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 配置环境变量

```bash
cp .env.example .env.local
```

然后编辑 `.env.local`，填入你的 Supabase 和 GitHub OAuth 配置。

### 3. 初始化数据库

在 Supabase SQL Editor 中依次执行：

```bash
supabase/migrate-better-auth.sql   # Better Auth 表 + 业务表
supabase/seed.sql                   # 关卡种子数据
```

### 4. 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:3000

## 项目结构

```
ai-coder-quest/
├── app/
│   ├── (app)/          # 主应用页面（dashboard, levels, profile）
│   ├── (auth)/         # 认证页面（login, register）
│   └── api/            # API 路由（auth, progress, submissions）
├── components/         # 可复用组件
├── content/
│   └── levels/         # 关卡 MDX 内容文件
├── lib/
│   ├── auth.ts         # Better Auth 服务端配置
│   ├── auth-client.ts  # Better Auth 客户端
│   └── supabase/       # Supabase 客户端配置
├── supabase/           # 数据库迁移和种子文件
└── types/              # TypeScript 类型定义
```

## 部署到 Vercel

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量（参考 `.env.example`）
4. 注意将 `BETTER_AUTH_URL` 和 `NEXT_PUBLIC_APP_URL` 改为你的生产域名
5. 在 GitHub OAuth App 中添加生产环境的回调地址

## 环境变量说明

| 变量 | 说明 |
|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名 Key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role Key（服务端用） |
| `DATABASE_URL` | PostgreSQL 连接字符串（Pooler） |
| `BETTER_AUTH_SECRET` | Better Auth 加密密钥 |
| `BETTER_AUTH_URL` | 应用 URL（生产环境改为实际域名） |
| `AUTH_GITHUB_ID` | GitHub OAuth App Client ID |
| `AUTH_GITHUB_SECRET` | GitHub OAuth App Client Secret |

## License

MIT
