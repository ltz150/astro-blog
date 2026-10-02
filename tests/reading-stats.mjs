import assert from 'node:assert/strict';
import { remarkNote } from '../src/plugins/markdown.custom.ts';

const paragraph = { type: 'paragraph', children: [{ type: 'text', value: '中文测试 hello world' }] };
for (const children of [
  [paragraph],
  [paragraph, { type: 'containerDirective', name: 'note', attributes: {}, children: [] }],
]) {
  const data = { astro: { frontmatter: {} } };
  remarkNote()({ type: 'root', children }, { data });
  assert.equal(data.astro.frontmatter.article_word_count, 6, '中文逐字、英文按词统计，普通 Markdown 和组件文章都应生效');
  assert.equal(data.astro.frontmatter.reading_time, 6 / 200);
}
console.log('普通 Markdown 与组件文章的字数、阅读时间验证通过。');
