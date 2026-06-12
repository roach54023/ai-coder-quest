from __future__ import annotations

import json
import math
import textwrap
from pathlib import Path
from urllib.parse import quote
from urllib.request import urlopen

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "share-posters"
QR_DIR = OUT_DIR / "qr"
BASE_URL = "https://vibecamps.org/zh"
FONT = "/System/Library/Fonts/Hiragino Sans GB.ttc"
FONT_FALLBACK = "/System/Library/Fonts/STHeiti Light.ttc"


POSTERS = [
    {
        "id": "prologue",
        "file": "chapter-prologue.png",
        "campaign": "chapter_prologue",
        "chapter": "序章 · 开机",
        "headline": "我跑通了第一个 AI 编程循环",
        "result": "装好 AI 助手，用一句话生成网页，并看到浏览器里的真实结果。",
        "milestone": "2/27 关",
        "rank": "AI 入门者",
        "accent": "#6366F1",
        "bg": "#F4F6FF",
        "pattern": "loop",
    },
    {
        "id": "chapter_1",
        "file": "chapter-1-static-site.png",
        "campaign": "chapter_1",
        "chapter": "第一章 · 静态网站",
        "headline": "我做出了第一个完整网站",
        "result": "用 AI 完成城市美食探索网站：列表页、详情页、搜索、地图、分享和上线部署。",
        "milestone": "5/27 关",
        "rank": "AI 建站者",
        "accent": "#10B981",
        "bg": "#F1FCF7",
        "pattern": "website",
    },
    {
        "id": "chapter_2",
        "file": "chapter-2-frontend.png",
        "campaign": "chapter_2",
        "chapter": "第二章 · 现代前端",
        "headline": "我把网页升级成了前端项目",
        "result": "用 React、组件化和 Tailwind，把作品从单页网页推进到可维护的现代前端工程。",
        "milestone": "10/27 关",
        "rank": "AI 前端工程师",
        "accent": "#F59E0B",
        "bg": "#FFF8E8",
        "pattern": "cards",
    },
    {
        "id": "chapter_3",
        "file": "chapter-3-interaction.png",
        "campaign": "chapter_3",
        "chapter": "第三章 · 交互体验",
        "headline": "我做出了更像产品的交互体验",
        "result": "给网站加入暗色模式、实时搜索、联系表单和移动端适配，让作品可以真正给用户使用。",
        "milestone": "15/27 关",
        "rank": "AI 产品开发者",
        "accent": "#EC4899",
        "bg": "#FFF1F8",
        "pattern": "interaction",
    },
    {
        "id": "chapter_4",
        "file": "chapter-4-fullstack.png",
        "campaign": "chapter_4",
        "chapter": "第四章 · 全栈能力",
        "headline": "我接上了后端、数据库和 AI 能力",
        "result": "完成 API 路由、Supabase 数据库、后台管理、访问统计、环境变量部署和 AI 功能集成。",
        "milestone": "21/27 关",
        "rank": "AI 全栈开发者",
        "accent": "#0EA5E9",
        "bg": "#EFF9FF",
        "pattern": "stack",
    },
    {
        "id": "chapter_5",
        "file": "chapter-5-launch.png",
        "campaign": "chapter_5",
        "chapter": "第五章 · 能赚钱的产品",
        "headline": "我完成了一个可上线运营的 AI 产品",
        "result": "接入登录、AI 对话、Stripe 支付和生产环境检查，把作品推进到可运营的产品形态。",
        "milestone": "27/27 关",
        "rank": "独立开发者",
        "accent": "#F97316",
        "bg": "#FFF5ED",
        "pattern": "launch",
    },
]


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    path = FONT if Path(FONT).exists() else FONT_FALLBACK
    index = 0 if bold else 1
    return ImageFont.truetype(path, size, index=index)


def hex_to_rgb(value: str) -> tuple[int, int, int]:
    value = value.lstrip("#")
    return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))


def blend(color: str, alpha: float, base: tuple[int, int, int] = (255, 255, 255)) -> tuple[int, int, int]:
    c = hex_to_rgb(color)
    return tuple(round(c[i] * alpha + base[i] * (1 - alpha)) for i in range(3))


