import fetch from 'node-fetch';

const baseUri = process.env.ART_URI;
if (!baseUri) {
  throw new Error('ART_URI undefined');
}

export const generate = async (text: string): Promise<string> => {
  throw new Error('Unimplemented');
  // const response = await fetch(baseUri, {
  //   method: 'POST',
  //   body: JSON.stringify({ article: text }),
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // });
  // if (!response.ok) {
  //   throw new Error(`Failed to art ${response.status}`);
  // }
  // return response.text();
};
