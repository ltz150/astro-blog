# 侧栏 AI / 云服务广告位实施计划

> **For agentic workers:** Use subagent-driven-development to implement the component, followed by source and browser review. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** 保留当前三列首页，在侧栏加入可配置的单个商家推广卡。

**Architecture:** 新增独立 Astro 静态组件，复用侧栏白卡容器。配置中的开关与推广链接决定是否渲染，不关联 AdSense，不加载商家脚本。没有个人推广链接时正式站点保持关闭，本地预览明确说明不产生佣金。

**Tech Stack:** Astro 5、TypeScript、LESS、现有 vhAstro 主题。

---

## 文件与执行步骤

- [x] 创建 `src/components/SidebarSponsor/SidebarSponsor.astro`、`SidebarSponsor.less`。组件接收以下配置，图片可为空；无图片时展示文字广告。

```ts
interface Campaign {
  enable: boolean;
  brand: string;
  title: string;
  description: string;
  href: string;
  buttonText: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
}
```

- [x] 修改 `src/config.ts`，新增 `SidebarSponsor`，初始 `enable: false`、`brand/title/href/image` 均为空、图片默认宽高为 300 / 600。使用开关和有效 HTTPS / HTTP 链接控制整卡显示。广告链接包含 `target="_blank"`、`rel="sponsored noopener noreferrer"`、`data-no-swup`。
- [x] 修改 `src/components/Aside/Aside.astro`，导入组件，在推荐文章之后插入 `<SidebarSponsor campaign={SITE_CONFIG.SidebarSponsor} />`。广告正常滚动，文章目录单独吸顶。桌面纵卡，888px 以下紧凑展示，图片保留真实比例且懒加载。
- [x] 本地临时配置阿里云示例并传入 `preview={true}`，预览文字须显示“不产生佣金”。构建后检查广告外链、图片尺寸、桌面三列与手机布局，保存截图到仓库外的 `outputs/sidebar-ad-2026-10-03/`；随后恢复空配置与正式调用。
- [x] 写 `docs/sidebar-sponsor-guide.md`，记录阿里云官方申请入口、推广链接获取步骤、素材路径及填写配置的例子，不写虚构折扣、返佣承诺或推广 ID。
- [x] 最终构建及检查：

```sh
node node_modules/astro/astro.js build
node tests/home-and-toc.mjs
node tests/article-card-image-link.mjs
node tests/reading-stats.mjs
git diff --check
```

预期：构建成功，既有文章、目录、图片跳转及阅读统计检查通过。最终构建中没有示例广告、未出现新广告脚本、没有空广告白卡。

## 接入边界

用户没有联盟账号，已选择先推荐申请方案。广告位可以做好；正式商家接入需用户本人完成联盟注册 / 实名认证，并提供自己的公开推广链接。该链接是订单归属的依据，普通官网链接不能代替。拿到链接与商家授权素材后才开启正式广告；申请成功或展示广告均不等于一定产生收入。
