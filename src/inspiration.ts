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

const SCORE_BRACKETS = [100000, 10000, 1000];
const WINDOW = 1000 * 60 * 60 * 24;

export default async () => {
  for (const bracket of SCORE_BRACKETS) {
    const posts = await query({
      endpoint: 'posts',
      after: new Date(Date.now() - 2 * WINDOW),
      before: new Date(Date.now() - WINDOW),
      score: bracket
    });

    const articleContent = await getContent(posts);
    console.log(articleContent);
    if (articleContent) {
      return summarise(articleContent);
    }
  }

  throw new Error('No scrapable articles found!');
};
