-- AI Coder Quest - Seed Data

-- Chapters
INSERT INTO public.chapters (id, title, subtitle, description, order_index, rank_unlocked_id, estimated_total_minutes, completion_message) VALUES
('prologue', '序章 - 开机', '把AI编程需要的基础环境装好', '本章目标：把AI编程需要的基础环境装好。', 0, 'rank_0', 30, '环境就绪。从下一关开始，你说话，AI 写代码。'),
('chapter_1', '第一章 - 静态世界', '用 AI 做出一个纯 HTML 网站', 'HTML 是互联网的基础语言。但你不需要学它。', 1, 'rank_1', 45, '你在 20 分钟内做出了一个比大多数人更好看的网站。'),
('chapter_2', '第二章 - 工程化起步', '从HTML文件升级到前端工程', '第一章的网站能用，但它是手工作坊模式。', 2, 'rank_2', 60, '现在你手上的东西，已经比大多数前端实习生的面试作品更好看了。'),
('chapter_3', '第三章 - 让网站活起来', '给网站加上交互功能和视觉素材', '到目前为止你的网站像一本画册。这一章让它变成活的，还教你用 AI 生成专业素材。', 3, 'rank_3', 115, '一个初级前端工程师的工作内容也不过如此。'),
('chapter_4', '第四章 - 全栈之路', '后端、数据库、支付、AI 集成', '前三章都发生在前端。但真正的应用背后都有后端、支付和 AI。这一章做出能赚钱的产品。', 4, 'rank_4', 195, '你现在拥有一个完整的、能赚钱的互联网产品。'),
('chapter_5', '第五章 - 上线与发布', '部署到互联网让全世界访问', '到现在为止你的网站只在你的电脑上运行。', 5, 'rank_5', 60, '你做了一个全世界都能访问的完整互联网产品。');

-- Levels
INSERT INTO public.levels (id, chapter_id, title, page_title, order_index, is_delivery, verification_type, verification_config, estimated_minutes) VALUES
('0-1', 'prologue', '打开终端', '打开终端', 1, FALSE, 'screenshot', '{}', 5),
('0-2', 'prologue', '安装 Node.js', '安装 Node.js', 2, FALSE, 'regex', '{"pattern": "^v\\\\d+\\\\.\\\\d+\\\\.\\\\d+$"}', 10),
('0-3', 'prologue', '召唤 AI 搭档', '召唤你的 AI 搭档', 3, FALSE, 'regex', '{"pattern": "\\\\d+\\\\.\\\\d+\\\\.\\\\d+"}', 15),
('1-1', 'chapter_1', 'Hello World', 'Hello World', 1, FALSE, 'screenshot', '{}', 10),
('1-2', 'chapter_1', '个人名片', '做一张数字名片', 2, FALSE, 'screenshot', '{}', 15),
('1-3', 'chapter_1', '多页面个人网站', '做一个完整的个人网站', 3, TRUE, 'screenshot', '{}', 20),
('2-1', 'chapter_2', '第一个 npm 项目', '创建第一个 npm 项目', 1, FALSE, 'regex', '{"pattern": "react"}', 15),
('2-2', 'chapter_2', '迁移到组件化', '把网站迁移到组件化', 2, FALSE, 'screenshot', '{}', 20),
('2-3', 'chapter_2', '让它好看', '用 TailwindCSS 让网站好看', 3, FALSE, 'screenshot', '{}', 15),
('2-4', 'chapter_2', '完整作品集', '完成你的作品集网站', 4, TRUE, 'screenshot', '{}', 20),
('3-1', 'chapter_3', '暗色模式', '实现暗色/亮色模式切换', 1, FALSE, 'screenshot', '{}', 15),
('3-2', 'chapter_3', '实时搜索', '给作品页加实时搜索', 2, FALSE, 'screenshot', '{}', 15),
('3-3', 'chapter_3', '联系表单', '做一个能发邮件的联系表单', 3, FALSE, 'screenshot', '{}', 20),
('3-4', 'chapter_3', '一个像样的产品', '打磨成一个像样的产品', 4, TRUE, 'screenshot', '{}', 30),
('3-5', 'chapter_3', 'AI 生图素材', '用 AI 生成网站图片和素材', 5, FALSE, 'screenshot', '{}', 25),
('4-1', 'chapter_4', '后端 API 初体验', '创建你的第一个后端 API', 1, FALSE, 'url_check', '{"expected_status": 200}', 20),
('4-2', 'chapter_4', '数据库', '接入数据库', 2, FALSE, 'screenshot', '{}', 30),
('4-3', 'chapter_4', '用户系统', '实现用户注册登录', 3, FALSE, 'screenshot', '{}', 30),
('4-4', 'chapter_4', '全栈管理系统', '做一个完整的全栈管理系统', 4, FALSE, 'composite', '{"checks": [{"type": "screenshot"}, {"type": "url_check", "expected_status": 200}]}', 40),
('4-5', 'chapter_4', '接入支付', '给你的应用接入支付功能', 5, FALSE, 'screenshot', '{}', 35),
('4-6', 'chapter_4', 'AI 能力集成', '给你的应用接入 AI 超能力', 6, TRUE, 'composite', '{"checks": [{"type": "screenshot"}, {"type": "url_check", "expected_status": 200}]}', 40),
('5-1', 'chapter_5', '推送到 GitHub', '把代码推送到 GitHub', 1, FALSE, 'github_url', '{"must_have_files": ["package.json", "README.md"]}', 15),
('5-2', 'chapter_5', '部署到 Vercel', '一键部署到 Vercel', 2, FALSE, 'url_check', '{"expected_status": 200}', 15),
('5-3', 'chapter_5', '正式发布', '正式发布你的产品', 3, TRUE, 'composite', '{"checks": [{"type": "url_check", "expected_status": 200}, {"type": "github_url", "must_have_files": ["package.json"]}]}', 30);

