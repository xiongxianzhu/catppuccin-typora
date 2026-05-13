/**
 * Generates Catppuccin Typora theme CSS (one file per flavor).
 * Run: node scripts/generate-themes.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const palettes = {
  mocha: {
    rosewater: "#f5e0dc",
    flamingo: "#f2cdcd",
    pink: "#f5c2e7",
    mauve: "#cba6f7",
    red: "#f38ba8",
    maroon: "#eba0ac",
    peach: "#fab387",
    yellow: "#f9e2af",
    green: "#a6e3a1",
    teal: "#94e2d5",
    sky: "#89dceb",
    sapphire: "#74c7ec",
    blue: "#89b4fa",
    lavender: "#b4befe",
    text: "#cdd6f4",
    subtext1: "#bac2de",
    subtext0: "#a6adc8",
    overlay2: "#9399b2",
    overlay1: "#7f849c",
    overlay0: "#6c7086",
    surface2: "#585b70",
    surface1: "#45475a",
    surface0: "#313244",
    base: "#1e1e2e",
    mantle: "#181825",
    crust: "#11111b",
  },
  macchiato: {
    rosewater: "#f4dbd6",
    flamingo: "#f0c6c6",
    pink: "#f5bde6",
    mauve: "#c6a0f6",
    red: "#ed8796",
    maroon: "#ee99a0",
    peach: "#f5a97f",
    yellow: "#eed49f",
    green: "#a6da95",
    teal: "#8bd5ca",
    sky: "#91d7e3",
    sapphire: "#7dc4e4",
    blue: "#8aadf4",
    lavender: "#b7bdf8",
    text: "#cad3f5",
    subtext1: "#b8c0e0",
    subtext0: "#a5adcb",
    overlay2: "#939ab7",
    overlay1: "#8087a2",
    overlay0: "#6e738d",
    surface2: "#5b6078",
    surface1: "#494d64",
    surface0: "#363a4f",
    base: "#24273a",
    mantle: "#1e2030",
    crust: "#181926",
  },
  frappe: {
    rosewater: "#f2d5cf",
    flamingo: "#eebebe",
    pink: "#f4b8e4",
    mauve: "#ca9ee6",
    red: "#e78284",
    maroon: "#ea999c",
    peach: "#ef9f76",
    yellow: "#e5c890",
    green: "#a6d189",
    teal: "#81c8be",
    sky: "#99d1db",
    sapphire: "#85c1dc",
    blue: "#8caaee",
    lavender: "#babbf1",
    text: "#c6d0f5",
    subtext1: "#b5bfe2",
    subtext0: "#a5adce",
    overlay2: "#949cbb",
    overlay1: "#838ba7",
    overlay0: "#737994",
    surface2: "#626880",
    surface1: "#51576d",
    surface0: "#414559",
    base: "#303446",
    mantle: "#292c3c",
    crust: "#232634",
  },
  latte: {
    rosewater: "#dc8a78",
    flamingo: "#dd7878",
    pink: "#ea76cb",
    mauve: "#8839ef",
    red: "#d20f39",
    maroon: "#e64553",
    peach: "#fe640b",
    yellow: "#df8e1d",
    green: "#40a02b",
    teal: "#179299",
    sky: "#04a5e5",
    sapphire: "#209fb5",
    blue: "#1e66f5",
    lavender: "#7287fd",
    text: "#4c4f69",
    subtext1: "#5c5f77",
    subtext0: "#6c6f85",
    overlay2: "#7c7f93",
    overlay1: "#8c8fa1",
    overlay0: "#9ca0b0",
    surface2: "#acb0be",
    surface1: "#bcc0cc",
    surface0: "#ccd0da",
    base: "#eff1f5",
    mantle: "#e6e9ef",
    crust: "#dce0e8",
  },
};

const flavorTitle = {
  mocha: "Mocha",
  macchiato: "Macchiato",
  frappe: "Frappe",
  latte: "Latte",
};

function paletteBlock(p) {
  return Object.keys(p)
    .map((k) => `  --ctp-${k}: ${p[k]};`)
    .join("\n");
}

function markForeground(flavor, p) {
  return flavor === "latte" ? p.text : p.base;
}

/** macOS 风格选中态：系统蓝底 + 白勾（Latte 用浅色系统蓝） */
function systemCheckboxAccent(flavor) {
  if (flavor === "latte") {
    return { checked: "#007aff", hover: "#3395ff" };
  }
  return { checked: "#0a84ff", hover: "#409cff" };
}

