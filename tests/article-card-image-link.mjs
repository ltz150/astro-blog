import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import * as cheerio from 'cheerio';

const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
const $ = cheerio.load(html);
const cards = $('.vh-article-item');

assert.ok(cards.length > 0, '首页至少应包含一张文章卡片');

cards.each((index, card) => {
  const titleLink = $(card).find('h2.title > a').attr('href');
  const coverLink = $(card).find('a.vh-article-banner');
  const image = coverLink.find('img');

  assert.equal(coverLink.length, 1, `第 ${index + 1} 张文章封面应当是一个链接`);
  assert.equal(coverLink.attr('href'), titleLink, `第 ${index + 1} 张封面与标题应指向同一篇文章`);
  assert.ok(coverLink.attr('aria-label'), `第 ${index + 1} 张封面链接应有无障碍名称`);
  assert.ok(image.attr('alt'), `第 ${index + 1} 张封面图片应有替代文本`);
});

console.log(`已验证 ${cards.length} 张文章卡片的封面链接。`);
