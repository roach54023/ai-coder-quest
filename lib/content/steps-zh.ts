export interface StepItem {
  id: string;
  label: string;
  feedback: string;
}

/**
 * 每关的操作步骤清单。
 * 用户在关卡页逐步点击"做好了"来标记完成，全部完成即通关。
 */
const LEVEL_STEPS: Record<string, StepItem[]> = {
  // ── 序章 ──────────────────────────────────────────────────────────────────
  "0-1": [
    { id: "download", label: "下载并安装 AI 编程工具（Cursor 或 Windsurf）", feedback: "📥 工具安装完成！" },
    { id: "login", label: "打开工具并登录账号", feedback: "🔑 登录成功！" },
    { id: "verify", label: "发送第一条消息，AI 成功回复", feedback: "🎉 AI 助手已就绪！" },
  ],
  "0-2": [
    { id: "folder", label: "新建项目文件夹并在工具中打开", feedback: "📁 工作区准备好了！" },
    { id: "generate", label: "让 AI 生成 index.html 并在浏览器打开", feedback: "📝 第一份代码诞生！" },
    { id: "deploy", label: "把 index.html 部署到 Cloudflare Pages", feedback: "🌍 第一个网站上线了！" },
    { id: "visit", label: "通过链接访问到线上网站", feedback: "🎊 Vibe Coding 循环跑通！" },
  ],

  // ── 第一章 ────────────────────────────────────────────────────────────────
  "1-1": [
    { id: "init", label: "用 AI 创建 Next.js 项目", feedback: "⚡ 项目初始化完成！" },
    { id: "run", label: "npm run dev 跑起来，看到默认页面", feedback: "🚀 本地服务启动！" },
    { id: "understand", label: "了解 app/ 目录结构", feedback: "📂 目录结构清晰了！" },
  ],
  "1-2": [
    { id: "homepage", label: "首页有自我介绍和技能展示", feedback: "🏠 首页完成！" },
    { id: "works", label: "作品页有至少 3 个作品卡片", feedback: "🎨 作品页完成！" },
    { id: "about", label: "关于页有个人故事和联系方式", feedback: "👤 关于页完成！" },
    { id: "nav", label: "导航栏可以在三个页面间切换", feedback: "🔗 导航通了！" },
  ],
  "1-3": [
    { id: "tailwind", label: "接入 Tailwind CSS，基础样式生效", feedback: "🎨 样式系统就位！" },
    { id: "design", label: "选定配色方案和字体", feedback: "🎭 视觉风格确定！" },
    { id: "polish", label: "三个页面都有统一的视觉风格", feedback: "✨ 颜值拉满！" },
  ],
  "1-4": [
    { id: "github", label: "创建 GitHub 仓库并推送代码", feedback: "🐙 代码上云了！" },
    { id: "vercel", label: "Vercel 导入仓库，部署成功", feedback: "▲ 部署完成！" },
    { id: "visit", label: "通过 Vercel 链接访问到线上网站", feedback: "🌍 全世界都能看到了！" },
    { id: "share", label: "把链接发给朋友或发到社交平台", feedback: "🎉 第一章交付完成！" },
  ],
  "1-5": [
    { id: "search", label: "列表页加入搜索框并能实时过滤卡片", feedback: "🔍 搜索功能生效！" },
    { id: "map", label: "详情页嵌入地图并显示完整地址", feedback: "🗺️ 地图嵌入完成！" },
    { id: "share", label: "详情页加入复制链接和社交分享按钮", feedback: "📣 分享功能完成！" },
    { id: "mobile", label: "手机端测试搜索、地图和分享都正常", feedback: "📱 产品体验更完整了！" },
  ],

  // ── 第二章 ────────────────────────────────────────────────────────────────
  "2-1": [
    { id: "animation", label: "首页有入场动画效果", feedback: "✨ 动画加分！" },
    { id: "hover", label: "作品卡片有悬停交互效果", feedback: "🖱️ 悬停效果丝滑！" },
    { id: "scroll", label: "页面滚动有视差或渐入效果", feedback: "📜 滚动体验升级！" },
  ],
  "2-2": [
    { id: "detail", label: "作品详情页可以正常访问", feedback: "📄 详情页有了！" },
    { id: "content", label: "详情页有完整的项目介绍", feedback: "📝 内容丰富！" },
    { id: "back", label: "有返回作品列表的导航", feedback: "🔙 导航顺畅！" },
  ],
  "2-3": [
    { id: "seo_meta", label: "每个页面有独立的 title 和 description", feedback: "🔎 SEO 基础完成！" },
    { id: "og", label: "Open Graph 标签配置完成", feedback: "🃏 分享卡片漂亮！" },
    { id: "verify", label: "用 og:debugger 验证分享卡片", feedback: "✅ 社交分享就绪！" },
  ],
  "2-4": [
    { id: "lighthouse", label: "Lighthouse 性能分数 ≥ 80", feedback: "⚡ 性能达标！" },
    { id: "image", label: "图片使用 Next.js Image 组件优化", feedback: "🖼️ 图片加载更快！" },
    { id: "mobile", label: "手机端访问体验流畅", feedback: "📱 移动端完美！" },
  ],
  "2-5": [
    { id: "push", label: "代码推送到 GitHub", feedback: "🐙 代码上云了！" },
    { id: "deploy", label: "Vercel 自动部署成功", feedback: "▲ 自动部署生效！" },
    { id: "verify", label: "线上验证所有新功能正常", feedback: "🎉 第二章交付完成！" },
  ],

  // ── 第三章 ────────────────────────────────────────────────────────────────
  "3-1": [
    { id: "button", label: "加入主题切换按钮", feedback: "🌓 按钮就位！" },
    { id: "dark", label: "暗色模式样式正常显示", feedback: "🌙 暗色模式生效！" },
    { id: "storage", label: "刷新页面后主题偏好保持不变", feedback: "💾 偏好记住了！" },
  ],
  "3-2": [
    { id: "input", label: "搜索框有清除按钮，样式完整", feedback: "🔍 搜索框就位！" },
    { id: "filter", label: "输入关键词，卡片实时过滤", feedback: "⚡ 实时搜索生效！" },
    { id: "tags", label: "标签过滤和搜索框可以组合使用", feedback: "🏷️ 标签过滤完成！" },
  ],
  "3-3": [
    { id: "form", label: "联系页面可以正常访问，导航有链接", feedback: "📝 联系页完成！" },
    { id: "validate", label: "表单验证正常工作（填错有提示）", feedback: "✅ 验证生效！" },
    { id: "feedback", label: "提交后有明确的成功或失败反馈", feedback: "📬 提交反馈完成！" },
  ],
  "3-4": [
    { id: "hamburger", label: "手机上有汉堡菜单，可以正常开关", feedback: "☰ 汉堡菜单就位！" },
    { id: "cards", label: "作品卡片在手机上单列显示", feedback: "📱 移动端布局完成！" },
    { id: "noscroll", label: "整体页面在手机上没有横向滚动条", feedback: "✨ 响应式适配完成！" },
  ],
  "3-5": [
    { id: "check", label: "本地最终检查通过（暗色/搜索/表单/手机）", feedback: "✅ 本地验证通过！" },
    { id: "push", label: "代码推送到 GitHub", feedback: "🐙 代码上云了！" },
    { id: "verify", label: "Vercel 部署成功，手机访问导航菜单正常", feedback: "🎉 第三章交付完成！" },
  ],

  // ── 第四章 ────────────────────────────────────────────────────────────────
  "4-1": [
    { id: "hello", label: "/api/hello 接口可以访问，返回 JSON", feedback: "🔌 第一个 API 接口！" },
    { id: "contact_api", label: "联系表单调用真实的 API 路由", feedback: "📡 前后端通了！" },
    { id: "error", label: "接口有错误处理，不会因缺少配置崩溃", feedback: "🛡️ 错误处理完成！" },
  ],
  "4-2": [
    { id: "supabase", label: "Supabase 数据库已创建，works 表存在", feedback: "☁️ 云数据库就位！" },
    { id: "connect", label: "作品页从数据库加载数据", feedback: "🔗 数据库连接成功！" },
    { id: "dynamic", label: "在 Supabase 添加数据后，刷新页面能看到", feedback: "🎉 数据动起来了！" },
  ],
  "4-3": [
    { id: "list", label: "/admin/works 页面显示作品列表", feedback: "📋 后台列表完成！" },
    { id: "add", label: "可以通过表单添加新作品，列表更新", feedback: "➕ 添加功能完成！" },
    { id: "delete", label: "可以删除作品，列表更新", feedback: "🗑️ 删除功能完成！" },
  ],
  "4-4": [
    { id: "click", label: "点击作品后，work_views 表有新记录", feedback: "👁️ 点击记录成功！" },
    { id: "count", label: "作品卡片上显示查看次数", feedback: "📊 查看次数显示！" },
    { id: "dashboard", label: "后台管理页面有数据概览", feedback: "📈 数据看板完成！" },
  ],
  "4-5": [
    { id: "env", label: "Vercel 环境变量已配置", feedback: "⚙️ 环境变量就位！" },
    { id: "works", label: "线上作品页能正常加载数据库里的作品", feedback: "🌍 线上数据库通了！" },
    { id: "views", label: "线上点击作品后查看次数增加", feedback: "🎉 第四章交付完成！" },
  ],
  "4-6": [
    { id: "provider", label: "选择 AI 服务商并配置 API Key", feedback: "🔑 AI 接口准备好了！" },
    { id: "api", label: "创建 AI 对话或生成接口，能返回结果", feedback: "🤖 AI 能力接通！" },
    { id: "ui", label: "前端加入输入框、加载状态和错误提示", feedback: "💬 AI 交互完成！" },
    { id: "guard", label: "加入基础限流或失败保护，避免接口被滥用", feedback: "🛡️ AI 功能更稳了！" },
  ],

  // ── 第五章 ────────────────────────────────────────────────────────────────
  "5-1": [
    { id: "auth", label: "Supabase 认证已开启，账号已创建", feedback: "🔐 认证系统就位！" },
    { id: "login", label: "用邮箱和密码可以成功登录", feedback: "✅ 登录成功！" },
    { id: "protect", label: "未登录时访问 /admin 会跳转到登录页", feedback: "🛡️ 路由保护生效！" },
  ],
  "5-2": [
    { id: "button", label: "右下角有 AI 对话按钮，点击可以打开", feedback: "💬 对话按钮就位！" },
    { id: "stream", label: "输入问题后，AI 有流式回复（打字机效果）", feedback: "🤖 AI 会说话了！" },
    { id: "works_qa", label: "AI 能正确介绍你的作品", feedback: "🧠 AI 助手完成！" },
  ],
  "5-3": [
    { id: "stripe", label: "点击付费按钮，跳转到 Stripe 支付页面", feedback: "💳 支付页面跳转！" },
    { id: "test_pay", label: "用测试卡号完成支付，跳转到成功页面", feedback: "✅ 支付链路通了！" },
    { id: "success", label: "成功页面有下载按钮", feedback: "🎉 支付功能完成！" },
  ],
  "5-4": [
    { id: "env", label: "Vercel 所有生产环境变量已配置", feedback: "⚙️ 生产环境就绪！" },
    { id: "push", label: "代码推送，Vercel 部署成功", feedback: "▲ 最终部署完成！" },
    { id: "verify", label: "线上 AI 对话和支付跳转均正常", feedback: "🏆 恭喜！全部课程完成！" },
  ],
};

export function getStepsByLevelId(levelId: string): StepItem[] | null {
  return LEVEL_STEPS[levelId] || null;
}
