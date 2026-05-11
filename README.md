<h3 align="center">
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/logos/exports/1544x1544_circle.png" width="88" alt="Catppuccin"/><br/>
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="20" width="0" alt=""/>
  <b>Catppuccin for Typora</b><br/>
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/misc/transparent.png" height="12" width="0" alt=""/>
</h3>

<p align="center">
  <a href="https://typora.io"><img src="https://img.shields.io/badge/Typora-1.13+-89b4fa?style=for-the-badge&logo=typora&logoColor=d9e0ee&colorA=363a4f&colorB=89b4fa" alt="Typora"/></a>
  <a href="https://github.com/catppuccin/catppuccin"><img src="https://img.shields.io/badge/Catppuccin-4%20flavors-cba6f7?style=for-the-badge&logo=catppuccin&logoColor=d9e0ee&colorA=363a4f&colorB=cba6f7" alt="Catppuccin"/></a>
  <br/>
  <a href="https://www.apple.com/macos/"><img src="https://img.shields.io/badge/macOS-WebKit-89b4fa?style=for-the-badge&logo=apple&logoColor=d9e0ee&colorA=363a4f&colorB=89b4fa" alt="macOS"/></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/Node.js-仅生成脚本-a6e3a1?style=for-the-badge&logo=nodedotjs&logoColor=d9e0ee&colorA=363a4f&colorB=a6e3a1" alt="Node.js"/></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-b7bdf8?style=for-the-badge&logoColor=d9e0ee&colorA=363a4f&colorB=b7bdf8" alt="MIT"/></a>
</p>

<p align="center"><b>简体中文</b> · <a href="README.en.md">English</a></p>

> 将 [Catppuccin](https://github.com/catppuccin/catppuccin) 的柔和色谱接入 [Typora](https://typora.io)。半透明与选区使用预计算 <code>rgba()</code>，在旧版 WebKit（如 macOS 上 Typora **1.13.x**）上仍表现稳定，而不依赖 <code>color-mix()</code>。

<br/>

## 安装

将主题 CSS 放入 Typora 的主题目录后即可在菜单中选用。

1. **偏好设置 → 外观 → 打开主题文件夹**
2. 复制本仓库根目录下的 `catppuccin-*.css`（开发时可用**符号链接**）
3. 菜单 **主题** 中选择其一（例如 **Catppuccin Mocha**）。更新样式后可先切换到其它主题再切回，或完全退出 Typora 后重开（macOS 上可用 **Cmd + Q**）

|   | 文件 | 口味 |
|:-:|------|------|
| 🌿 | `catppuccin-mocha.css` | **Mocha** · 默认深色 |
| 🌺 | `catppuccin-macchiato.css` | **Macchiato** |
| 🪴 | `catppuccin-frappe.css` | **Frappé** |
| 🌻 | `catppuccin-latte.css` | **Latte** · 浅色 |

## 开发

从单一脚本生成四种口味，修改配色或结构时改 **`scripts/generate-themes.mjs`** 即可。

```bash
node scripts/generate-themes.mjs
```

会覆盖四个 CSS。若只改某个 `.css` 且**不**运行脚本，以手工文件为准。**构建**需本机 **Node.js**；**日常写作**仅需 Typora。

## PDF / 打印

导出沿用当前口味的 **`base` 背景**与同一套 **`var(--ctp-*)`**，不强制整页白纸。目录 **TOC** 在导出时收起独立白底与阴影，与正文一体。

## 参考

- [编写自定义主题](https://theme.typoraio.cn/doc/Write-Custom-Theme/) · [Write Custom Theme](https://theme.typora.io/doc/Write-Custom-Theme/)
- [Catppuccin](https://github.com/catppuccin/catppuccin) · [Catppuccin Palette](https://github.com/catppuccin/palette)
- [llms.txt](llms.txt) — LLM / 工具索引（[llms.txt 规范](https://llmstxt.org/)）

<br/>

<p align="center">
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/footers/gray0_ctp_on_line.svg?sanitize=true" width="85%" alt=""/>
</p>

## 许可

本仓库中的 **Typora 主题 CSS**（`catppuccin-*.css`）与 **构建脚本**（`scripts/generate-themes.mjs`）在 **[MIT License](LICENSE)** 下发布，全文见仓库根目录 `LICENSE`。

**Catppuccin** 名称与配色的使用请遵守 [Catppuccin 社区](https://github.com/catppuccin/catppuccin) 规范。
