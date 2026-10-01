# LTZ博客个人化记录

日期：2026-10-01。

## 使用的公开资料

- 博客：`https://blog.litianzeng.cn`。
- GitHub：`ltz150`；仓库：`ltz150/astro-blog`。
- 写作与发布：Mac、Obsidian、Markdown 与图片、GitHub、Cloudflare Pages。
- 已发布内容：小米 BE6500 实践文章、Obsidian 到 Cloudflare Pages 手动部署指南。

未根据域名推测真实姓名；未发布 IDC 清单中的服务器管理地址、账号或凭据。没有提供真实头像，因此使用本地 LTZ 字母头像。未添加未经提供的邮箱、微信、收款码或备案号。

## 修改范围

1. 把原作者的演示文章移出内容目录，使其不进入首页、分类、标签、RSS、搜索和 sitemap；保留 2 篇自己的文章。
2. 删除页脚作者个人标识、HanAnalytics 推广、原作者备案号及侧栏流量卡广告。
3. 使用自己的名称、字母头像、favicon、GitHub、仓库链接、关于页和上线动态。
4. 默认朋友圈清空；个人链接换成自己的公开主页与仓库；未开放评论的留言页改为仓库 Issues 入口。
5. 动态与视频标识统一读取站点配置；清空原作者的音乐解析服务，移除原作者的评论图片上传服务。
6. 保留根目录 MIT 许可证，并复制到线上 `public/licenses/vhastro-mit.txt`；演示素材存于 `examples/theme-original/`，不发布到网站。

## 以后修改哪里

| 内容 | 文件 |
| --- | --- |
| 名称、头像、简介、公告、导航 | `src/config.ts` |
| 关于我 | `src/pages/about/index.md` |
| 动态日期、标签与正文 | `src/page_data/Talking.ts` |
| 我的链接 | `src/page_data/Link.ts` |
| 页脚 | `src/components/Footer/Footer.astro` |
| 字母头像和站点图标 | `public/assets/images/ltz-avatar.svg` |

换真实头像时，将自己的图片放入 `public/assets/images/`，更新 `Avatar`；favicon 如需独立图标，再修改 Head 组件。新文章仍放入 `src/content/blog/published/`。自己的资料在 `src/` 中维护，不改示例备份。

## 验收项目

- 构建成功；首页、关于、动态、个人链接、两篇文章可访问。
- RSS 与搜索索引只包含自己的 2 篇文章，原主题文章不再生成路由。
- 页脚、侧栏、动态没有原作者的推广链接、个人身份、备案号或收款码。
- 线上仍有且仅有一个 Cloudflare Web Analytics 脚本。
- 原主题许可保留，示例与私人资料不进入 `dist`。
