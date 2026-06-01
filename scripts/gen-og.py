#!/usr/bin/env python3
"""生成 VibeCamp OG 图 (1200x630) 和 favicon (32x32, 180x180)"""

import struct, zlib, math, os

OUT = os.path.join(os.path.dirname(__file__), "..", "public")

# ── PNG 工具 ──────────────────────────────────────────────────────────────────

def png_chunk(tag: bytes, data: bytes) -> bytes:
    c = zlib.crc32(tag + data) & 0xFFFFFFFF
    return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", c)

def write_png(path: str, w: int, h: int, pixels):
    """pixels: list of (r,g,b,a) rows"""
    raw = b""
    for row in pixels:
        raw += b"\x00"
        for r, g, b, a in row:
            raw += bytes([r, g, b, a])
    compressed = zlib.compress(raw, 9)
    with open(path, "wb") as f:
        f.write(b"\x89PNG\r\n\x1a\n")
        f.write(png_chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 6, 0, 0, 0)))
        f.write(png_chunk(b"IDAT", compressed))
        f.write(png_chunk(b"IEND", b""))

def lerp(a, b, t):
    return a + (b - a) * t

def clamp(v, lo=0, hi=255):
    return max(lo, min(hi, int(v)))

# ── 颜色 ─────────────────────────────────────────────────────────────────────

BG       = (10,  10,  15,  255)   # #0A0A0F
INDIGO1  = (99,  102, 241)        # #6366F1
INDIGO2  = (79,  70,  229)        # #4F46E5
PURPLE   = (139, 92,  246)        # #8B5CF6
BLUE     = (59,  130, 246)        # #3B82F6
WHITE    = (255, 255, 255)
GRAY     = (156, 163, 175)        # #9CA3AF

# ── 绘图原语 ─────────────────────────────────────────────────────────────────

def blend(bg, fg, alpha):
    a = alpha / 255
    return (
        clamp(bg[0] * (1 - a) + fg[0] * a),
        clamp(bg[1] * (1 - a) + fg[1] * a),
        clamp(bg[2] * (1 - a) + fg[2] * a),
        255,
    )

def set_pixel(pixels, x, y, color, alpha=255):
    if 0 <= x < len(pixels[0]) and 0 <= y < len(pixels):
        bg = pixels[y][x]
        pixels[y][x] = blend(bg, color, alpha)

def fill_rect(pixels, x0, y0, x1, y1, color, alpha=255):
    for y in range(max(0, y0), min(len(pixels), y1)):
        for x in range(max(0, x0), min(len(pixels[0]), x1)):
            set_pixel(pixels, x, y, color, alpha)

def radial_gradient(pixels, cx, cy, r, color, max_alpha=80):
    for y in range(max(0, cy - r), min(len(pixels), cy + r)):
        for x in range(max(0, cx - r), min(len(pixels[0]), cx + r)):
            d = math.sqrt((x - cx) ** 2 + (y - cy) ** 2)
            if d < r:
                a = int(max_alpha * (1 - d / r) ** 1.5)
                set_pixel(pixels, x, y, color, a)

def draw_grid(pixels, w, h, spacing=48, alpha=8):
    color = INDIGO1
    for x in range(0, w, spacing):
        for y in range(h):
            set_pixel(pixels, x, y, color, alpha)
    for y in range(0, h, spacing):
        for x in range(w):
            set_pixel(pixels, x, y, color, alpha)

def draw_circle_outline(pixels, cx, cy, r, color, thickness=2, alpha=180):
    for angle in range(0, 3600):
        a = angle * math.pi / 1800
        for t in range(thickness):
            rr = r - t
            x = int(cx + rr * math.cos(a))
            y = int(cy + rr * math.sin(a))
            set_pixel(pixels, x, y, color, alpha)

def draw_hline(pixels, x0, x1, y, color, alpha=255):
    for x in range(max(0, x0), min(len(pixels[0]), x1)):
        set_pixel(pixels, x, y, color, alpha)

def draw_vline(pixels, x, y0, y1, color, alpha=255):
    for y in range(max(0, y0), min(len(pixels), y1)):
        set_pixel(pixels, x, y, color, alpha)