-- Ranks
INSERT INTO public.ranks (id, name, subtitle, salary, badge_color, chapter_id, order_index) VALUES
('rank_0', 'IT文盲', '连终端都没打开过', '0', '#9CA3AF', NULL, 0),
('rank_1', '会装软件的普通人', '至少不用找人帮忙了', '3K/月', '#60A5FA', 'prologue', 1),
('rank_2', '能出活的实习生', '老板，我做了个网页', '5K/月', '#34D399', 'chapter_1', 2),
('rank_3', '不写代码的程序员', '我不写代码，AI替我写', '15K/月', '#A78BFA', 'chapter_2', 3),
('rank_4', '全干工程师', '前后端数据库都能搞', '30K/月', '#F59E0B', 'chapter_3', 4),
('rank_5', '独立开发者', '我的网站上线了，用户来了', '50K/月', '#EF4444', 'chapter_4', 5),
('rank_6', '技术合伙人', '能用AI构建完整商业产品', '无上限', '#FFFFFF', 'chapter_5', 6);

-- Achievements
INSERT INTO public.achievements (id, name, description, icon, condition_type, condition_config) VALUES
('first_blood', '初见', '完成第一个关卡', '🎯', 'level_count', '{"count": 1}'),
('speed_runner', '速通玩家', '在30分钟内完成一章', '⚡', 'chapter_time', '{"max_seconds": 1800}'),
('perfectionist', '完美主义者', '所有关卡一次通过', '💎', 'no_failures', '{}'),
('night_owl', '夜猫子', '在凌晨2-5点完成关卡', '🦉', 'time_range', '{"start_hour": 2, "end_hour": 5}'),
('full_stack', '全栈达人', '完成第四章所有关卡', '🏗️', 'chapter_complete', '{"chapter_id": "chapter_4"}'),
('graduate', '毕业生', '完成所有关卡', '🎓', 'all_complete', '{}');
