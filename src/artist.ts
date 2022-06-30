import fetch from 'node-fetch';

const baseUri = process.env.ART_URI;
if (!baseUri) {
  throw new Error('ART_URI undefined');
}

export const generate = async (prompt: string): Promise<string> => {
  const response = await fetch(baseUri, {
    method: 'POST',
    body: JSON.stringify({
      prompt,
      number_of_images: 4,
      return_only_best: true
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    throw new Error(`Failed to art ${response.status}`);
  }
  const { generated_images: images, generated_images_format: format } =
    (await response.json()) as any;
  return `data:image/${format};base64,${images[0].image}`;
};
