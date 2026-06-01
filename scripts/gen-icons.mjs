/**
 * VibeCamp 图标生成脚本 v4
 * 风格参考：纯色底 + 单一大图标，极简高辨识度
 */
import { Resvg } from "@resvg/resvg-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "../public");

// ─── 方案 A：紫色底 + 大白色 </> ──────────────────────────────────────────────
const svgA = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <!-- 纯紫色底，圆角同参考图比例 -->
  <rect width="512" height="512" rx="115" fill="#6C47FF"/>

  <!-- </> 三件套，整体居中，笔画粗壮 -->
  <!-- 左 < -->
  <path d="M 168 148 L 80 256 L 168 364"
        fill="none" stroke="white" stroke-width="52"
        stroke-linecap="round" stroke-linejoin="round"/>
  <!-- 右 > -->
  <path d="M 344 148 L 432 256 L 344 364"
        fill="none" stroke="white" stroke-width="52"
        stroke-linecap="round" stroke-linejoin="round"/>
  <!-- 中间斜线 / -->
  <line x1="296" y1="136" x2="216" y2="376"
        stroke="white" stroke-width="52"
        stroke-linecap="round"/>
</svg>`;

// ─── 方案 B：深靛蓝底 + 白色光标符 ▌──────────────────────────────────────────
const svgB = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="115" fill="#3730A3"/>

  <!-- 大写 AI 字样，简洁 -->
  <!-- A -->
  <path d="M 96 380 L 192 132 L 288 380"
        fill="none" stroke="white" stroke-width="50"
        stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="120" y1="300" x2="264" y2="300"
        stroke="white" stroke-width="50" stroke-linecap="round"/>
  <!-- 竖线光标 | -->
  <line x1="336" y1="132" x2="336" y2="380"
        stroke="white" stroke-width="50" stroke-linecap="round"/>
  <!-- 光标下划线（闪烁感） -->
  <line x1="310" y1="400" x2="420" y2="400"
        stroke="white" stroke-width="36" stroke-linecap="round" opacity="0.7"/>
</svg>`;

// ─── 方案 C：暖紫底 + 单个大闪电（极简版，无括号）─────────────────────────────
const svgC = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="115" fill="#7C3AED"/>

  <!-- 极简闪电，居中，占满画布 80% -->
  <path d="M 300 60
           L 180 280 L 262 280
           L 212 452
           L 390 220 L 300 220
           L 340 60 Z"
        fill="white"/>
</svg>`;

// ─── 渲染函数 ─────────────────────────────────────────────────────────────────
function renderSVG(svgStr, size, outputPath) {
  const resvg = new Resvg(svgStr, {
    fitTo: { mode: "width", value: size },
    background: "transparent",
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  fs.writeFileSync(outputPath, pngBuffer);
  console.log(`✓ ${path.basename(outputPath)} (${size}×${size})`);
}

// ─── 生成预览 ─────────────────────────────────────────────────────────────────
console.log("\n🎨 生成图标预览...\n");

renderSVG(svgA, 256, path.join(publicDir, "icon-preview-A.png"));
renderSVG(svgB, 256, path.join(publicDir, "icon-preview-B.png"));
renderSVG(svgC, 256, path.join(publicDir, "icon-preview-C.png"));

console.log("\n预览：");
console.log("  A: 紫色底 + </> 代码标签");
console.log("  B: 深蓝底 + AI 光标");
console.log("  C: 紫色底 + 极简闪电");
console.log("\n运行 node scripts/gen-icons.mjs --apply=A/B/C 应用选定方案");

// 应用选定方案
const applyArg = process.argv.find(a => a.startsWith("--apply="));
if (applyArg) {
  const choice = applyArg.split("=")[1].toUpperCase();
  const svgMap = { A: svgA, B: svgB, C: svgC };
  const chosen = svgMap[choice];
  if (!chosen) { console.error("无效方案，请选 A/B/C"); process.exit(1); }

  renderSVG(chosen, 32,  path.join(publicDir, "favicon.png"));
  renderSVG(chosen, 180, path.join(publicDir, "apple-touch-icon.png"));
  renderSVG(chosen, 512, path.join(publicDir, "logo.png"));
  fs.writeFileSync(path.join(publicDir, "logo.svg"), chosen);

  console.log(`\n✅ 方案 ${choice} 已应用！`);
}
