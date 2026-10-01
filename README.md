# LTZ博客

ltz150 的个人博客，记录技术实践、学习笔记与日常。

- 网站：https://blog.litianzeng.cn
- GitHub：https://github.com/ltz150
- 仓库：https://github.com/ltz150/astro-blog

## 本地运行

使用 Node.js 24 和 pnpm 10.11.0：

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm build
```

## 内容发布

在 Obsidian 中写作，把要公开的文章和图片复制到 `src/content/blog/published/`，然后 Commit 并 Push 到 `main`。Cloudflare Pages 自动构建 `dist` 并更新网站。

- [手动部署指南](src/content/blog/published/obsidian-astro-cloudflare-pages/index.md)
- [性能优化与统计配置](docs/performance.md)
- [个人资料与主题演示清理记录](docs/personalization.md)

## 修改个人资料

站点名称、作者、头像、公告和导航在 `src/config.ts`；关于页在 `src/pages/about/index.md`；动态在 `src/page_data/Talking.ts`；个人链接在 `src/page_data/Link.ts`。

没有配置自己的评论服务、音乐接口或收款码时，保持对应功能关闭。Cloudflare Web Analytics 由 Pages 注入统计脚本。

## 主题来源与许可

基于 [vhAstro-Theme](https://github.com/uxiaohan/vhAstro-Theme) 和 Astro 构建。原主题 MIT 许可证及版权声明保留在 `LICENSE`，并随网站发布为 `/licenses/vhastro-mit.txt`。

原主题演示文章和个人推广素材存于 `examples/theme-original/`，不参与网站构建。
