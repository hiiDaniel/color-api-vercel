import fetch from 'node-fetch';
import getColors from 'get-image-colors';

export default async function handler(req, res) {
  const imageUrl = req.query.url;
  if (!imageUrl) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  try {
    // fetch the image into a Buffer
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // extract colors, default count is 5
    // v4 signature: getColors(buffer, { type })
    const colors = await getColors(buffer, { type: 'image/jpeg' });
    const hexes = colors.map(c => c.hex());

    return res.status(200).json({ colors: hexes });
  } catch (err) {
    console.error('color-extraction-error:', err);
    return res.status(500).json({ error: err.message });
  }
}