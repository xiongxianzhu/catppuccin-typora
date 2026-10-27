# AGENTS.md

## 项目概览

本仓库提供适用于 Typora 的 Catppuccin 主题，覆盖 Mocha、Macchiato、Frappé 和 Latte 四种口味。

- 运行时产物是仓库根目录下的四个 `catppuccin-*.css` 文件。
- 唯一生成源是 `scripts/generate-themes.mjs`，使用 Node.js 内置模块，不依赖第三方包。
- 主题面向 macOS 上的 Typora 1.13.x/WebKit，并兼顾 Typora 编辑、源码、Mermaid、PDF 和打印界面。
- 用户安装主题时不需要 Node.js；Node.js 只用于生成 CSS。

## 仓库结构

- `scripts/generate-themes.mjs`：颜色表、派生透明色、通用样式、打印样式和四口味生成逻辑。
- `catppuccin-mocha.css`：Mocha 深色主题，生成文件。
- `catppuccin-macchiato.css`：Macchiato 深色主题，生成文件。
- `catppuccin-frappe.css`：Frappé 深色主题，生成文件。
- `catppuccin-latte.css`：Latte 浅色主题，生成文件。
- `README.md`：默认简体中文使用文档。
- `README.en.md`：与中文 README 对应的英文文档。
- `llms.txt`：面向 LLM 和工具的仓库索引。
- `.cursor/rules/git-workflow.mdc`：分支和 Conventional Commits 约定。

## 环境与生成命令

仓库没有 `package.json`，无需安装依赖。确保系统能直接执行 `node`。

```bash
node --check scripts/generate-themes.mjs
node scripts/generate-themes.mjs
```

生成命令会覆盖全部四个 `catppuccin-*.css` 文件。除非用户明确要求只维护手写 CSS，否则不要直接修改生成文件；应修改 `scripts/generate-themes.mjs` 后重新生成。

## 开发工作流

1. 修改 `scripts/generate-themes.mjs` 中的 palette、辅助函数或样式模板。
2. 运行 `node --check scripts/generate-themes.mjs` 检查 JavaScript 语法。
3. 运行 `node scripts/generate-themes.mjs` 同步生成四套 CSS。
4. 检查差异，确认四种口味都发生了预期变化，且没有无关重排。
5. 运行 `git diff --check` 检查空白和补丁格式。

修改前先运行 `git status --short --branch`。工作区可能包含用户尚未提交的修改，必须保留并避免覆盖无关变更。

## 测试与验收

仓库目前没有自动化测试、lint 配置或 CI。每次样式变更至少执行：

```bash
node --check scripts/generate-themes.mjs
node scripts/generate-themes.mjs
git diff --check
```

涉及生成逻辑时，应再次运行生成命令并确认第二次运行不再产生额外差异。

视觉变更应尽可能在 Typora 中人工检查：

- Mocha、Macchiato、Frappé 三套深色主题和 Latte 浅色主题。
- 标题、正文、链接、列表、引用、表格、任务列表和选区。
- 行内代码、代码块、CodeMirror 光标及语法着色。
- Mermaid 图中的背景、节点、文字、连线和注释对比度。
- PDF/打印预览中的页面背景、正文、代码块、表格和目录。

主题文件更新后，Typora 可能需要切换到其他主题再切回，或完全退出后重开。不要在未获用户明确授权时修改其 Typora 主题目录。

## 代码与样式规范

- JavaScript 使用两个空格缩进、双引号和分号，保持现有 ESM 风格。
- CSS 由模板生成，选择器和属性排版应与附近代码一致。
- 颜色优先引用 `--ctp-*` 自定义属性，不在通用样式中重复写口味专属色值。
- 需要透明度时，通过 `derivedAlphaVars()` 预计算 `rgba()`；不要改用 `color-mix()`，以免破坏旧版 WebKit 兼容性。
- 口味差异应由 palette 或明确的 flavor 条件表达，避免复制四份逻辑。
- 主题文件名必须保持小写 ASCII：`catppuccin-<flavor>.css`。
- 修改应小而聚焦，不顺带重构无关选择器或重新格式化整份生成文件。
- 注释和项目文档默认使用简体中文；修改用户文档的共同内容时，同步更新 `README.md` 与 `README.en.md`。

## Typora 特有注意事项

- Typora 依赖自己的 DOM、CodeMirror 类名和 CSS 变量；修改选择器前先核对实际结构或内置主题实现。
- `--mermaid-theme` 使用 Typora 支持的值：深色口味为 `night`，Latte 为 `default`。
- 编辑器中的语法 token（如 `.cm-error`）可能由语言解析器宽松或严格地标记，不要用大面积背景色掩盖代码可读性。
- 打印规则集中在 `printExportStyles()`；屏幕样式发生语义变化时，检查是否需要同步打印样式。
- `@media print` 下的 `.typora-export` 需要保留当前口味背景与 Catppuccin 色板，不要默认强制白底。

## 构建与发布

本项目没有打包或部署步骤。发布内容就是四个生成后的 CSS、文档和许可文件。

安装验证方式：将需要的 `catppuccin-*.css` 复制到 Typora 的主题目录，通过 Typora 菜单选择主题。不要把本机主题目录或其他机器相关路径提交到仓库。

## Git 与 Pull Request 约定

- 分支名使用 `feat/<功能名>`、`fix/<问题描述>` 或 `docs/<主题>`。
- Commit 使用 Conventional Commits，例如 `fix: 修复 Mermaid 深色模式对比度`。
- 提交描述默认使用简体中文。
- 用户明确调用 `git-commit` Skill 时，提交当前任务相关改动后推送当前分支。
- 不得对 `.gitignore` 忽略的目录或文件执行 `git add`；忽略规则只防未被追踪的文件，显式 `add` 会绕过忽略。
- 当前分支没有上游时，将上游设置为 `origin` 的同名分支后推送。
- 提交或发起 PR 前运行本文件列出的全部程序化检查，并说明无法自动验证的 Typora 视觉场景。
- PR 应说明修改了生成源的哪个部分，以及四套生成 CSS 是否已经同步。
- 除非用户明确要求，不要自行 commit、push、创建分支或修改远程仓库状态。

## 安全与依赖

- 仓库不需要密钥、环境变量、数据库或网络服务。
- 不要提交 `.env`、日志、临时文件、编辑器配置或系统生成文件。
- 引入第三方依赖前必须说明必要性；当前生成器应继续优先使用 Node.js 内置模块。
