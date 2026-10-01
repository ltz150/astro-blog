const bannerImages = {
  desktop: '/assets/images/home-banner-desktop-5ada882f.webp',
  mobile: '/assets/images/home-banner-mobile-5ef2e754.webp'
};

export default {
  // 网站标题
  Title: 'LTZ博客',
  // 网站地址
  Site: 'https://blog.litianzeng.cn',
  // 网站副标题
  Subtitle: '记录生活与技术。',
  // 网站描述
  Description: '记录技术实践、学习笔记与日常。',
  // 网站作者
  Author: 'ltz150',
  // 作者头像
  Avatar: '/assets/images/ltz-avatar.svg',
  // 网站座右铭
  Motto: '写下所学，记录日常。',
  // Cover 网站缩略图
  Cover: bannerImages.desktop,
  // 网站侧边栏公告 (不填写即不开启)
  Tips: '<p>欢迎来到 LTZ博客。</p><p>这里记录技术实践、学习笔记与日常，内容持续更新。</p>',
  // 首页打字机文案列表
  TypeWriteList: [
    '写下所学，记录日常。',
  ],
  // 网站创建时间
  CreateTime: '2026-09-30',
  // 顶部 Banner 配置
  HomeBanner: {
    enable: true,
    // 首页高度
    HomeHeight: '38.88rem',
    // 其他页面高度
    PageHeight: '28.88rem',
    // 背景
    background: `url('${bannerImages.desktop}') no-repeat center 60%/cover`,
    // 移动端单独裁剪压缩；同一份路径用于背景和预加载。
    images: bannerImages,
  },
  // 博客主题配置
  Theme: {
    // 颜色请用 16 进制颜色码
    // 主题颜色
    "--vh-main-color": "#01C4B6",
    // 字体颜色
    "--vh-font-color": "#34495e",
    // 侧边栏宽度
    "--vh-aside-width": "318px",
    // 全局圆角
    "--vh-main-radius": "0.88rem",
    // 主体内容宽度
    "--vh-main-max-width": "1458px",
  },
  // 导航栏 (新窗口打开 newWindow: true)
  Navs: [
    // 仅支持 SVG 且 SVG 需放在 public/assets/images/svg/ 目录下，填入文件名即可 <不需要文件后缀名>（封装了 SVG 组件 为了极致压缩 SVG）
    // 建议使用 https://tabler.io/icons 直接下载 SVG
    { text: '文章', link: '/archives', icon: 'Nav_archives' },
    { text: '动态', link: '/talking', icon: 'Nav_talking' },
    { text: '我的链接', link: '/links', icon: 'Nav_link' },
    { text: '关于', link: '/about', icon: 'Nav_about' },
  ],
  // 侧边栏个人网站
  WebSites: [
    // 仅支持 SVG 且 SVG 需放在 public/assets/images/svg/ 目录下，填入文件名即可 <不需要文件后缀名>（封装了 SVG 组件 为了极致压缩 SVG）
    // 建议使用 https://tabler.io/icons 直接下载 SVG
    { text: 'GitHub', link: 'https://github.com/ltz150', icon: 'WebSite_github' },
  ],
  // 侧边栏展示
  AsideShow: {
    // 是否展示个人网站
    WebSitesShow: true,
    // 是否展示分类
    CategoriesShow: true,
    // 是否展示标签
    TagsShow: true,
    // 是否展示推荐文章
    recommendArticleShow: true
  },
  // DNS预解析地址
  DNSOptimization: [],
  // 博客音乐组件解析接口（填写自己的服务地址；留空时不启用）
  vhMusicApi: '',
  // 评论组件（只允许同时开启一个）
  Comment: {
    // Twikoo 评论
    Twikoo: {
      enable: false,
      envId: ''
    },
    // Waline 评论
    Waline: {
      enable: false,
      serverURL: ''
    }
  },
  // Google 广告
  GoogleAds: {
    ad_Client: '', //ca-pub-xxxxxx
    // 侧边栏广告(不填不开启)
    asideAD_Slot: `<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-xxxxxx" data-ad-slot="xxxxxx" data-ad-format="auto" data-full-width-responsive="true"></ins>`,
    // 文章页广告(不填不开启)
    articleAD_Slot: `<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-xxxxxx" data-ad-slot="xxxxxx" data-ad-format="auto" data-full-width-responsive="true"></ins>`
  },
  // 文章内赞赏码
  Reward: {
    // 支付宝收款码
    AliPay: '',
    // 微信收款码
    WeChat: ''
  },
  // 访问网页 自动推送到搜索引擎
  SeoPush: {
    enable: false,
    serverApi: '',
    paramsName: 'url'
  },
  // 页面阻尼滚动速度
  ScrollSpeed: 666
}
