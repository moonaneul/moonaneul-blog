import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  if (!context.site) {
    throw new Error('astro.config.mjs에 site 설정이 필요합니다.');
  }

  const posts = (await getCollection('posts'))
    .filter((post) => !post.data.draft)
    .sort(
      (a, b) =>
        b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
    );

  return rss({
    title: 'moonaneul',
    description: '기술과 미디어, 만들고 생각한 것을 기록합니다.',
    site: context.site,

    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/writing/${post.id}/`,
    })),
  });
};