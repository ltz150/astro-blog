# LTZ 博客 AdSense 配置

## 已配置

- 发布商：`ca-pub-2366306817378349`。
- 所有页面 head 的 `google-adsense-account` 元标记。
- `public/ads.txt`，发布到 `/ads.txt`。
- 侧边栏广告在推荐文章下面，文章目录上面。

## 下一步

1. AdSense → 网站 → litianzeng.cn，选择元标记验证，验证后申请审核。
2. 当前根域名曾返回旧 Vercel 404；需先确认根域名用途，再让首页及 `/ads.txt` 指向博客。不能仅凭博客可访问宣称根域名验证完成。
3. 在 AdSense「广告 → 按广告单元」创建展示广告，使用自己的广告单元。
4. 将生成代码中的 `<ins class="adsbygoogle" ...></ins>` 放入 `src/config.ts` 的 `GoogleAds.asideAD_Slot` 模板字符串。`data-ad-client` 必须与上方发布商相同，`data-ad-slot` 必须为真实广告单元 ID。不要重复粘贴外部 script 或 push 脚本，主题负责加载和初始化。
5. 构建、提交、推送；Cloudflare 自动部署后核对。

当前广告单元留空，因此不加载广告脚本、不显示空广告卡片。元标记验证不等于 Google 审核通过；广告展示和收入以 AdSense 账户状态为准。不开启自动广告，以保留指定广告位置。

官方说明：https://support.google.com/adsense/answer/7584263?hl=zh-Hans
