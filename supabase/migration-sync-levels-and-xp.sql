-- ============================================================
-- Migration: 同步关卡数据 + 添加 XP 系统字段
-- ============================================================

-- ── 1. XP 系统字段 ──────────────────────────────────────────
ALTER TABLE public.user_profiles
  ADD COLUMN IF NOT EXISTS total_xp INTEGER NOT NULL DEFAULT 0;

ALTER TABLE public.user_progress
  ADD COLUMN IF NOT EXISTS xp_earned INTEGER NOT NULL DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_user_profiles_total_xp
  ON public.user_profiles(total_xp DESC);

-- ── 2. 删除数据库里已废弃的旧关卡 ───────────────────────────
-- 旧关卡 id（来自旧 seed）：4-6, 5-1(旧), 5-2(旧), 5-3(旧)
DELETE FROM public.user_progress WHERE level_id IN ('4-6','5-1','5-2','5-3');
DELETE FROM public.submissions   WHERE level_id IN ('4-6','5-1','5-2','5-3');
DELETE FROM public.levels        WHERE id        IN ('4-6','5-1','5-2','5-3');

-- ── 3. 全量 upsert 当前 mdx 对应的关卡 ──────────────────────
INSERT INTO public.levels (id, chapter_id, title, page_title, order_index, is_delivery, verification_type, verification_config, estimated_minutes)
VALUES
  -- 序章
  ('0-1', 'prologue',  '安装 AI 编程助手',       '下载安装你的 AI 编程助手',                    1, FALSE, 'checklist', '{}', 10),
  ('0-2', 'prologue',  '第一次对话：Hello World', '让 AI 帮你写出第一个网页',                    2, FALSE, 'checklist', '{}', 10),
  -- 第一章
  ('1-1', 'chapter_1', '学会下指令',             'Prompt 的艺术：如何让 AI 准确理解你的需求',    1, FALSE, 'checklist', '{}', 15),
  ('1-2', 'chapter_1', '个人名片',               '做一张数字名片',                              2, FALSE, 'checklist', '{}', 15),
  ('1-3', 'chapter_1', '多页面个人网站',          '做一个完整的个人网站',                        3, FALSE, 'checklist', '{}', 20),
  ('1-4', 'chapter_1', '部署上线',               '把网站发布到互联网，获得真实网址',              4, TRUE,  'url_submit','{}', 15),
  ('1-5', 'chapter_1', '设计进阶',               '让你的页面更好看：设计思维与资源',              5, FALSE, 'checklist', '{}', 20),
  -- 第二章
  ('2-1', 'chapter_2', '升级你的工具',           '从 HTML 文件升级到现代开发工具',               1, FALSE, 'checklist', '{}', 15),
  ('2-2', 'chapter_2', '搭建骨架',               '用组件搭建网站骨架',                          2, FALSE, 'checklist', '{}', 20),
  ('2-3', 'chapter_2', '装修美化',               '用 TailwindCSS 给网站做精装修',               3, FALSE, 'checklist', '{}', 15),
  ('2-4', 'chapter_2', '完整作品集',             '完成你的作品集网站',                          4, FALSE, 'checklist', '{}', 20),
  ('2-5', 'chapter_2', 'GitHub + Vercel 部署',   '连接 GitHub，推代码自动部署到 Vercel',         5, TRUE,  'url_submit','{}', 20),
  -- 第三章
  ('3-1', 'chapter_3', '暗色模式',               '实现暗色/亮色模式切换',                       1, FALSE, 'checklist', '{}', 15),
  ('3-2', 'chapter_3', '实时搜索',               '给作品页加实时搜索',                          2, FALSE, 'checklist', '{}', 15),
  ('3-3', 'chapter_3', '联系表单',               '做一个联系表单',                              3, FALSE, 'checklist', '{}', 20),
  ('3-4', 'chapter_3', 'AI 生图素材',            '用 AI 生成网站图片和素材',                    4, FALSE, 'checklist', '{}', 25),
  ('3-5', 'chapter_3', '部署第三版',             '交付第三版：把完整的交互体验推上线',            5, TRUE,  'url_submit','{}', 10),
  -- 第四章
  ('4-1', 'chapter_4', 'API 路由入门',           '让网站有后端：用 Next.js API 路由处理真实请求', 1, FALSE, 'checklist', '{}', 20),
  ('4-2', 'chapter_4', '数据库入门',             '存数据：给网站接上真正的数据库',               2, FALSE, 'checklist', '{}', 30),
  ('4-3', 'chapter_4', '后台管理',               '自己管理内容：做一个简单的后台管理页面',        3, FALSE, 'checklist', '{}', 30),
  ('4-4', 'chapter_4', '访问统计',               '了解你的访客：给网站加上访问统计',              4, FALSE, 'checklist', '{}', 40),
  ('4-5', 'chapter_4', '部署第四版',             '交付第四版：带后端能力的完整作品集',            5, TRUE,  'url_submit','{}', 15),
  -- 第五章
  ('5-1', 'chapter_5', '用户登录',               '让用户登录：给网站加上身份认证',               1, FALSE, 'checklist', '{}', 35),
  ('5-2', 'chapter_5', '接入 AI',                '让网站变聪明：接入 AI 对话能力',               2, FALSE, 'checklist', '{}', 40),
  ('5-3', 'chapter_5', '接入支付',               '让网站能赚钱：接入 Stripe 支付',               3, FALSE, 'checklist', '{}', 30),
  ('5-4', 'chapter_5', '最终部署',               '大功告成：把你的完整产品推上线',               4, TRUE,  'url_submit','{}', 20)
ON CONFLICT (id) DO UPDATE SET
  chapter_id          = EXCLUDED.chapter_id,
  title               = EXCLUDED.title,
  page_title          = EXCLUDED.page_title,
  order_index         = EXCLUDED.order_index,
  is_delivery         = EXCLUDED.is_delivery,
  verification_type   = EXCLUDED.verification_type,
  verification_config = EXCLUDED.verification_config,
  estimated_minutes   = EXCLUDED.estimated_minutes;

-- ── 4. 验证 ─────────────────────────────────────────────────
SELECT id, verification_type, is_delivery FROM public.levels ORDER BY id;
