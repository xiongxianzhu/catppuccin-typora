<h1 align="center">Catppuccin for Typora</h1>

<p align="center">
  <a href="https://typora.io"><img src="https://img.shields.io/badge/Typora-1.13+-3687D9?style=flat-square&logo=typora&logoColor=white" alt="Typora"/></a>
  <a href="https://github.com/catppuccin/catppuccin"><img src="https://img.shields.io/badge/Catppuccin-4%20flavors-cba6f7?style=flat-square&logo=catppuccin&logoColor=white" alt="Catppuccin"/></a>
  <a href="https://www.apple.com/macos/"><img src="https://img.shields.io/badge/macOS-WebKit-89b4fa?style=flat-square&logo=apple&logoColor=white" alt="macOS"/></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/Node-build%20only-a6e3a1?style=flat-square&logo=nodedotjs&logoColor=333" alt="Node.js"/></a>
</p>

<p align="center">简体中文: <a href="README.md">README.md</a> · <b>English</b></p>

<p align="center"><i><a href="https://github.com/catppuccin/catppuccin">Catppuccin</a>-themed <a href="https://typora.io">Typora</a> themes · semitransparent UI uses <code>rgba()</code> for older WebKit (e.g. Typora 1.13.x on macOS) without reliable <code>color-mix()</code></i></p>

---

## Installation

1. **Preferences → Appearance → Open Theme Folder**
2. Copy the `catppuccin-*.css` files into that folder (symlinks are fine for development).
3. Pick a theme under the **Themes** menu (e.g. **Catppuccin Mocha**). To reload CSS after an update, switch to another theme and back, or quit Typora completely and reopen.

| File | Flavor |
|------|--------|
| `catppuccin-mocha.css` | Mocha (default dark) |
| `catppuccin-macchiato.css` | Macchiato |
| `catppuccin-frappe.css` | Frappé |
| `catppuccin-latte.css` | Latte (light) |

## Development

After editing `scripts/generate-themes.mjs`, run from the repo root:

```bash
node scripts/generate-themes.mjs
```

This overwrites all four CSS files. If you only edit a `.css` by hand and do not run the script, your hand-edited file wins. **Building** themes requires **Node.js**; **running** Typora does not.

## PDF / print

For export/print, the page keeps each flavor’s **`base` background** and **`var(--ctp-*)` text colors** (no forced white paper). TOC panels lose the standalone white box and shadow so they match the body.

## References & license

- [Write Custom Theme](https://theme.typora.io/doc/Write-Custom-Theme/) · 中文: [编写自定义主题](https://theme.typoraio.cn/doc/Write-Custom-Theme/)
- [Catppuccin](https://github.com/catppuccin/catppuccin) · [Catppuccin Palette](https://github.com/catppuccin/palette)

You may add your own license file (e.g. MIT) for this repo; naming and palette follow the Catppuccin project.
