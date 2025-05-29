import getColors from 'get-image-colors';

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'Missing url query parameter' });
  }

  try {
    const palette = await getColors(url);
    const hexes   = await Promise.all(palette.map(c => c.hex()));
    return res.status(200).json({ colors: hexes });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}