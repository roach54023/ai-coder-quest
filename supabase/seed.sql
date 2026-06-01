-- AI Coder Quest - Seed Data

-- Chapters
INSERT INTO public.chapters (id, title, subtitle, description, order_index, rank_unlocked_id, estimated_total_minutes, completion_message) VALUES
('prologue', '序章 · 开机', '装好 AI 助手，跑通第一个作品', '本章目标：装好 AI 编程助手，并用它写出你人生中第一个网页。验证"你说话，AI 写代码"的完整循环。', 0, 'rank_0', 20, '完美！你已经验证了 Vibe Coding 的核心循环：你说话，AI 写代码，浏览器看结果。从下一章开始，我们要用这个能力做出真正的作品。'),
('chapter_1', '第一章 · 静态世界', '学会 Prompt，用 AI 做出一个纯 HTML 网站', '这一章你会学到 Vibe Coding 最核心的技能——如何写出好的 Prompt 让 AI 精确理解你的需求。然后用这个能力做出一个完整的多页个人网站。', 1, 'rank_1', 45, '你刚才做的事情，2015 年的程序员需要学一周 HTML/CSS 课程才能做到。而你在 20 分钟内做出了一个比他们大多数人更好看的网站。更重要的是，你学会了 Prompt 的核心方法——后面每一关都靠它。'),
('chapter_2', '第二章 · 工程化起步', '从HTML文件升级到前端工程', '第一章的网站能用，但它是手工作坊模式。这一章把它升级成工厂模式：一套系统管理所有页面，改一次全生效。', 2, 'rank_2', 60, '现在你手上的东西，已经比大多数前端实习生的面试作品更好看了。区别是他们学了3个月 HTML/CSS/JavaScript，而你从头到尾没有手动写过一行代码。'),
('chapter_3', '第三章 · 让网站活起来', '给网站加上交互功能和视觉素材', '到目前为止你的网站像一本画册——好看但翻完就没了。这一章让它变成一个活的东西：有交互、有真实素材、有产品级的完成度。', 3, 'rank_3', 105, '现在你手上的东西有暗色模式、有搜索、有表单、有动画、有 AI 生成的专业素材。一个初级前端工程师的工作内容也不过如此——而你不是前端工程师。你是不写代码的程序员。'),
('chapter_4', '第四章 · 全栈之路', '后端、数据库、支付、AI 集成', '前三章你做的所有事情都发生在前端。但真正的应用背后都有后端、有支付、有 AI。这一章你会触碰这些东西，做出一个能赚钱的产品。', 4, 'rank_4', 195, '回顾一下你现在拥有的东西：一个网站前端、一个后端API、一个数据库、一个用户登录系统、一个管理后台、支付功能、AI 能力。这就是一个完整的、能赚钱的互联网产品的全部组成部分。你已经是全干工程师了。'),
('chapter_5', '第五章 · 上线与发布', '部署到互联网让全世界访问', '到现在为止你的网站只在你的电脑上运行。这一章用10分钟让它上线，获得一个真实的 URL。', 5, 'rank_5', 60, '从打开终端到现在，你做了一个有前端、有后端、有数据库、有登录系统、有管理后台、有文件上传、有SEO、有响应式、能被全世界访问的互联网产品。');