def draw_rounded_rect_outline(pixels, x0, y0, x1, y1, r, color, alpha=255, thickness=1):
    # straight edges
    for t in range(thickness):
        draw_hline(pixels, x0 + r, x1 - r, y0 + t, color, alpha)
        draw_hline(pixels, x0 + r, x1 - r, y1 - 1 - t, color, alpha)
        draw_vline(pixels, x0 + t, y0 + r, y1 - r, color, alpha)
        draw_vline(pixels, x1 - 1 - t, y0 + r, y1 - r, color, alpha)
    # corners
    for angle in range(0, 900):
        a = angle * math.pi / 1800
        for t in range(thickness):
            rr = r - t
            dx = int(rr * math.cos(a))
            dy = int(rr * math.sin(a))
            set_pixel(pixels, x1 - r + dx, y0 + r - dy, color, alpha)
            set_pixel(pixels, x0 + r - dx, y0 + r - dy, color, alpha)
            set_pixel(pixels, x0 + r - dx, y1 - r + dy, color, alpha)
            set_pixel(pixels, x1 - r + dx, y1 - r + dy, color, alpha)

def fill_rounded_rect(pixels, x0, y0, x1, y1, r, color, alpha=255):
    for y in range(max(0, y0), min(len(pixels), y1)):
        for x in range(max(0, x0), min(len(pixels[0]), x1)):
            # corner check
            in_rect = True
            if x < x0 + r and y < y0 + r:
                in_rect = math.sqrt((x - (x0 + r)) ** 2 + (y - (y0 + r)) ** 2) <= r
            elif x > x1 - r and y < y0 + r:
                in_rect = math.sqrt((x - (x1 - r)) ** 2 + (y - (y0 + r)) ** 2) <= r
            elif x < x0 + r and y > y1 - r:
                in_rect = math.sqrt((x - (x0 + r)) ** 2 + (y - (y1 - r)) ** 2) <= r
            elif x > x1 - r and y > y1 - r:
                in_rect = math.sqrt((x - (x1 - r)) ** 2 + (y - (y1 - r)) ** 2) <= r
            if in_rect:
                set_pixel(pixels, x, y, color, alpha)

# ── 简单像素字体（5×7 bitmap）────────────────────────────────────────────────

FONT5 = {
    'A': ["01110","10001","10001","11111","10001","10001","10001"],
    'B': ["11110","10001","10001","11110","10001","10001","11110"],
    'C': ["01110","10001","10000","10000","10000","10001","01110"],
    'D': ["11110","10001","10001","10001","10001","10001","11110"],
    'E': ["11111","10000","10000","11110","10000","10000","11111"],
    'F': ["11111","10000","10000","11110","10000","10000","10000"],
    'G': ["01110","10001","10000","10111","10001","10001","01111"],
    'H': ["10001","10001","10001","11111","10001","10001","10001"],
    'I': ["01110","00100","00100","00100","00100","00100","01110"],
    'J': ["00111","00010","00010","00010","10010","10010","01100"],
    'K': ["10001","10010","10100","11000","10100","10010","10001"],
    'L': ["10000","10000","10000","10000","10000","10000","11111"],
    'M': ["10001","11011","10101","10001","10001","10001","10001"],
    'N': ["10001","11001","10101","10011","10001","10001","10001"],
    'O': ["01110","10001","10001","10001","10001","10001","01110"],
    'P': ["11110","10001","10001","11110","10000","10000","10000"],
    'Q': ["01110","10001","10001","10001","10101","10010","01101"],
    'R': ["11110","10001","10001","11110","10100","10010","10001"],
    'S': ["01111","10000","10000","01110","00001","00001","11110"],
    'T': ["11111","00100","00100","00100","00100","00100","00100"],
    'U': ["10001","10001","10001","10001","10001","10001","01110"],
    'V': ["10001","10001","10001","10001","10001","01010","00100"],
    'W': ["10001","10001","10001","10101","10101","11011","10001"],
    'X': ["10001","10001","01010","00100","01010","10001","10001"],
    'Y': ["10001","10001","01010","00100","00100","00100","00100"],
    'Z': ["11111","00001","00010","00100","01000","10000","11111"],
    'a': ["00000","00000","01110","00001","01111","10001","01111"],
    'b': ["10000","10000","11110","10001","10001","10001","11110"],
    'c': ["00000","00000","01110","10000","10000","10001","01110"],
    'd': ["00001","00001","01111","10001","10001","10001","01111"],
    'e': ["00000","00000","01110","10001","11111","10000","01110"],
    'f': ["00110","01001","01000","11100","01000","01000","01000"],
    'g': ["00000","01111","10001","10001","01111","00001","01110"],
    'h': ["10000","10000","11110","10001","10001","10001","10001"],
    'i': ["00100","00000","01100","00100","00100","00100","01110"],
    'j': ["00010","00000","00110","00010","00010","10010","01100"],
    'k': ["10000","10000","10010","10100","11000","10100","10010"],
    'l': ["01100","00100","00100","00100","00100","00100","01110"],
    'm': ["00000","00000","11010","10101","10101","10001","10001"],
    'n': ["00000","00000","11110","10001","10001","10001","10001"],
    'o': ["00000","00000","01110","10001","10001","10001","01110"],
    'p': ["00000","11110","10001","10001","11110","10000","10000"],
    'q': ["00000","01111","10001","10001","01111","00001","00001"],
    'r': ["00000","00000","01110","10001","10000","10000","10000"],
    's': ["00000","00000","01111","10000","01110","00001","11110"],
    't': ["01000","01000","11110","01000","01000","01001","00110"],
    'u': ["00000","00000","10001","10001","10001","10011","01101"],
    'v': ["00000","00000","10001","10001","10001","01010","00100"],
    'w': ["00000","00000","10001","10001","10101","10101","01010"],
    'x': ["00000","00000","10001","01010","00100","01010","10001"],
    'y': ["00000","10001","10001","01111","00001","10001","01110"],
    'z': ["00000","00000","11111","00010","00100","01000","11111"],
    '0': ["01110","10001","10011","10101","11001","10001","01110"],
    '1': ["00100","01100","00100","00100","00100","00100","01110"],
    '2': ["01110","10001","00001","00110","01000","10000","11111"],
    '3': ["11110","00001","00001","01110","00001","00001","11110"],
    '4': ["00010","00110","01010","10010","11111","00010","00010"],
    '5': ["11111","10000","10000","11110","00001","00001","11110"],
    '6': ["01110","10000","10000","11110","10001","10001","01110"],
    '7': ["11111","00001","00010","00100","01000","01000","01000"],
    '8': ["01110","10001","10001","01110","10001","10001","01110"],
    '9': ["01110","10001","10001","01111","00001","00001","01110"],
    ' ': ["00000","00000","00000","00000","00000","00000","00000"],
    '-': ["00000","00000","00000","11111","00000","00000","00000"],
    '/': ["00001","00010","00100","01000","10000","00000","00000"],
    '.': ["00000","00000","00000","00000","00000","01100","01100"],
    '·': ["00000","00000","00110","00110","00000","00000","00000"],
    '!': ["00100","00100","00100","00100","00000","00100","00100"],
    '（': ["00010","00100","01000","01000","01000","00100","00010"],
    '）': ["01000","00100","00010","00010","00010","00100","01000"],
}