/** @param {string} hex #rrggbb @param {number} alpha 0–1 */
function rgbaFromHex(hex, alpha) {
  const h = hex.slice(1);
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Semi-transparent colors as rgba(...) for WebKit without `color-mix` (Typora 1.13.x / macOS). */
function derivedAlphaVars(p) {
  const a = rgbaFromHex;
  return `
  /* Pre-computed rgba — avoids color-mix() for older WebKit */
  --ctp-alpha-surface0-40: ${a(p.surface0, 0.4)};
  --ctp-alpha-surface0-45: ${a(p.surface0, 0.45)};
  --ctp-alpha-surface0-65: ${a(p.surface0, 0.65)};
  --ctp-alpha-mantle-35: ${a(p.mantle, 0.35)};
  --ctp-alpha-yellow-55: ${a(p.yellow, 0.55)};
  --ctp-alpha-blue-28: ${a(p.blue, 0.28)};
  --ctp-alpha-blue-35: ${a(p.blue, 0.35)};
  --ctp-alpha-blue-38: ${a(p.blue, 0.38)};
  --ctp-alpha-blue-40: ${a(p.blue, 0.4)};
  --ctp-alpha-blue-45: ${a(p.blue, 0.45)};
  --ctp-alpha-peach-45: ${a(p.peach, 0.45)};
  --ctp-alpha-overlay1-55: ${a(p.overlay1, 0.55)};
  --ctp-alpha-overlay2-70: ${a(p.overlay2, 0.7)};
`;
}

function typoraRootMappings() {
  return `
  /* Typora interface variables */
  --bg-color: var(--ctp-base);
  --side-bar-bg-color: var(--ctp-mantle);
  --text-color: var(--ctp-text);
  --md-char-color: var(--ctp-overlay2);
  --meta-content-color: var(--ctp-subtext0);
  --primary-color: var(--ctp-blue);
  --primary-btn-border-color: var(--ctp-sapphire);
  --primary-btn-text-color: #ffffff;
  --window-border: 1px solid var(--ctp-surface0);
  --active-file-bg-color: var(--ctp-surface0);
  --active-file-text-color: var(--ctp-text);
  --active-file-border-color: var(--ctp-blue);
  --item-hover-bg-color: var(--ctp-alpha-surface0-65);
  --item-hover-text-color: var(--ctp-text);
  --select-text-bg-color: var(--ctp-alpha-blue-38);
  --monospace: "JetBrains Mono", "Fira Code", "SF Mono", "Cascadia Code", Monaco,
    Consolas, "Liberation Mono", monospace;
  --control-text-color: var(--ctp-subtext1);
  --control-text-hover-color: var(--ctp-text);
  --rawblock-edit-panel-bd: var(--ctp-surface0);
  --search-select-bg-color: var(--ctp-alpha-blue-45);
`;
}

function commonStyles() {
  return `
html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
}

html,
body {
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  background: var(--bg-color);
  fill: currentColor;
  /* 与 #write 同为无单位行高（对齐 github.css：body 与正文一套比例），避免 rem/比例混用导致列表 meta 行光标偏移 */
  line-height: 1.625;
}

#write {
  max-width: 914px;
}

@media only screen and (min-width: 1400px) {
  #write {
    max-width: 1024px;
  }
}

@media only screen and (min-width: 1800px) {
  #write {
    max-width: 1200px;
  }
}

html,
body,
button,
input,
select,
textarea,
div.code-tooltip-content {
  color: var(--text-color);
  border-color: transparent;
}

#write {
  font-size: 1rem;
  color: var(--ctp-text);
  line-height: 1.625;
}

html,
body,
button,
input,
select,
textarea {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
}

hr {
  height: 2px;
  border: 0;
  margin: 24px 0 !important;
  background: var(--ctp-surface0);
}

#write h1,
#write h2,
#write h3,
#write h4,
#write h5,
#write h6 {
  font-weight: 600;
  clear: both;
  word-wrap: break-word;
  margin: 0;
  padding: 0;
  letter-spacing: -0.02em;
}

#write h1 {
  font-size: 2.5rem;
  line-height: 2.75rem;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  color: var(--ctp-lavender);
}

#write h2 {
  font-size: 1.63rem;
  line-height: 1.875rem;
  margin-bottom: 1.5rem;
  color: var(--ctp-blue);
}

#write h3 {
  font-size: 1.17rem;
  line-height: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--ctp-teal);
}

#write h4 {
  font-size: 1.12rem;
  line-height: 1.375rem;
  margin-bottom: 1.5rem;
  color: var(--ctp-green);
}

#write h5 {
  font-size: 0.97rem;
  line-height: 1.25rem;
  margin-bottom: 1.5rem;
  color: var(--ctp-peach);
}

#write h6 {
  font-size: 0.93rem;
  line-height: 1rem;
  margin-bottom: 0.75rem;
  color: var(--ctp-pink);
}

a {
  color: var(--ctp-blue);
  text-decoration: none;
}

a:hover {
  color: var(--ctp-sapphire);
  text-decoration: underline;
}

#write p,
#write ul,
#write dd,
#write ol,
#write hr,
#write address,
#write pre,
#write table,
#write iframe {
  margin-top: 0;
  margin-bottom: 1.5rem;
}

#write ul,
#write ol {
  padding: 0 0 0 1.875rem;
}

#write ul {
  list-style: disc;
}

/* 列表项内 <p> 继承 #write p 的大 margin 时，每项之间会出现过大空白 */
#write li > p {
  margin: 0;
  line-height: 1.625rem;
}

/*
 * github.css 仅写 li p.first；当前 Typora 常只有 md-p，没有 .first，原选择器会完全不生效。
 * 用 :first-of-type 兜底首段，并 width:100% 避免 inline-block 收缩导致行盒异常。
 */
#write li > p.first,
#write li > p.md-p:first-of-type {
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  line-height: 1.625rem;
  min-height: 1.625rem;
}

#write li > p + p {
  margin-top: 0.35em;
}

/* md-line 在 li 内位于 p 下；与段落同源 rem 行高，避免插入条相对于 md-meta 偏高 */
#write li p .md-line {
  margin: 0;
  line-height: 1.625rem;
}

/* 列表项之间仅保留轻微间距（主要行高已有分隔） */
#write ul > li,
#write ol > li {
  margin: 0.12em 0;
}

#write ul > li:first-child,
#write ol > li:first-child {
  margin-top: 0;
}

#write ul > li:last-child,
#write ol > li:last-child {
  margin-bottom: 0;
}

/* 嵌套列表不要再用 ul 的 1.5rem 上下 margin */
#write li > ul,
#write li > ol {
  margin-top: 0.35em;
  margin-bottom: 0;
}

#write blockquote {
  margin: 1.5rem 0;
  padding: 0.65rem 1rem 0.55rem 1.25rem;
  border-left: 4px solid var(--ctp-blue);
  color: var(--ctp-subtext1);
  background: var(--ctp-alpha-surface0-40);
  line-height: 1.55;
}

/* blockquote 内段落勿继承 #write p 的 margin，否则会显得整块文字贴在上沿 */
#write blockquote p {
  margin: 0;
}

#write blockquote p + p {
  margin-top: 0.45em;
}

#write blockquote .md-line {
  margin: 0;
}

/* blockquote 内的列表勿继承 #write ul/ol 的大 margin */
#write blockquote ul,
#write blockquote ol {
  margin: 0;
  padding-left: 1.35rem;
}

#write blockquote li {
  margin: 0.2em 0;
}

#write blockquote li:first-child {
  margin-top: 0;
}

#write blockquote li:last-child {
  margin-bottom: 0;
}

/* 任意直接子块（p / ul / ol）取消首尾外 margin，避免在有色背景里「悬在上沿」 */
#write blockquote > :first-child {
  margin-top: 0 !important;
}

#write blockquote > :last-child {
  margin-bottom: 0 !important;
}

#write blockquote > ul:first-child li:first-child,
#write blockquote > ol:first-child li:first-child {
  margin-top: 0;
}

#write mark {
  background: var(--ctp-alpha-yellow-55);
  color: var(--ctp-mark-fg);
  padding: 0.1em 0.25em;
  border-radius: 4px;
}

#write strong,
#write b,
#write th,
#write dt {
  color: var(--ctp-mauve);
  font-weight: 700;
}

#write code,
#write tt,
#write kbd {
  font-family: var(--monospace);
  font-size: 0.875em;
  padding: 0.15em 0.45em;
  border-radius: 4px;
  background: var(--ctp-mantle);
  color: var(--ctp-pink);
  border: 1px solid var(--ctp-surface0);
}

#write pre {
  font-family: var(--monospace);
}

#write .md-fences {
  font-family: var(--monospace);
  font-size: 0.9rem;
  line-height: 1.45;
  padding: 12px 14px 12px 16px;
  margin-bottom: 1.25rem;
  background: var(--ctp-mantle);
  color: var(--ctp-text);
  border: 1px solid var(--ctp-surface0);
  border-radius: 4px;
}

/* 代码块内若存在 <p>（或继承 body 的 rem 行高），避免出现「行间空一行」与光标错位 */
#write .md-fences p,
#write pre.md-fences p {
  margin: 0 !important;
}

.cm-s-inner .CodeMirror-lines {
  padding-left: 2px;
}

.cm-s-inner .CodeMirror-line,
#write .md-fences .cm-line {
  margin: 0 !important;
  padding: 0;
}

.cm-s-inner .cm-content {
  line-height: 1.45;
}

#write .md-fences .code-tooltip,
.md-fences .code-tooltip {
  background-color: var(--ctp-mantle);
}

.CodeMirror-gutters {
  background: var(--ctp-mantle);
  border-right: 1px solid var(--ctp-surface0);
}

.cm-s-inner {
  background-color: var(--ctp-mantle);
  color: var(--ctp-text);
  line-height: 1.45;
}

.cm-s-inner .CodeMirror-gutters {
  background: var(--ctp-mantle);
  border: none;
}

.cm-s-inner .CodeMirror-linenumber {
  color: var(--ctp-overlay1);
}

.cm-s-inner .CodeMirror-cursor {
  border-left: 2px solid var(--ctp-rosewater) !important;
}

/* CodeMirror 6（若 Typora 使用） */
#write .md-fences .cm-cursor,
.cm-s-inner .cm-cursor {
  border-left: 2px solid var(--ctp-rosewater) !important;
}

.cm-s-inner div.CodeMirror-selected {
  background: var(--ctp-alpha-blue-28);
}

.cm-s-inner.CodeMirror-focused div.CodeMirror-selected {
  background: var(--ctp-alpha-blue-35);
}

.cm-s-inner .cm-keyword {
  color: var(--ctp-mauve);
}

.cm-s-inner .cm-atom,
.cm-s-inner.cm-atom {
  color: var(--ctp-peach);
}

.cm-s-inner .cm-number {
  color: var(--ctp-peach);
}

.cm-s-inner .cm-def,
.cm-s-inner.cm-def {
  color: var(--ctp-blue);
}

.cm-s-inner .cm-variable {
  color: var(--ctp-text);
}

.cm-s-inner .cm-variable-2 {
  color: var(--ctp-rosewater);
}

.cm-s-inner .cm-variable-3 {
  color: var(--ctp-yellow);
}

.cm-s-inner .cm-property,
.cm-s-inner .cm-operator {
  color: var(--ctp-teal);
}

.cm-s-inner .cm-comment,
.cm-s-inner.cm-comment {
  color: var(--ctp-overlay0);
  font-style: italic;
}

.cm-s-inner .cm-string,
.cm-s-inner .cm-string-2 {
  color: var(--ctp-green);
}

.cm-s-inner .cm-meta,
.cm-s-inner .cm-qualifier {
  color: var(--ctp-subtext0);
}

.cm-s-inner .cm-builtin {
  color: var(--ctp-red);
}

.cm-s-inner .cm-tag {
  color: var(--ctp-sapphire);
}

.cm-s-inner .cm-attribute,
.cm-s-inner .cm-type {
  color: var(--ctp-yellow);
}

.cm-s-inner .cm-header,
.cm-s-inner.cm-header {
  color: var(--ctp-lavender);
}

.cm-s-inner .cm-quote,
.cm-s-inner.cm-quote {
  color: var(--ctp-green);
}

.cm-s-inner .cm-hr {
  color: var(--ctp-overlay2);
}

.cm-s-inner .cm-link {
  color: var(--ctp-blue);
}

.cm-s-inner .cm-negative {
  color: var(--ctp-red);
}

.cm-s-inner .cm-positive {
  color: var(--ctp-green);
}

.cm-s-inner .cm-error {
  color: #ffffff;
  background-color: var(--ctp-red);
}

.cm-s-inner .CodeMirror-matchingbracket {
  color: var(--ctp-peach) !important;
  text-decoration: underline;
}

.CodeMirror-selectedtext {
  background: var(--ctp-alpha-blue-40);
}

.cm-s-typora-default {
  background-color: var(--ctp-base);
  color: var(--ctp-text);
  line-height: 1.45;
}

.CodeMirror.cm-s-typora-default div.CodeMirror-cursor {
  border-left: 2px solid var(--ctp-rosewater) !important;
}

.cm-s-typora-default .cm-header,
.cm-s-typora-default .cm-property {
  color: var(--ctp-lavender);
}

.cm-s-typora-default .cm-comment,
.cm-s-typora-default .cm-code {
  color: var(--ctp-overlay0);
}

.cm-s-typora-default .cm-string {
  color: var(--ctp-green);
}

.cm-s-typora-default .cm-atom,
.cm-s-typora-default .cm-number {
  color: var(--ctp-peach);
}

.cm-s-typora-default .cm-link {
  color: var(--ctp-blue);
}

.cm-s-typora-default .CodeMirror-activeline-background {
  background: var(--ctp-alpha-surface0-45);
}

#write table {
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
}

#write th,
#write td {
  padding: 8px 12px;
  border: 1px solid var(--ctp-surface0);
}

#write th {
  background: var(--ctp-surface0);
  color: var(--ctp-lavender);
  font-weight: 600;
}

#write tr:nth-child(2n) td {
  background: var(--ctp-alpha-mantle-35);
}

#write pre.md-meta-block {
  background: var(--ctp-mantle);
  color: var(--ctp-subtext0);
  border-bottom: 1px dashed var(--ctp-surface0);
  padding-bottom: 0.6em;
  line-height: 1.6em;
}

.task-list {
  padding-left: 0;
}

.md-task-list-item {
  padding-left: 1.4rem;
  position: relative;
}

.md-task-list-item > input {
  -webkit-appearance: none;
  appearance: none;
  margin-left: -1.48rem;
  margin-top: 0.14rem;
  width: 1.0625rem;
  height: 1.0625rem;
  cursor: pointer;
  vertical-align: middle;
  flex-shrink: 0;
}

.md-task-list-item > input:before {
  content: "";
  display: inline-block;
  box-sizing: border-box;
  width: 1.0625rem;
  height: 1.0625rem;
  vertical-align: middle;
  border-radius: 5px;
  border: 1.5px solid var(--ctp-overlay1);
  background: var(--ctp-mantle);
  box-shadow: inset 0 1px 0 var(--ctp-alpha-surface0-40);
  /* 勿对 background 过渡：已选态 hover 换系统蓝底 + SVG，WebKit 插值会让勾「先缩后弹」 */
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    transform 0.14s ease;
}

.md-task-list-item > input:hover:before {
  border-color: var(--ctp-lavender);
  background: var(--ctp-base);
  box-shadow:
    inset 0 1px 0 var(--ctp-alpha-surface0-45),
    0 0 0 2px var(--ctp-alpha-blue-28);
}

.md-task-list-item > input:active:before {
  transform: scale(0.94);
}

.md-task-list-item > input:focus-visible:before {
  border-color: var(--ctp-lavender);
  box-shadow:
    inset 0 1px 0 var(--ctp-alpha-surface0-45),
    0 0 0 2px var(--ctp-base),
    0 0 0 4px var(--ctp-alpha-blue-38);
}

/* 已选：macOS 对话框风格 — 圆角蓝底 + SVG 白勾 */
.md-task-list-item > input:checked:before,
.md-task-list-item > input[checked]:before {
  content: "";
  font-size: 0;
  line-height: 0;
  letter-spacing: 0;
  text-align: center;
  border: none;
  border-radius: 4px;
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23ffffff' stroke-width='2.85' stroke-linecap='round' stroke-linejoin='round' d='M3.85 8.15 6.9 11.1 12.35 4.55'/%3E%3C/svg%3E")
      center / 72% 72% no-repeat,
    var(--ctp-checkbox-checked);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25);
}

.md-task-list-item > input:checked:hover:before,
.md-task-list-item > input[checked]:hover:before {
  border: none;
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23ffffff' stroke-width='2.85' stroke-linecap='round' stroke-linejoin='round' d='M3.85 8.15 6.9 11.1 12.35 4.55'/%3E%3C/svg%3E")
      center / 72% 72% no-repeat,
    var(--ctp-checkbox-checked-hover);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.28),
    0 0 0 2px var(--ctp-alpha-blue-28);
}

.md-task-list-item > input:checked:focus-visible:before,
.md-task-list-item > input[checked]:focus-visible:before {
  border: none;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.25),
    0 0 0 2px var(--ctp-base),
    0 0 0 4px var(--ctp-alpha-blue-38);
}

.md-task-list-item > input:checked:focus-visible:hover:before,
.md-task-list-item > input[checked]:focus-visible:hover:before {
  border: none;
  background:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23ffffff' stroke-width='2.85' stroke-linecap='round' stroke-linejoin='round' d='M3.85 8.15 6.9 11.1 12.35 4.55'/%3E%3C/svg%3E")
      center / 72% 72% no-repeat,
    var(--ctp-checkbox-checked-hover);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.28),
    0 0 0 2px var(--ctp-base),
    0 0 0 4px var(--ctp-alpha-blue-38);
}

.md-diagram-panel,
#write .md-diagram-panel {
  border: 1px solid var(--ctp-surface0);
  border-radius: 6px;
}

.md-diagram-panel-error {
  color: var(--ctp-red);
}

.md-search-hit {
  background: var(--ctp-alpha-peach-45);
  color: var(--ctp-text);
}

::-moz-selection {
  background: var(--select-text-bg-color);
  color: var(--ctp-text);
}

::selection {
  background: var(--select-text-bg-color);
  color: var(--ctp-text);
}

div.code-tooltip,
.md-hover-tip .md-arrow:after {
  background: var(--ctp-mantle);
  border: 1px solid var(--ctp-surface0);
}

.modal-content {
  background: var(--bg-color);
  border: 1px solid var(--ctp-surface0);
}

.megamenu-content,
.megamenu-opened header {
  background: var(--bg-color);
}

.context-menu,
#spell-check-panel,
#footer-word-count-info {
  background-color: var(--ctp-mantle);
}

.typora-node::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.typora-node::-webkit-scrollbar-thumb {
  background: var(--ctp-alpha-overlay1-55);
  border-radius: 4px;
}

.typora-node::-webkit-scrollbar-thumb:active {
  background: var(--ctp-alpha-overlay2-70);
}

.on-focus-mode .md-end-block:not(.md-focus):not(.md-focus-container) * {
  color: var(--ctp-overlay1) !important;
}

.on-focus-mode .md-focus,
.on-focus-mode .md-focus-container {
  color: var(--ctp-text) !important;
}

.on-focus-mode .md-fences.md-focus .CodeMirror-code > *:not(.CodeMirror-activeline) *,
.on-focus-mode .CodeMirror.cm-s-inner:not(.CodeMirror-focused) * {
  color: var(--ctp-overlay1) !important;
}

.on-focus-mode #typora-source .CodeMirror-code > *:not(.CodeMirror-activeline) * {
  color: var(--ctp-overlay1) !important;
}

${printExportStyles()}
`;
}

/**
 * PDF/打印：保持当前口味背景（--ctp-base），用同一套 palette 变量统一正文与目录字色，
 * 去掉 TOC 等区域在导出时的白底/阴影；不再强制整页改为白纸。
 */
function printExportStyles() {
  return `
@media print {
  html,
  body,
  .typora-export {
    background: var(--ctp-base) !important;
  }

  .typora-export #write {
    background: var(--ctp-base) !important;
    color: var(--ctp-text) !important;
  }

  .typora-export #write h1 {
    color: var(--ctp-lavender) !important;
  }

  .typora-export #write h2 {
    color: var(--ctp-blue) !important;
  }

  .typora-export #write h3 {
    color: var(--ctp-teal) !important;
  }

  .typora-export #write h4 {
    color: var(--ctp-green) !important;
  }

  .typora-export #write h5 {
    color: var(--ctp-peach) !important;
  }

  .typora-export #write h6 {
    color: var(--ctp-pink) !important;
  }

  .typora-export #write a {
    color: var(--ctp-blue) !important;
  }

  .typora-export #write strong,
  .typora-export #write b,
  .typora-export #write th,
  .typora-export #write dt {
    color: var(--ctp-mauve) !important;
  }

  .typora-export #write hr {
    background: var(--ctp-surface0) !important;
  }

  .typora-export #write blockquote {
    color: var(--ctp-subtext1) !important;
    border-left-color: var(--ctp-blue) !important;
    background: var(--ctp-alpha-surface0-40) !important;
  }

  .typora-export #write blockquote ul,
  .typora-export #write blockquote ol {
    margin: 0 !important;
  }

  .typora-export #write blockquote > :last-child {
    margin-bottom: 0 !important;
  }

  .typora-export #write mark {
    background: var(--ctp-alpha-yellow-55) !important;
    color: var(--ctp-mark-fg) !important;
  }

  .typora-export #write code,
  .typora-export #write tt,
  .typora-export #write kbd {
    background: var(--ctp-mantle) !important;
    color: var(--ctp-pink) !important;
    border-color: var(--ctp-surface0) !important;
  }

  .typora-export #write .md-fences {
    background: var(--ctp-mantle) !important;
    color: var(--ctp-text) !important;
    border-color: var(--ctp-surface0) !important;
  }

  .typora-export #write table th,
  .typora-export #write table td {
    border-color: var(--ctp-surface0) !important;
  }

  .typora-export #write table th {
    background: var(--ctp-surface0) !important;
    color: var(--ctp-lavender) !important;
  }

  .typora-export #write table tr:nth-child(2n) td {
    background: var(--ctp-alpha-mantle-35) !important;
  }

  /* TOC：不要单独白底，字色与正文一致 */
  .typora-export .md-toc,
  .typora-export .md-toc-content,
  .typora-export .md-toc-inner,
  .typora-export .md-toc-tooltip,
  .typora-export div.md-toc-tooltip {
    background: transparent !important;
    background-color: transparent !important;
    box-shadow: none !important;
    border: none !important;
    color: var(--ctp-text) !important;
  }

  .typora-export .md-toc-link,
  .typora-export a.md-toc-inner {
    color: var(--ctp-blue) !important;
  }

  .typora-export * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
}
`;
}

function buildTheme(flavor, p) {
  const title = flavorTitle[flavor];
  const chk = systemCheckboxAccent(flavor);
  const header = `/**
 * Catppuccin ${title} — Typora theme
 * Palette: https://github.com/catppuccin/catppuccin
 * Typora themes: https://theme.typoraio.cn/doc/Write-Custom-Theme/
 *
 * Compatible with Typora 1.13.x on macOS (WebKit): uses rgba() instead of color-mix().
 *
 * Install: copy this file to Typora’s theme folder and choose it under Themes.
 */
`;

  const root = `:root {\n${paletteBlock(p)}\n  --ctp-mark-fg: ${markForeground(flavor, p)};\n  --ctp-checkbox-checked: ${chk.checked};\n  --ctp-checkbox-checked-hover: ${chk.hover};\n${derivedAlphaVars(p)}${typoraRootMappings()}\n}\n`;

  return header + root + commonStyles();
}

for (const flavor of Object.keys(palettes)) {
  const css = buildTheme(flavor, palettes[flavor]);
  const out = path.join(root, `catppuccin-${flavor}.css`);
  fs.writeFileSync(out, css, "utf8");
  console.warn("wrote", path.relative(root, out));
}
