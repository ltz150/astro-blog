import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import * as cheerio from 'cheerio';
const root = new URL('../dist/', import.meta.url);
const home = cheerio.load(await readFile(new URL('index.html', root), 'utf8'));
assert.equal(home('.home-feature').length, 0, '首页大图介绍区已移除');
assert.equal(home('.home-topic').length, 0, '首页图片栏目入口已移除');
const articles=await readdir(new URL('article/',root));
for(const article of articles){
  const $=cheerio.load(await readFile(new URL(`article/${article}/index.html`,root),'utf8'));
  assert.equal($('.home-feature').length,0,'文章页不应保留首页大图');
  assert.equal($('aside .article-toc').length,1,'文章左侧应有目录');
  const anchors=$('aside .article-toc a');
  assert.ok(anchors.length>0,'长文章目录应有章节');
  anchors.each((_,a)=>{
    const id=decodeURIComponent($(a).attr('href').slice(1));
    assert.equal($('[id]').filter((_,e)=>$(e).attr('id')===id).length,1,`锚点应对应唯一标题：${id}`);
  });
  assert.equal($('.mobile-toc').length,1,'手机应提供折叠目录');
  for (const a of $('.vh-otarticle a').toArray()) {
    const href = $(a).attr('href');
    if (href === '#') continue;
    for (const suffix of ['', '/']) {
      const target = new URL(href, `https://blog.litianzeng.cn/article/${article}${suffix}`);
      const segments = target.pathname.split('/').filter(Boolean);
      assert.equal(segments.length, 2, '相邻文章链接不能嵌套在当前文章路径下');
      assert.equal(segments[0], 'article');
      assert.ok(articles.includes(segments[1]), '相邻文章必须存在');
    }
  }
}
console.log(`首页简化及 ${articles.length} 篇文章的目录锚点验证通过。`);