def rounded(draw: ImageDraw.ImageDraw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def wrap_text(text: str, max_chars: int) -> list[str]:
    lines: list[str] = []
    for part in text.split("\n"):
        lines.extend(textwrap.wrap(part, width=max_chars, break_long_words=False) or [""])
    return lines


def wrap_text_px(draw: ImageDraw.ImageDraw, text: str, fnt, max_width: int) -> list[str]:
    lines: list[str] = []
    for paragraph in text.split("\n"):
        current = ""
        for ch in paragraph:
            candidate = current + ch
            if current and draw.textbbox((0, 0), candidate, font=fnt)[2] > max_width:
                lines.append(current)
                current = ch
            else:
                current = candidate
        if current:
            lines.append(current)
    return lines or [""]


def draw_wrapped_px(draw: ImageDraw.ImageDraw, xy, text: str, fnt, fill, max_width: int, line_gap: int):
    x, y = xy
    for line in wrap_text_px(draw, text, fnt, max_width):
        draw.text((x, y), line, font=fnt, fill=fill)
        y += fnt.size + line_gap
    return y


def draw_wrapped(draw: ImageDraw.ImageDraw, xy, text: str, fnt, fill, max_chars: int, line_gap: int):
    x, y = xy
    for line in wrap_text(text, max_chars):
        draw.text((x, y), line, font=fnt, fill=fill)
        y += fnt.size + line_gap
    return y


def make_qr(url: str, poster_id: str) -> Image.Image:
    QR_DIR.mkdir(parents=True, exist_ok=True)
    path = QR_DIR / f"{poster_id}.png"
    if not path.exists():
        try:
            from reportlab.graphics.barcode.qr import QrCodeWidget

            qr = QrCodeWidget(url).qr
            qr.make()
            module_count = qr.getModuleCount()
            border = 4
            box_size = 10
            size = (module_count + border * 2) * box_size
            image = Image.new("RGB", (size, size), "white")
            qr_draw = ImageDraw.Draw(image)
            for row in range(module_count):
                for col in range(module_count):
                    if qr.isDark(row, col):
                        x = (col + border) * box_size
                        y = (row + border) * box_size
                        qr_draw.rectangle((x, y, x + box_size - 1, y + box_size - 1), fill="black")
            image.resize((420, 420), Image.Resampling.NEAREST).save(path)
        except ImportError:
            api = (
                "https://api.qrserver.com/v1/create-qr-code/"
                f"?size=420x420&margin=18&data={quote(url, safe='')}"
            )
            with urlopen(api, timeout=20) as resp:
                path.write_bytes(resp.read())
    return Image.open(path).convert("RGBA")


def draw_pattern(draw: ImageDraw.ImageDraw, spec: dict, w: int, h: int):
    accent = spec["accent"]
    light = blend(accent, 0.1)
    mid = blend(accent, 0.25)
    dark = hex_to_rgb(accent)
    y = 795
    if spec["pattern"] == "website":
        rounded(draw, (90, y, 990, y + 250), 36, (255, 255, 255), mid, 2)
        rounded(draw, (130, y + 42, 470, y + 196), 24, light)
        rounded(draw, (500, y + 42, 950, y + 80), 19, light)
        for i in range(3):
            rounded(draw, (500, y + 105 + i * 43, 900 - i * 40, y + 128 + i * 43), 12, mid)
        draw.line((135, y + 82, 420, y + 82), fill=dark, width=7)
    elif spec["pattern"] == "cards":
        for i, x in enumerate([90, 320, 550, 780]):
            rounded(draw, (x, y + (i % 2) * 32, x + 190, y + 210 + (i % 2) * 32), 28, (255, 255, 255), mid, 2)
            rounded(draw, (x + 24, y + 28 + (i % 2) * 32, x + 166, y + 92 + (i % 2) * 32), 18, light)
            draw.line((x + 28, y + 130 + (i % 2) * 32, x + 150, y + 130 + (i % 2) * 32), fill=dark, width=6)
            draw.line((x + 28, y + 158 + (i % 2) * 32, x + 122, y + 158 + (i % 2) * 32), fill=mid, width=6)
    elif spec["pattern"] == "interaction":
        rounded(draw, (100, y + 30, 980, y + 210), 42, (255, 255, 255), mid, 2)
        for x, label in [(150, "搜索"), (365, "暗色"), (580, "表单"), (795, "手机")]:
            rounded(draw, (x, y + 82, x + 140, y + 158), 38, light, mid, 2)
            draw.text((x + 31, y + 103), label, font=font(30, True), fill=dark)
    elif spec["pattern"] == "stack":
        for i, label in enumerate(["API", "DB", "Admin", "AI"]):
            x = 125 + i * 215
            rounded(draw, (x, y + 35, x + 155, y + 190), 30, (255, 255, 255), mid, 2)
            draw.text((x + 38, y + 90), label, font=font(32, True), fill=dark)
            if i < 3:
                draw.line((x + 155, y + 112, x + 215, y + 112), fill=mid, width=8)
    elif spec["pattern"] == "launch":
        draw.polygon([(540, y + 10), (620, y + 175), (540, y + 145), (460, y + 175)], fill=dark)
        draw.ellipse((500, y + 65, 580, y + 145), fill=(255, 255, 255))
        draw.polygon([(490, y + 160), (425, y + 250), (530, y + 205)], fill=blend(accent, 0.45))
        draw.polygon([(590, y + 160), (655, y + 250), (550, y + 205)], fill=blend(accent, 0.45))
        for r, a in [(360, 0.08), (250, 0.12), (150, 0.18)]:
            draw.ellipse((540 - r // 2, y + 135 - r // 2, 540 + r // 2, y + 135 + r // 2), outline=blend(accent, a), width=4)
    else:
        rounded(draw, (150, y + 40, 930, y + 185), 72, (255, 255, 255), mid, 2)
        for i, x in enumerate([215, 385, 555, 725]):
            draw.ellipse((x, y + 78, x + 64, y + 142), fill=dark if i == 3 else mid)
            if i < 3:
                draw.line((x + 64, y + 110, x + 170, y + 110), fill=mid, width=8)


def draw_share_footer(
    img: Image.Image,
    draw: ImageDraw.ImageDraw,
    qr: Image.Image,
    accent: str,
    y: int = 1036,
):
    accent_rgb = hex_to_rgb(accent)
    rounded(draw, (86, y, 994, 1358), 36, (255, 255, 255), blend(accent, 0.55), 2)
    img.paste(qr.resize((272, 272), Image.Resampling.NEAREST), (122, y + 28), qr.resize((272, 272), Image.Resampling.NEAREST))
    draw.text((440, y + 72), "扫码开始挑战", font=font(48, True), fill=(15, 23, 42))
    draw.text((440, y + 132), "VibeCamp 游戏化 AI 编程训练营", font=font(30), fill=accent_rgb)
    draw.text((440, y + 184), "从 0 开始，用 AI 做真实项目", font=font(30), fill=(71, 85, 105))
    draw.text((440, y + 234), "适合想把 AI 编程真正用起来的人", font=font(26), fill=(100, 116, 139))


def make_chapter_1_poster(spec: dict, url: str) -> dict:
    w, h = 1080, 1440
    accent = "#2563EB"
    bg = Image.new("RGB", (w, h), (248, 251, 255))
    draw = ImageDraw.Draw(bg)
    for y in range(-60, h, 155):
        draw.line((0, y, w, y - 92), fill=(226, 238, 252), width=1)

    glow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse((610, -160, 1240, 455), fill=(37, 99, 235, 30))
    glow_draw.ellipse((-220, 900, 430, 1600), fill=(37, 99, 235, 20))
    img = Image.alpha_composite(bg.convert("RGBA"), glow.filter(ImageFilter.GaussianBlur(45))).convert("RGB")
    draw = ImageDraw.Draw(img)

    shadow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow)
    rounded(shadow_draw, (58, 58, 1022, 1382), 54, (15, 35, 80, 26))
    img = Image.alpha_composite(img.convert("RGBA"), shadow.filter(ImageFilter.GaussianBlur(22))).convert("RGB")
    draw = ImageDraw.Draw(img)

    rounded(draw, (60, 58, 1020, 1378), 54, (255, 255, 255), blend(accent, 0.55), 2)
    draw.text((98, 108), "VibeCamp", font=font(36, True), fill=hex_to_rgb(accent))
    draw.text((305, 113), "游戏化 AI 编程训练营", font=font(29), fill=(63, 74, 92))
    rounded(draw, (98, 180, 444, 238), 29, hex_to_rgb(accent))
    draw.text((121, 193), "CHAPTER CLEAR", font=font(34, True), fill=(255, 255, 255))

    draw.text((98, 318), "我通关了", font=font(76, True), fill=(15, 23, 42))
    draw.text((98, 428), "AI 编程第一章", font=font(90, True), fill=hex_to_rgb(accent))
    draw.text((98, 590), "已经能用 AI 做出", font=font(54), fill=(51, 65, 85))
    draw.text((98, 684), "一个完整网站", font=font(58, True), fill=hex_to_rgb(accent))

    share_id = f"poster_{spec['campaign']}_v1"
    qr = make_qr(url, spec["id"])
    draw_share_footer(img, draw, qr, accent)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out = OUT_DIR / spec["file"]
    img.save(out, quality=95)
    return {
        "id": spec["id"],
        "file": f"/share-posters/{spec['file']}",
        "share_id": share_id,
        "url": url,
        "headline": "我通关了 AI 编程第一章",
    }


def make_poster(spec: dict) -> dict:
    share_id = f"poster_{spec['campaign']}_v1"
    url = f"{BASE_URL}?utm_source=wechat&utm_medium=poster&utm_campaign={spec['campaign']}&share_id={share_id}"
    poster_url = f"https://vibecamps.org/share-posters/{spec['file']}"
    make_qr(poster_url, f"{spec['id']}_transfer")
    if spec["id"] == "chapter_1":
        return make_chapter_1_poster(spec, url)

    w, h = 1080, 1440
    img = Image.new("RGB", (w, h), spec["bg"])
    draw = ImageDraw.Draw(img)
    accent = spec["accent"]
    dark = "#111827"
    muted = "#6B7280"

    for i in range(14):
        y = -120 + i * 120
        draw.line((0, y, w, y + 260), fill=blend(accent, 0.05), width=18)

    rounded(draw, (56, 56, w - 56, h - 56), 56, (255, 255, 255), blend(accent, 0.18), 2)
    rounded(draw, (88, 88, 292, 144), 28, blend(accent, 0.12))
    draw.text((118, 104), "VibeCamp", font=font(28, True), fill=hex_to_rgb(accent))
    draw.text((88, 185), spec["chapter"], font=font(40, True), fill=hex_to_rgb(accent))

    y = 258
    for line in wrap_text(spec["headline"], 10):
        draw.text((88, y), line, font=font(68, True), fill=dark)
        y += 82
    y += 16
    y = draw_wrapped_px(draw, (92, y), spec["result"], font(32), muted, 860, 16)

    rounded(draw, (88, 648, 992, 742), 34, blend(accent, 0.09), blend(accent, 0.18), 2)
    draw.text((128, 676), "完成进度", font=font(28), fill=muted)
    draw.text((268, 668), spec["milestone"], font=font(42, True), fill=dark)
    draw.text((600, 676), "当前段位", font=font(28), fill=muted)
    draw.text((740, 668), spec["rank"], font=font(42, True), fill=hex_to_rgb(accent))

    draw_pattern(draw, spec, w, h)

    qr = make_qr(url, spec["id"]).resize((246, 246))

    rounded(draw, (86, 1114, 994, 1338), 44, "#111827")
    img.paste(qr, (124, 1102), qr)
    draw.text((410, 1140), "扫码一起闯关", font=font(44, True), fill=(255, 255, 255))
    draw.text((410, 1202), "零基础用 AI 做真实项目", font=font(30), fill=(209, 213, 219))
    draw.text((410, 1250), "保存图片，发朋友圈或微信群", font=font(28), fill=blend(accent, 0.65, (17, 24, 39)))
    draw.text((88, 1350), "vibecamps.org/zh", font=font(26), fill=muted)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    out = OUT_DIR / spec["file"]
    img.save(out, quality=95)
    return {
        "id": spec["id"],
        "file": f"/share-posters/{spec['file']}",
        "share_id": share_id,
        "url": url,
        "headline": spec["headline"],
    }


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    manifest = [make_poster(spec) for spec in POSTERS]
    (OUT_DIR / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(manifest, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
