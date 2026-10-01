---
title: "从 Obsidian 到个人博客：vhAstro-Theme 与 Cloudflare Pages 手动部署指南"
date: "2026-10-01"
updated: "2026-10-01"
id: "obsidian-astro-cloudflare-pages"
categories: "博客搭建"
tags: ["Obsidian", "Astro", "GitHub", "Cloudflare", "故障排查"]
cover: ""
hide: false
recommend: false
top: false
---

在 Mac 上用 Obsidian 写 Markdown，把要公开的文章和图片提交到 GitHub，Cloudflare Pages 就能自动构建并更新博客。

这篇文章记录一次真实搭建过程，也解释为什么代码已经上传，域名却一直显示 `Hello world`。操作以手动点击为主，适合第一次接触 GitHub 和 Cloudflare 的读者。界面名称可能随版本变化，可用括号中的英文名称定位。

## 一、先认识发布流程

```text
Obsidian 写文章
    ↓ 手动复制要公开的 Markdown 和图片
本地博客仓库
    ↓ GitHub Desktop：Commit，再 Push
自己的 GitHub 仓库 main 分支
    ↓ Cloudflare Pages 自动拉取
安装依赖 → Astro 构建 → 发布 dist
    ↓
先检查 pages.dev，再检查自己的博客域名
```

几个容易混淆的概念：

| 名称 | 它负责什么 |
| --- | --- |
| Obsidian | 编辑和管理本地笔记 |
| vhAstro-Theme | 博客样式、文章展示和页面功能 |
| Astro | 把 Markdown 和主题代码生成网页 |
| GitHub | 保存文章、图片、主题和修改历史 |
| Cloudflare Pages | 从 GitHub 拉代码、构建、托管网页 |
| DNS / 自定义域 | 让自己的域名访问正确的托管项目 |

**把文件上传到 GitHub，只完成了源代码保存。**网站更新还要经过构建、部署和域名指向这三步。

本文使用静态输出：构建命令是 `pnpm run build`，输出目录是 `dist`。Cloudflare 的 [Astro 部署指南](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)说明了 Pages 的构建配置与 Git 自动部署方式。

## 二、准备账号和软件

需要准备：

