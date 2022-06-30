import Inspiration from './inspiration';
import { generate } from './artist';

(async () => {
  const inspiration = await Inspiration();
  console.log(`Inspired by "${inspiration}"`);
  const art = await generate(inspiration);
  console.log(art);
})();
