# 本地测试文章预览

测试文章：`src/content/blog/published/xiaomi-be6500-ssh-shellcrash/index.md`。

本地地址：<http://127.0.0.1:4321/article/xiaomi-be6500-ssh-shellcrash/>。

## 运行

使用 Node **24.18.0**、pnpm **10.11.0**。版本已记录在 `.node-version` 与 `package.json`，依赖沿用现有 lockfile。

在仓库目录执行：

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm preview --host 127.0.0.1 --port 4321
```

如果本机尚未配置以上版本，可用本次已验证的临时运行方式：

```sh
npx --yes --package=node@24.18.0 --package=pnpm@10.11.0 -- node -e 'require("node:child_process").execFileSync("pnpm", ["install", "--frozen-lockfile"], {stdio:"inherit",env:{...process.env,CI:"true"}})'
npx --yes --package=node@24.18.0 --package=pnpm@10.11.0 -- node -e 'require("node:child_process").execFileSync("pnpm", ["build"], {stdio:"inherit"})'
npx --yes --package=node@24.18.0 --package=pnpm@10.11.0 -- node -e 'require("node:child_process").execFileSync("pnpm", ["preview", "--host", "127.0.0.1", "--port", "4321"], {stdio:"inherit"})'
```

修改文章后，需要重新构建；`preview` 展示的是 `dist` 中的静态产物。

## 本轮验证与导入规则

Cloudflare Worker 已绑定 `blog.litianzeng.cn`，正式域名等待 Git 构建完成后更新。
Cloudflare GitHub App 已重新连接仓库；后续合并到 `main` 会触发生产构建。

- 2026-09-30 完整构建通过，共 58 个页面。
- 首页、文章页和 BE6500 搜索结果可访问；8 个代码块保留。
- 桌面与 390px 手机宽度下页面不横向溢出，长代码可在代码框内横向滚动，浏览器未报告脚本错误。
- Obsidian 原文保持不变，测试副本使用交互式密码设置说明与通用电脑路径、配置文件名。
- 日历日期使用 `YYYY-MM-DD`，避免主题的 UTC 显示使东八区零点变成前一天。
- 正文时间使用行内代码，带端口的网址使用描述性链接文字，避免主题 directive 插件误解析冒号后的数字。
- 该文章没有图片，只包含视频链接。此轮不证明 Obsidian 图片转换与上传可用。

本地测试使用分支 `codex/obsidian-test-article`。GitHub 发布结果以远端 `main` 分支为准。`Site` 配置只是站点网址配置；将代码推送到 GitHub 后，还需要 Cloudflare 构建部署才能更新正式域名。

正式发布前还需接通生产分支、Cloudflare 构建与域名对应的部署项目，并处理主题示例文章、默认推广区和阅读时长统计。文章中的路由器指令在本轮均未执行，其历史操作结果也未重新验证。
