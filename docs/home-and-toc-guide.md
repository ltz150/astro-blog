# LTZ 首页图片与文章目录维护

## 现在的页面

2026-10-02 根据页面批注，首页已取消大图介绍与四张栏目图片入口，导航下方直接显示文章列表。页脚取消「博客源码」与「开源许可」入口，剩余链接配有小图标。

旧的 HomeFeature 组件、配图与配置保留作历史素材，目前没有在页面中显示。文章封面仍沿用现有配置，文章目录继续正常使用。

## 在 Obsidian 写目录

文章正文按层级写标题，例如：

```markdown
## 准备工作
### 安装软件
## 实际操作
### 第一步
## 常见问题
```

正常发布文章即可，目录自动从标题生成，无需手写目录或安装目录插件。网页文章标题由文章头部的 `title` 提供，正文通常从 `##` 开始。

电脑端目录在左侧「推荐文章」下方，滚动后跟随侧栏；点击章节会跳转，当前章节高亮。长目录可在目录区域内滚动。手机端在正文前点击「文章目录」展开。

## 历史配图维护（当前首页未启用）

1. 保留原始生成图，另导出 WebP 网页版本。
2. 桌面大图推荐 3:1，现用 1800 × 600；左侧预留空间给介绍文字。
3. 手机大图推荐 4:5，现用 640 × 800；上方预留空白，下方安排设备。
4. 小图推荐 2:1，现用 640 × 320；避免把文字画入图片。
5. 图片保存在 `public/assets/images/home/`，对应网站路径 `/assets/images/home/文件名.webp`。
6. 修改配置后，按现有 GitHub Desktop 的 Commit → Push 流程发布，等待 Cloudflare Pages 部署成功。

完整生成提示词保存在 `docs/home-image-prompts.json`。可复用的核心描述：

> 3D Apple-inspired minimalist illustration, frosted glass, white ceramic and brushed silver materials, rounded forms, soft studio lighting, subtle shadows, blue-teal palette, clean composition, no text, no watermark. Reserve clear space for website typography.

具体场景替换为文章主题，如路由器、笔记本、云端发布或收藏链接。不同图保持相同材质、光线和色调。图片由内置图像生成工具原创生成，不引用参考站作者的头像或配图。

## 验证方式

构建后运行 `node tests/home-and-toc.mjs` 与 `node tests/article-card-image-link.mjs`，检查首页装饰区已撤下、章节锚点和封面链接。浏览器再核对手机布局、页脚图标、目录点击、滚动高亮以及首页与文章间切换。
