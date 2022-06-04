import fetch from 'node-fetch';

const DEBUG = true;
const debug = (...args) => DEBUG && console.log(...args);

const token = process.env.SOCIALGREP_TOKEN;
const uri = process.env.SOCIALGREP_URI;
if (!token) {
  throw new Error('SOCIALGREP_TOKEN undefined');
}
if (!uri) {
  throw new Error('SOCIALGREP_URI undefined');
}

type Endpoint = 'posts' | 'comments';
type QueryParams = {
  endpoint: Endpoint;
  before: Date;
  after: Date;
  score: number;
};

const dateParam = (date: Date) => date.toISOString().slice(0, 10);

export const query = async ({ endpoint, before, after, score }: QueryParams) => {
  const queryUri = `${uri}/search/${endpoint}?query=%2Fr%2Fnews%2Cafter%3A${dateParam(
    after
  )}%2Cbefore%3A${dateParam(before)}%2Cscore%3A${score}`;
  debug('Querying', queryUri);
  const response = await fetch(queryUri, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error(`Query failed ${response.status}`);
  }
  return response.json();
};
