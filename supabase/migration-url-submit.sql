-- Migration: 将各章交付关的 verification_type 改为 url_submit
-- 交付关：1-4, 2-5, 3-5, 4-5, 5-4
-- 这些关卡步骤全勾完后需要用户提交作品链接才能通关

UPDATE public.levels
SET verification_type = 'url_submit',
    verification_config = '{}'
WHERE id IN ('1-4', '2-5', '3-5', '4-5', '5-4');
