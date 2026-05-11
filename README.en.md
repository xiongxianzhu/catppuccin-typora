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
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/Node.js-build%20only-a6e3a1?style=for-the-badge&logo=nodedotjs&logoColor=d9e0ee&colorA=363a4f&colorB=a6e3a1" alt="Node.js"/></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-b7bdf8?style=for-the-badge&logoColor=d9e0ee&colorA=363a4f&colorB=b7bdf8" alt="MIT"/></a>
</p>

<p align="center"><a href="README.md">简体中文</a> · <b>English</b></p>

> [Catppuccin](https://github.com/catppuccin/catppuccin) pastel palettes for [Typora](https://typora.io). Semitransparent UI uses precomputed <code>rgba()</code> so older WebKit builds (e.g. Typora **1.13.x** on macOS) stay predictable—no reliance on <code>color-mix()</code>.

<br/>

## Installation

Drop the CSS files into Typora’s theme folder, then pick one from the menu.

1. **Preferences → Appearance → Open Theme Folder**
2. Copy `catppuccin-*.css` from this repo root (symlinks welcome for local dev)
3. **Themes** → e.g. **Catppuccin Mocha**. To pick up CSS changes, switch themes or quit Typora completely and reopen (**Cmd + Q** on macOS)

|   | File | Flavor |
|:-:|------|--------|
| 🌿 | `catppuccin-mocha.css` | **Mocha** · default dark |
| 🌺 | `catppuccin-macchiato.css` | **Macchiato** |
| 🪴 | `catppuccin-frappe.css` | **Frappé** |
| 🌻 | `catppuccin-latte.css` | **Latte** · light |

## Development

All four flavors are emitted from one script—edit **`scripts/generate-themes.mjs`** for palette or structure.

```bash
node scripts/generate-themes.mjs
```

Overwrites every CSS file. Hand-edited `.css` wins if you skip the script. **Node.js** is only needed to **build**; **writing** in Typora does not need it.

## PDF / print

Export keeps each flavor’s **`base` surface** and **`var(--ctp-*)`** typography—no forced white paper. **TOC** panels lose the floating white card look so they match the body.

## References

- [Write Custom Theme](https://theme.typora.io/doc/Write-Custom-Theme/) · 中文: [编写自定义主题](https://theme.typoraio.cn/doc/Write-Custom-Theme/)
- [Catppuccin](https://github.com/catppuccin/catppuccin) · [Catppuccin Palette](https://github.com/catppuccin/palette)
- [llms.txt](llms.txt) — curated index for LLMs/tools ([format](https://llmstxt.org/))

<br/>

<p align="center">
  <img src="https://raw.githubusercontent.com/catppuccin/catppuccin/main/assets/footers/gray0_ctp_on_line.svg?sanitize=true" width="85%" alt=""/>
</p>

## License

**Typora theme CSS** (`catppuccin-*.css`) and the **build script** (`scripts/generate-themes.mjs`) are released under the **[MIT License](LICENSE)**. Full text is in `LICENSE` at the repo root.

The **Catppuccin** name and palette follow the [Catppuccin](https://github.com/catppuccin/catppuccin) community guidelines.
