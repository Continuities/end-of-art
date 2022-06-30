import { query, type SocialData } from './social-grep';
import { scrape, summarise } from './summarisation';

const getContent = async (posts: Array<SocialData>): Promise<string | null> => {
  for (const { url } of posts) {
    const content = await scrape(url);
    if (content) {
      return content;
    }
  }
  return null;
};

export default async () => {
  const posts = await query({
    endpoint: 'posts',
    after: new Date(Date.now() - 604800000),
    before: new Date(),
    score: 1000
  });
  const articleContent = await getContent(posts);
  if (!articleContent) {
    throw new Error('No scrapable articles found!');
  }

  return summarise(articleContent);
};
