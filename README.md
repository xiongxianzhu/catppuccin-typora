<h1 align="center">Catppuccin for Typora</h1>

<p align="center">
  <a href="https://typora.io"><img src="https://img.shields.io/badge/Typora-1.13+-3687D9?style=flat-square&logo=typora&logoColor=white" alt="Typora"/></a>
  <a href="https://github.com/catppuccin/catppuccin"><img src="https://img.shields.io/badge/Catppuccin-4%20flavors-cba6f7?style=flat-square&logo=catppuccin&logoColor=white" alt="Catppuccin"/></a>
  <a href="https://www.apple.com/macos/"><img src="https://img.shields.io/badge/macOS-WebKit-89b4fa?style=flat-square&logo=apple&logoColor=white" alt="macOS"/></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/Node-build%20only-a6e3a1?style=flat-square&logo=nodedotjs&logoColor=333" alt="Node.js"/></a>
</p>

<p align="center"><b>简体中文</b> · English: <a href="README.en.md">README.en.md</a></p>

<p align="center"><i>基于 <a href="https://github.com/catppuccin/catppuccin">Catppuccin</a> 的 <a href="https://typora.io">Typora</a> 主题 · 半透明与选区使用 <code>rgba()</code>，以兼容旧版 WebKit（如 macOS 上 Typora 1.13.x）对 <code>color-mix()</code> 支持不足的情况</i></p>

---

## 安装

1. 打开 Typora：**偏好设置 → 外观 → 打开主题文件夹**
2. 将 `catppuccin-*.css` 复制到该目录（可用符号链接便于本地开发）
3. 在菜单 **主题** 中任选一款（如 **Catppuccin Mocha**）。若已选中该主题后仍要刷新 CSS，可先切换到其他主题再切回，或完全退出 Typora 后重新打开。

| 文件 | 口味 |
|------|------|
| `catppuccin-mocha.css` | Mocha（默认深色） |
| `catppuccin-macchiato.css` | Macchiato |
| `catppuccin-frappe.css` | Frappé |
| `catppuccin-latte.css` | Latte（浅色） |

## 开发

修改 `scripts/generate-themes.mjs` 后，在仓库根目录执行：

```bash
node scripts/generate-themes.mjs
```

将重新生成上述四个 CSS。若只手工编辑某个 `.css` 而不运行脚本，则以手工文件为准。**生成**需要本机安装 **Node.js**；**使用** Typora 主题不需要 Node。

## PDF / 打印

导出 PDF 或打印时，沿用当前口味的 **`base` 背景**与同一套 **`var(--ctp-*)` 文字颜色**，不会整页强制改为白纸。目录（TOC）在导出时去除单独白底与阴影，与正文一致。

## 参考与许可

- [编写自定义主题](https://theme.typoraio.cn/doc/Write-Custom-Theme/) · [Write Custom Theme](https://theme.typora.io/doc/Write-Custom-Theme/)（English）
- [Catppuccin](https://github.com/catppuccin/catppuccin) · [Catppuccin Palette](https://github.com/catppuccin/palette)

Catppuccin 名称与配色规范见 [Catppuccin](https://github.com/catppuccin/catppuccin)；本仓库可自行补充许可文件（如 MIT）。