def draw_text(pixels, text, x, y, color, scale=1, alpha=255, spacing=1):
    cx = x
    for ch in text:
        glyph = FONT5.get(ch, FONT5.get(' '))
        for row_i, row in enumerate(glyph):
            for col_i, bit in enumerate(row):
                if bit == '1':
                    for sy in range(scale):
                        for sx in range(scale):
                            set_pixel(pixels,
                                      cx + col_i * scale + sx,
                                      y + row_i * scale + sy,
                                      color, alpha)
        cx += (5 + spacing) * scale
    return cx

# ── 生成 OG 图 (1200×630) ────────────────────────────────────────────────────

def gen_og():
    W, H = 1200, 630
    pixels = [[(10, 10, 15, 255)] * W for _ in range(H)]

    # 背景网格
    draw_grid(pixels, W, H, spacing=48, alpha=7)

    # 渐变光晕
    radial_gradient(pixels, W // 2, 0, 700, INDIGO1, max_alpha=60)
    radial_gradient(pixels, 200, 200, 400, PURPLE, max_alpha=30)
    radial_gradient(pixels, 1000, 400, 350, BLUE, max_alpha=20)

    # 装饰圆圈
    draw_circle_outline(pixels, W // 2, H // 2, 280, INDIGO1, thickness=1, alpha=15)
    draw_circle_outline(pixels, W // 2, H // 2, 380, INDIGO1, thickness=1, alpha=8)

    # Logo 方块（左上角）
    lx, ly = 80, 80
    fill_rounded_rect(pixels, lx, ly, lx + 56, ly + 56, 12, INDIGO2, alpha=200)
    draw_rounded_rect_outline(pixels, lx, ly, lx + 56, ly + 56, 12, INDIGO1, alpha=120, thickness=1)
    # Terminal icon inside logo
    draw_text(pixels, ">_", lx + 10, ly + 18, WHITE, scale=2, alpha=220)

    # 主标题：AI 编程教程
    # 用大号像素字
    title = "VibeCamp"
    draw_text(pixels, title, 80, 170, WHITE, scale=5, alpha=255, spacing=2)

    # 副标题
    sub1 = "AI  Coding  Tutorial"
    draw_text(pixels, sub1, 82, 265, INDIGO1, scale=3, alpha=200, spacing=1)

    # 描述文字
    desc1 = "Zero-to-Product  in  3-5  Weeks"
    draw_text(pixels, desc1, 82, 330, GRAY, scale=2, alpha=180, spacing=1)

    # 标签 pills
    tags = ["Claude Code", "Trae", "Codex", "26 Levels"]
    tx = 82
    for tag in tags:
        tw = len(tag) * 7 + 20
        fill_rounded_rect(pixels, tx, 390, tx + tw, 390 + 28, 8, INDIGO1, alpha=30)
        draw_rounded_rect_outline(pixels, tx, 390, tx + tw, 390 + 28, 8, INDIGO1, alpha=80, thickness=1)
        draw_text(pixels, tag, tx + 10, 397, INDIGO1, scale=1, alpha=200)
        tx += tw + 12

    # 右侧装饰：代码块
    cx0, cy0 = 720, 120
    fill_rounded_rect(pixels, cx0, cy0, cx0 + 400, cy0 + 340, 16, (20, 20, 35, 255), alpha=200)
    draw_rounded_rect_outline(pixels, cx0, cy0, cx0 + 400, cy0 + 340, 16, INDIGO1, alpha=60, thickness=1)
    # 顶部 dots
    for i, col in enumerate([(220, 80, 80), (220, 180, 80), (80, 200, 80)]):
        fill_rounded_rect(pixels, cx0 + 16 + i * 20, cy0 + 16, cx0 + 26 + i * 20, cy0 + 26, 5, col, alpha=180)
    # 代码行
    code_lines = [
        ("// AI 编程教程", GRAY, 1),
        ("const  result  =  await", WHITE, 1),
        ("  ai.generate({", WHITE, 1),
        ("    prompt:", INDIGO1, 1),
        ('    "做一个工具站",', (134, 239, 172), 1),
        ("    model:  'claude',", WHITE, 1),
        ("  });", WHITE, 1),
        ("", WHITE, 1),
        ("//  3  周后上线，月入  ¥3k", (134, 239, 172), 1),
    ]
    for i, (line, color, scale) in enumerate(code_lines):
        draw_text(pixels, line, cx0 + 20, cy0 + 50 + i * 26, color, scale=scale, alpha=200)

    # 底部分割线
    draw_hline(pixels, 80, W - 80, H - 80, INDIGO1, alpha=30)
    draw_text(pixels, "vibecamp.app", 82, H - 60, GRAY, scale=1, alpha=150)
    draw_text(pixels, "Free  ·  Game-based  ·  Real  Products", W - 500, H - 60, GRAY, scale=1, alpha=120)

    write_png(os.path.join(OUT, "og-image.png"), W, H, pixels)
    print(f"✓ og-image.png ({W}×{H})")

# ── 生成 favicon (32×32) ─────────────────────────────────────────────────────

def gen_favicon():
    W = H = 32
    pixels = [[(0, 0, 0, 0)] * W for _ in range(H)]

    # 背景圆角矩形
    fill_rounded_rect(pixels, 0, 0, W, H, 7, INDIGO2, alpha=255)

    # 渐变光晕
    radial_gradient(pixels, W // 2, 4, 20, PURPLE, max_alpha=80)

    # ">_" 符号
    draw_text(pixels, ">", 5, 10, WHITE, scale=2, alpha=240)
    draw_text(pixels, "_", 16, 10, INDIGO1, scale=2, alpha=200)

    write_png(os.path.join(OUT, "favicon.png"), W, H, pixels)
    print(f"✓ favicon.png ({W}×{H})")

# ── 生成 apple-touch-icon (180×180) ─────────────────────────────────────────

def gen_apple_icon():
    W = H = 180
    pixels = [[(0, 0, 0, 0)] * W for _ in range(H)]

    fill_rounded_rect(pixels, 0, 0, W, H, 36, INDIGO2, alpha=255)
    radial_gradient(pixels, W // 2, 20, 120, PURPLE, max_alpha=80)

    # Logo text
    draw_text(pixels, "VC", 28, 55, WHITE, scale=6, alpha=240, spacing=2)
    draw_text(pixels, "VibeCamp", 18, 130, INDIGO1, scale=2, alpha=200, spacing=1)

    write_png(os.path.join(OUT, "apple-touch-icon.png"), W, H, pixels)
    print(f"✓ apple-touch-icon.png ({W}×{H})")

if __name__ == "__main__":
    gen_og()
    gen_favicon()
    gen_apple_icon()
    print("All images generated!")
