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
  "0-1": [
    { id: "download", label: "下载并安装你选的 AI 编程工具", feedback: "📥 安装完成！" },
    { id: "login", label: "打开工具并登录账号", feedback: "🔑 登录成功！" },
    { id: "verify", label: "发送第一条消息，AI 成功回复", feedback: "🎉 AI 助手已就绪！" },
  ],
  "0-2": [
    { id: "folder", label: "新建项目文件夹并在工具中打开", feedback: "📁 工作区准备好了！" },
    { id: "generate", label: "让 AI 帮你生成 index.html", feedback: "📝 第一份代码诞生！" },
    { id: "preview", label: "浏览器打开 index.html 看到效果", feedback: "🎊 恭喜！Vibe Coding 循环跑通了！" },
  ],
  "1-1": [
    { id: "learn", label: "阅读 Prompt 三大原则", feedback: "📖 核心方法 get！" },
    { id: "practice", label: "用赛博朋克 Prompt 改造 Hello World", feedback: "🎨 页面焕然一新！" },
    { id: "own", label: "自己写一个 Prompt 练练手", feedback: "🎯 Prompt 技能解锁！" },
  ],
  "1-2": [
    { id: "generate", label: "AI 生成个人名片页面", feedback: "🪪 名片诞生！" },
    { id: "tweak", label: "和 AI 调整设计细节", feedback: "✨ 越来越好看了！" },
    { id: "done", label: "名片效果满意，准备进入下一关", feedback: "👏 名片完成！" },
  ],
  "1-3": [
    { id: "structure", label: "生成 3 页结构", feedback: "📄 三个页面有了！" },
    { id: "nav", label: "导航能正常切换", feedback: "🔗 导航通了！" },
    { id: "fix", label: "修复页面问题，三页都正常", feedback: "🔧 修复完毕！" },
  ],
  "1-4": [
    { id: "platform", label: "选择托管平台并上传网站", feedback: "🚀 上传成功！" },
    { id: "visit", label: "通过链接访问到线上网站", feedback: "🌍 全世界都能看到了！" },
    { id: "share", label: "把链接发给朋友或发到社交平台", feedback: "🎉 第一次发布完成！" },
  ],
  "1-5": [
    { id: "inspiration", label: "浏览灵感网站，找到喜欢的设计风格", feedback: "👀 审美在线！" },
    { id: "redesign", label: "用参照物 Prompt 让 AI 改造页面", feedback: "🎨 焕然一新！" },
    { id: "polish", label: "应用 5 个设计技巧优化页面", feedback: "✨ 设计感拉满！" },
  ],
  "2-1": [
    { id: "create", label: "AI 创建 Vite + React 项目", feedback: "⚡ 现代工程初始化！" },
    { id: "install", label: "npm install 安装依赖", feedback: "📦 依赖安装好了！" },
    { id: "run", label: "npm run dev 跑起来看到页面", feedback: "🚀 本地服务启动！" },
  ],
  "2-2": [
    { id: "split", label: "让 AI 拆分组件 + 搭建路由", feedback: "🧩 骨架搭好了！" },
    { id: "spa", label: "页面切换正常（不刷新）", feedback: "🔄 无缝切换！" },
    { id: "structure", label: "确认骨架结构合理", feedback: "👍 骨架达成！" },
  ],
  "2-3": [
    { id: "tailwind", label: "让 AI 接入 Tailwind 并美化", feedback: "🎨 样式升级！" },
    { id: "responsive", label: "响应式检查通过", feedback: "📱 大小屏都稳！" },
    { id: "tweak", label: "微调满意为止", feedback: "💅 颜值拉满！" },
  ],
  "2-4": [
    { id: "animation", label: "入场动画完成", feedback: "✨ 动画效果加分！" },
    { id: "scroll", label: "滚动动画完成", feedback: "📜 滚动丝滑！" },
    { id: "polish", label: "细节打磨完成", feedback: "💎 精致！" },
    { id: "selfcheck", label: "全站自查通过", feedback: "🎯 作品集交付！" },
  ],
  "2-5": [
    { id: "push", label: "代码推送到 GitHub", feedback: "🐙 代码上云了！" },
    { id: "deploy", label: "Vercel 部署成功", feedback: "▲ 部署完成！" },
    { id: "verify", label: "手机访问确认正常", feedback: "📱 全平台可访问！" },
  ],
  "3-1": [
    { id: "button", label: "加入主题切换按钮", feedback: "🌓 按钮就位！" },
    { id: "storage", label: "localStorage 记住偏好", feedback: "💾 记住了！" },
    { id: "verify", label: "亮色暗色都正常显示", feedback: "🌙 暗色模式搞定！" },
  ],
  "3-2": [
    { id: "input", label: "加搜索框", feedback: "🔍 输入框有了！" },
    { id: "filter", label: "实时过滤正常工作", feedback: "⚡ 搜索灵了！" },
    { id: "verify", label: "搜索效果符合预期", feedback: "🎉 实时搜索完成！" },
  ],
  "3-3": [
    { id: "form", label: "加表单字段 + 验证", feedback: "📝 表单字段就位！" },
    { id: "test", label: "提交功能正常（本地或 Formspree）", feedback: "📬 表单能用了！" },
    { id: "verify", label: "联系表单完整可用", feedback: "✅ 联系表单完成！" },
  ],
  "3-4": [
    { id: "tool", label: "选一个 AI 生图工具", feedback: "🖼️ 工具选好了！" },
    { id: "generate", label: "生成 Hero 背景 / Mockup / 头像", feedback: "🎨 素材到手！" },
    { id: "integrate", label: "把素材集成到项目中", feedback: "📸 页面质感提升！" },
  ],
  "3-5": [
    { id: "polish", label: "一次性让 AI 全站打磨", feedback: "💎 产品级品质！" },
    { id: "check", label: "逐项检查清单确认", feedback: "✅ 全部达标！" },
    { id: "final", label: "全站效果满意", feedback: "🎯 产品级交付完成！" },
  ],
  "4-1": [
    { id: "api", label: "创建后端 API 接口", feedback: "🔌 接口就绪！" },
    { id: "fetch", label: "前端 fetch 调通数据", feedback: "📡 前后端通了！" },
    { id: "skeleton", label: "加 loading 骨架屏", feedback: "💀 体验加分！" },
    { id: "verify", label: "JSON 数据正确渲染到前端", feedback: "🧑‍💻 后端 API 入门！" },
  ],
  "4-2": [
    { id: "register", label: "注册 Supabase", feedback: "☁️ 云数据库就位！" },
    { id: "table", label: "创建数据表", feedback: "📊 表结构定好了！" },
    { id: "data", label: "写入测试数据", feedback: "💾 数据入库！" },
    { id: "display", label: "前端展示数据库数据", feedback: "🎉 数据活了！" },
  ],
  "4-3": [
    { id: "login", label: "做登录页面", feedback: "🔐 登录页出来了！" },
    { id: "nav", label: "导航栏登录态切换", feedback: "👤 状态联动！" },
    { id: "admin", label: "权限控制 /admin", feedback: "🛡️ 权限生效！" },
  ],
  "4-4": [
    { id: "list", label: "管理后台列表页", feedback: "📋 列表渲染！" },
    { id: "crud", label: "添加/编辑功能", feedback: "✏️ 增删改查！" },
    { id: "upload", label: "图片上传功能", feedback: "🖼️ 上传成功！" },
    { id: "flow", label: "CRUD 完整流程走通", feedback: "🎯 全栈管理系统完成！" },
  ],
  "4-5": [
    { id: "register", label: "注册支付平台 + 创建产品", feedback: "🏪 店铺开张！" },
    { id: "integrate", label: "让 AI 接入支付后端", feedback: "💳 支付接口对接！" },
    { id: "test", label: "测试模式走完支付流程", feedback: "✅ 支付链路通了！" },
    { id: "paywall", label: "添加付费墙", feedback: "🔒 商业模式成型！" },
  ],
  "4-6": [
    { id: "apikey", label: "获取 AI API Key", feedback: "🔑 钥匙到手！" },
    { id: "chat", label: "AI 聊天功能跑通", feedback: "🤖 AI 会说话了！" },
    { id: "smart", label: "添加智能功能（可选）", feedback: "🧠 更智能了！" },
    { id: "security", label: "安全防护 + 限流", feedback: "🛡️ 安全加固！" },
    { id: "polish", label: "优化体验", feedback: "✨ 丝滑体验！" },
  ],
  "5-1": [
    { id: "init", label: "git init + .gitignore", feedback: "🌱 仓库初始化！" },
    { id: "repo", label: "创建 GitHub 仓库", feedback: "🐙 远程仓库就位！" },
    { id: "push", label: "推送代码到 GitHub", feedback: "🚀 代码上云了！" },
  ],
  "5-2": [
    { id: "vercel", label: "注册部署平台并导入仓库", feedback: "▲ 平台连接！" },
    { id: "env", label: "配置环境变量并部署", feedback: "⚙️ 部署中…" },
    { id: "live", label: "确认线上可访问", feedback: "🌍 全世界都能看到了！" },
  ],
  "5-3": [
    { id: "seo", label: "SEO 优化完成", feedback: "🔎 搜索引擎优化！" },
    { id: "share", label: "社交分享卡片生效", feedback: "🃏 分享卡片漂亮！" },
    { id: "mobile", label: "手机适配确认", feedback: "📱 移动端完美！" },
    { id: "publish", label: "分享到社交平台", feedback: "🎊 正式发布！恭喜通关！" },
  ],
};

export function getStepsByLevelId(levelId: string): StepItem[] | null {
  return LEVEL_STEPS[levelId] || null;
}
