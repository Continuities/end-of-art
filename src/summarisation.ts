import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

const USE_INNERTEXT = true;

const baseUri = process.env.SUMMARISE_URI;
if (!baseUri) {
  throw new Error('SUMMARISE_URI undefined');
}

export const scrape = async (uri: string): Promise<string | null> => {
  const response = await fetch(uri);
  if (!response.ok) {
    console.error('Failed to fetch', uri, response.status);
    return null;
  }
  const text = await response.text();
  const doc = parse(text);

  const article = doc.getElementsByTagName('article')[0];
  const main = doc.getElementsByTagName('main')[0];
  const description = Array.from(doc.getElementsByTagName('meta')).find(
    (t) => t.getAttribute('property') === 'og:description'
  );
  return (article ?? main)?.innerText ?? description?.getAttribute('content');
};

export const summarise = async (text: string): Promise<string> => {
  const response = await fetch(baseUri, {
    method: 'POST',
    body: JSON.stringify({ article: text }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    throw new Error(`Failed to summarise ${response.status}`);
  }
  return ((await response.json()) as any).summary;
};
