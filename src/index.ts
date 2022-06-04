import { query } from './social-grep';

query({
  endpoint: 'posts',
  after: new Date(Date.now() - 604800000),
  before: new Date(),
  score: 1000
}).then(console.log);