-- Levels
INSERT INTO public.levels (id, chapter_id, title, page_title, order_index, is_delivery, verification_type, verification_config, estimated_minutes) VALUES
('0-1', 'prologue', '安装 AI 编程助手', '下载安装你的 AI 编程助手', 1, FALSE, 'checklist', '{}', 10),
('0-2', 'prologue', '第一次对话：Hello World', '让 AI 帮你写出第一个网页', 2, FALSE, 'checklist', '{}', 10),
('1-1', 'chapter_1', '学会下指令', 'Prompt 的艺术：如何让 AI 准确理解你的需求', 1, FALSE, 'checklist', '{}', 15),
('1-2', 'chapter_1', '个人名片', '做一张数字名片', 2, FALSE, 'checklist', '{}', 15),
('1-3', 'chapter_1', '多页面个人网站', '做一个完整的个人网站', 3, TRUE, 'checklist', '{}', 20),
('1-4', 'chapter_1', '发布到互联网', '把你的网站发布到互联网上', 4, FALSE, 'checklist', '{}', 10),
('1-5', 'chapter_1', '设计进阶', '让你的页面更好看：设计思维与资源', 5, FALSE, 'checklist', '{}', 20),
('2-1', 'chapter_2', '升级你的工具', '从 HTML 文件升级到现代开发工具', 1, FALSE, 'regex', '{"pattern": "react"}', 15),
('2-2', 'chapter_2', '搭建骨架', '用组件搭建网站骨架', 2, FALSE, 'checklist', '{}', 20),
('2-3', 'chapter_2', '装修美化', '用 TailwindCSS 给网站做精装修', 3, FALSE, 'checklist', '{}', 15),
('2-4', 'chapter_2', '完整作品集', '完成你的作品集网站', 4, TRUE, 'checklist', '{}', 20),
('2-5', 'chapter_2', '部署 React 项目', '把 React 作品集部署到 Vercel', 5, FALSE, 'checklist', '{}', 15),
('3-1', 'chapter_3', '暗色模式', '实现暗色/亮色模式切换', 1, FALSE, 'checklist', '{}', 15),
('3-2', 'chapter_3', '实时搜索', '给作品页加实时搜索', 2, FALSE, 'checklist', '{}', 15),
('3-3', 'chapter_3', '联系表单', '做一个联系表单', 3, FALSE, 'checklist', '{}', 20),
('3-4', 'chapter_3', 'AI 生图素材', '用 AI 生成网站图片和素材', 4, FALSE, 'checklist', '{}', 25),
('3-5', 'chapter_3', '产品级打磨', '打磨成一个像样的产品', 5, TRUE, 'url_check', '{"expected_status": 200}', 30),
('4-1', 'chapter_4', '后端 API 初体验', '创建你的第一个后端 API', 1, FALSE, 'url_check', '{"expected_status": 200}', 20),
('4-2', 'chapter_4', '数据库', '接入数据库', 2, FALSE, 'checklist', '{}', 30),
('4-3', 'chapter_4', '用户系统', '实现用户注册登录', 3, FALSE, 'checklist', '{}', 30),
('4-4', 'chapter_4', '全栈管理系统', '做一个完整的全栈管理系统', 4, FALSE, 'url_check', '{"expected_status": 200}', 40),
('4-5', 'chapter_4', '接入支付', '给你的应用接入支付功能', 5, FALSE, 'checklist', '{}', 35),
('4-6', 'chapter_4', 'AI 能力集成', '给你的应用接入 AI 超能力', 6, TRUE, 'url_check', '{"expected_status": 200}', 40),
('5-1', 'chapter_5', '推送到 GitHub', '把代码推送到 GitHub', 1, FALSE, 'github_url', '{"must_have_files": ["package.json", "README.md"]}', 15),
('5-2', 'chapter_5', '部署到 Vercel', '把网站部署到互联网上', 2, FALSE, 'url_check', '{"expected_status": 200}', 25),
('5-3', 'chapter_5', '正式发布', '正式发布你的产品', 3, TRUE, 'composite', '{"checks": ["url_check", "github_url"]}', 30);

-- Ranks
INSERT INTO public.ranks (id, name, subtitle, salary, badge_color, chapter_id, order_index) VALUES
('rank_0', 'IT文盲', '连 AI 助手都没装过', '0', '#9CA3AF', NULL, 0),
('rank_1', '会装软件的普通人', '至少不用找人帮忙了', '3K/月', '#60A5FA', 'prologue', 1),
('rank_2', '能出活的实习生', '老板，我做了个网页', '5K/月', '#34D399', 'chapter_1', 2),
('rank_3', '不写代码的程序员', '我不写代码，AI替我写', '15K/月', '#A78BFA', 'chapter_2', 3),
('rank_4', '全干工程师', '前后端数据库支付AI都能搞', '30K/月', '#F59E0B', 'chapter_3', 4),
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