- GitHub 账号，用来保存博客仓库。
- Cloudflare 账号，用来创建 Pages 项目。
- Mac 上的 Obsidian 和 [GitHub Desktop](https://desktop.github.com/)。
- 如需本地预览，安装 [Node.js](https://nodejs.org/) 和 pnpm。
- 可选：自己的域名。没有域名，也可以使用 Pages 提供的 `*.pages.dev` 地址。

本次仓库实测环境为 Node `24.18.0`、pnpm `10.11.0`，并保留了 `pnpm-lock.yaml`。复现本文仓库时使用同样版本；如果换用未来版本的主题，应以那个版本的说明为准。

无需准备服务器、宝塔或数据库。先把文章发布跑通，再按需要添加评论、统计等功能。

## 三、得到自己的主题仓库

### 1. 在 GitHub 复制主题

1. 打开 [uxiaohan/vhAstro-Theme](https://github.com/uxiaohan/vhAstro-Theme)。
2. 点击 **Fork**，将仓库复制到自己的账号下。
3. 将仓库命名为 `astro-blog`，确认创建。
4. 检查新仓库页面的地址，所属账号应是自己的账号。

如果已经有自己的博客仓库，直接使用它，避免重复创建。发布内容时遵守主题仓库的许可证。

**容易踩的坑：**本次检出的主题 README 中，一个标为“Cloudflare Pages 自动部署”的按钮，实际链接包含 `deploy-to-workers`。这会进入 Worker 创建流程。本文从 Cloudflare 控制台手动选择 **Pages → 导入 Git 仓库**，避免入口混淆。这个观察仅对应本次检出的主题版本。

### 2. 用 GitHub Desktop 下载到 Mac

1. 打开 GitHub Desktop，登录 GitHub。
2. 选择 **File → Clone Repository**。
3. 选择自己账号下的 `astro-blog`。
4. 选择本地保存目录，例如 `Documents/Blog/astro-blog`。
5. 点击 **Clone**。

完成后，用 Finder 打开该目录，应该能看到 `package.json`、`src`、`public` 等文件。这是博客仓库根目录。具体界面可参考 [GitHub Desktop 克隆仓库说明](https://docs.github.com/en/desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop)。

已有本地仓库时，在 Desktop 中选择 **File → Add Local Repository** 并选中它，不必再克隆一份。

## 四、修改博客信息

用文本编辑器打开仓库里的 `src/config.ts`，修改已有字段的值。例如：

```ts
Title: '我的博客',
Site: 'https://blog.example.com',
Subtitle: '记录生活与技术。',
Description: '技术实践、学习笔记与日常。',
Author: '你的昵称',
```

这是现有配置的一部分，逐项修改即可，不要用这一小段替换整个文件。暂时没有自定义域时，拿到 Pages 地址后再修改 `Site`。

**`Site` 是生成链接使用的站点地址，不会自动创建 DNS，也不会把域名绑定到 Cloudflare。**

保留配置中的引号、逗号和括号。先关闭还没有配置服务端的评论和统计，再清理不需要的主题示例文章及默认推广内容。

## 五、把 Obsidian 文章放进博客

### 1. 只复制准备公开的内容

先保留现有 Obsidian 笔记库，手动复制一篇文章到博客。不要直接把整个笔记库提交到公开仓库。

本文仓库的文章目录是 `src/content/blog/`。可为每篇文章创建独立文件夹：

```text
astro-blog/
├── src/content/blog/published/
│   └── my-first-post/
│       └── index.md
└── public/images/
    └── my-first-post/
        └── photo.jpg
```

目录名建议使用短英文和连字符。标题可以正常使用中文。

### 2. 给 Markdown 添加文章信息

用 Obsidian 或文本编辑器打开 `index.md`，文件开头填写：

```yaml
---
title: "我的第一篇文章"
date: "2026-10-01"
updated: "2026-10-01"
id: "my-first-post"
categories: "日常"
tags: ["生活", "记录"]
cover: ""
hide: false
recommend: false
top: false
---
```

然后在第二条 `---` 后写正文。当前仓库要求 `title`、`date`、`id`、`categories` 存在；`id` 必须与其他文章不同。本仓库的文章网址使用这个 `id`，例如 `/article/my-first-post/`。

日期采用 `YYYY-MM-DD`，以免带时区的零点日期在主题中显示成前一天。编辑已有文章时，保留 `id`，修改 `updated`。

### 3. 处理图片和内部链接

新手可以先采用 `public/images/文章名/` 存放图片，正文使用标准 Markdown：

```markdown
![照片说明](/images/my-first-post/photo.jpg)
```

`public` 里的文件会按网站根路径提供，所以网址里不写 `public`。检查文件名、大小写和扩展名与实际文件一致。

Obsidian 常用的 `![[photo.jpg]]`、`[[另一篇笔记]]` 和嵌入笔记语法，需要在发布副本中转换、替换或移除，不能默认 Astro 会完整理解。可在 Obsidian **设置 → 文件与链接** 中关闭 **使用 Wikilinks**，让新链接优先使用 Markdown 格式；见 [Obsidian 内部链接说明](https://help.obsidian.md/links)。

跨文章链接可直接使用博客路径：

```markdown
[阅读另一篇文章](/article/another-post/)
```

本次 BE6500 测试文章没有图片，已验证的是正文和代码块发布。上述图片目录是一种手动发布做法，第一次使用时仍需在预览和线上分别打开一张真实图片，确认没有 404。文章与图片放同一个目录也可进一步配置，但不要在未测试转换规则时直接搬迁整个笔记库。

### 4. 可选：在本地检查

打开 Mac 的“终端”，进入博客根目录。下面的路径是示例，应换成自己的实际目录：

```sh
cd ~/Documents/Blog/astro-blog
npx --yes pnpm@10.11.0 install --frozen-lockfile
npx --yes pnpm@10.11.0 dev
```

按终端提示打开本地地址。退出服务时，在终端按 `Control+C`。

想验证正式静态产物时执行：

```sh
npx --yes pnpm@10.11.0 build
npx --yes pnpm@10.11.0 preview
```

`dev` 方便边写边看；`preview` 展示上一次构建的 `dist`。修改文章后，重新 `build` 才能在 `preview` 中看到新内容。

## 六、手动上传到 GitHub

1. 打开 GitHub Desktop，确认当前仓库是自己的 `astro-blog`，分支是 `main`。
2. 查看 **Changes**，确认只有准备公开的文章、图片和必要配置。
3. 在 **Summary** 中填写说明，例如“发布第一篇文章”。
4. 点击 **Commit to main**。
5. 点击 **Push origin**，等待上传完成。
6. 打开 GitHub 网页，检查 `main` 分支确实有刚才的文件和提交。

**Commit 只记录到本机，Push 才上传到 GitHub。**首次操作可能出现 **Publish branch**，按界面提示发布分支。

不要提交 `node_modules`、`dist`、`.env`、访问令牌、私密笔记和电脑上的绝对路径。主题仓库通常已有 `.gitignore`，仍需检查 Desktop 的文件列表。

## 七、从 Cloudflare Pages 手动部署

1. 登录 Cloudflare，进入 **Workers 和 Pages（Workers & Pages）**。
2. 点击 **创建应用程序（Create application）**，找到 **Pages** 入口。
3. 选择 **导入现有 Git 存储库（Import an existing Git repository）**。
4. 连接 GitHub，授权 Cloudflare 访问自己的博客仓库。
5. 选择自己的 `astro-blog`，点击 **开始设置**。

填写以下参数：

| 项目 | 本文使用的值 | 说明 |
| --- | --- | --- |
| 项目名称 | `astro-blog` | Pages 项目名称 |
| 生产分支 | `main` | 发布这个分支的内容 |
| 框架预设 | 无，手动填写 | 也可选 Astro 后核对以下字段 |
| 构建命令 | `pnpm run build` | 执行主题的构建脚本 |
| 构建输出目录 | `dist` | 上传构建出来的网页 |
| 根目录 | 留空，表示仓库根目录 | `package.json` 位于根目录时使用 |

要固定运行环境，可在 **环境变量（高级）** 中设置 `NODE_VERSION=24.18.0`、`PNPM_VERSION=10.11.0`。本次 Pages 首次构建没有手动添加它们，日志显示实际使用了这两个版本；仓库已有 `.node-version` 和 `packageManager` 信息。

点击 **保存并部署（Save and Deploy）**。观察“克隆仓库 → 安装依赖 → 构建 → 上传”的结果，最后必须出现成功状态。

成功后先打开系统给出的 `*.pages.dev` 地址。**用控制台显示的实际地址，不能只根据项目名猜网址。**本次分配的是 `astro-blog-4vw.pages.dev`。

检查首页、测试文章和图片，再配置自定义域。Pages 的 Git 集成会在新的提交推送后自动重建；无需额外配置手写 GitHub Webhook。

### `wrangler.jsonc` 在哪里？需要改吗？

本次主题仓库的 `wrangler.jsonc` 位于根目录，与 `package.json` 同级。它原本配置了 Worker 名称和 `assets.directory`。

本文的 Pages 静态部署用控制台里的构建命令和 `dist` 输出目录，实测保留原有 Worker 配置也完成了 Pages 部署。不要把 Worker 的 `npx wrangler deploy` 填成 Pages 构建命令，也不必为了 Pages 在本机执行 Worker 部署命令。

## 八、绑定自己的博客域名

1. 打开刚部署成功的 **Pages 项目**。
2. 进入 **自定义域（Custom domains）**。
3. 点击 **设置自定义域**。
4. 输入 `blog.example.com`，点击继续。
5. 核对 DNS 记录，再点击 **激活域**。

域名已由同一 Cloudflare 账号管理时，界面会帮助创建 CNAME。例如：

| 类型 | 名称 | 目标 |
| --- | --- | --- |
| CNAME | `blog` | 控制台提供的实际 Pages 主机名 |

若域名在其他 DNS 服务商，需要先在 Pages 添加域，再按提示到服务商创建 CNAME。只在 DNS 中写 CNAME、没有在 Pages 项目关联该域名，可能出现 522。详见 [Pages 自定义域文档](https://developers.cloudflare.com/pages/configuration/custom-domains/)。

激活期间可能暂时不能访问。先确认 Pages 临时地址正常，再等待域名状态和 DNS 生效，不要连续改动多处记录。

## 九、为什么网站一直显示 Hello world？

### 本次看到的事实

- GitHub 已有主题代码和测试文章。
- 本地 Astro 构建成功，生成了 58 个页面。
- 正式域名返回 `Hello world`，响应类型是 `text/plain`。
- 域名绑定的是旧 `astro-blog` Worker，该 Worker 的构建历史一直为空。
- 重新授权 GitHub App、重连仓库和推送提交后，仍未产生 Worker 构建。
- 测试 Deploy Hook 时，Cloudflare 返回 HTTP 500，GitHub 投递记录也显示 500。
- 同一仓库经 Pages 导入后，成功克隆、构建和部署。

这些证据说明：**正式域名仍在提供旧 Worker 的示例响应，博客静态产物尚未部署到该 Worker。**这不证明 Workers 不能部署 Astro；本次 Worker Builds 为何无法启动，Cloudflare 没有提供足够信息，具体内部原因仍未确定。

### 按这个顺序排查

**第 1 步：确认代码真的上传了。**

在 GitHub 网页查看正确仓库的 `main` 分支。新文章、配置和最近提交都应存在。只有本地 Commit，网站不会更新。

**第 2 步：查看 Cloudflare 是否有构建。**

构建记录为空，优先查仓库连接、生产分支、GitHub App 仓库访问权限和触发情况。如果连仓库都没有拉取成功，先不要修改文章或 Astro 配置。

有构建但失败，则打开日志找第一条实质错误：克隆失败查仓库授权，依赖失败查锁文件和版本，Markdown 报错查文章头部和语法，输出目录错误查 `dist`。

**第 3 步：比较临时域名与正式域名。**

如果 `*.pages.dev` 已是博客，而自己的域名仍显示 `Hello world`，检查域名究竟绑定在哪个项目，尤其是否仍被旧 Worker 占用。

只有临时地址和正式地址都已经部署正确、浏览器仍看到旧内容时，再尝试无痕窗口、强制刷新或清缓存。刷新无法替代构建和部署。

### 本次实际解决步骤

1. 进入 **Workers & Pages → 创建应用程序 → Pages → 导入 Git 仓库**。
2. 选择同一份博客仓库，设置 `main`、`pnpm run build`、`dist`。
3. 等待 Pages 部署成功，打开临时地址，确认博客和 BE6500 文章已显示。
4. 在 Pages 添加正式域名。第一次激活提示：`Unable to edit this record as this has been configured as read only.`
5. 回到旧 **Worker → 域（Domains）**，找到该正式域名，在“更多选项”里解除它与旧 Worker 的绑定。
6. 回到 **Pages → 自定义域**，重新添加并激活该域名，让 Pages 创建正确的 CNAME。
7. 等待域名激活，重新检查首页和文章页。

**只在确认该域名属于待替换的旧 Worker、且 Pages 已正常运行时解除绑定。**解除期间域名可能短暂不可访问；这项操作不要求删除整个 Worker 或仓库。只读 DNS 应从管理它的 Worker 域名界面解除，不能强行在 DNS 页面覆盖。

## 十、以后每次如何发布

1. 在 Obsidian 写好文章，选择准备公开的内容。
2. 将发布副本放入博客文章目录，补全头部信息；图片复制到对应目录，检查链接。
3. 可选：本地预览，检查标题、日期、代码和图片。
4. GitHub Desktop 中 **Commit to main → Push origin**。
5. 在 Pages 的 **部署（Deployments）** 中确认最新提交部署成功。
6. 打开正式文章地址，检查正文；有图片时再打开图片链接。

修改文章沿用原来的 `id`，保持网址稳定。发布失败时，旧的成功版本通常仍能访问；先查新构建日志。

本次完成的是 GitHub 到 Pages 的自动构建链路。现有 Obsidian 笔记库到博客仓库仍采用手动复制，尚未做成“点击一次发布”的同步工具。稳定使用几次后，再把“筛选文章、处理图片、转换链接、预览、提交推送”封装成一个发布动作会更容易验证。

## 十一、方案的优缺点与后续优化

| 方面 | 实际取舍 |
| --- | --- |
| 内容可迁移 | Markdown、图片和主题都在文件与 Git 中，容易备份和搬家 |
| 运维 | 静态博客省去服务器和数据库维护，构建日志可追踪 |
| 发布速度 | 写作后提交推送，Cloudflare 接手构建；每次仍要等待构建完成 |
| Obsidian 兼容 | 普通 Markdown 容易发布，双链、嵌入和附件路径需处理 |
| 主题升级 | 可以更新，但应先预览，避免覆盖个人配置和文章 |
| 动态功能 | 评论、登录、实时互动等需单独配置服务 |

优化顺序建议是：先清理示例内容和默认推广区，再验证一篇带真实本地图片的文章，然后固定 Obsidian 的发布目录和链接规则，最后实现一键发布。纯博客无需为了“有服务器”而增加服务器环节。

## 十二、上线验收清单

本次在 2026-10-01 实测：Pages 临时地址、正式域名首页和 BE6500 文章页均返回 HTTP 200，页面标题正确，正式域名已不再显示 `Hello world`。首次 Pages 构建成功生成 58 页。带图片的 Obsidian 导入仍需单独测试。

- [ ] GitHub `main` 有当前文章和必要图片。
- [ ] Pages 最新部署对应当前提交，状态成功。
- [ ] Pages 临时地址能打开首页和文章。
- [ ] 自定义域关联到这个 Pages 项目。
- [ ] 正式域名显示博客首页，不再显示旧示例响应。
- [ ] 文章标题、日期、代码块正常；有图片则没有 404。
- [ ] 再推送一次文章修改，能看到自动产生的新部署和线上变化。

把“文章在 GitHub”“构建成功”“域名能打开”“更新自动生效”分别检查，才能确认整条发布流程跑通。
