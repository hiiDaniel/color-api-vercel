import express from 'express';
import { getColorFromURL } from 'color-thief-node';

const app = express();

app.get('/dominant', async (req, res) => {
  const imageUrl = req.query.url;

  if (!imageUrl) {
    return res.status(400).json({ error: 'Missing URL parameter: url' });
  }

  try {
    const rgb = await getColorFromURL(imageUrl);
    const hex = rgbToHex(rgb);
    res.json({ hex });
  } catch (error) {
    console.error('Error extracting color:', error.message);
    res.status(500).json({ error: 'Failed to extract color', detail: error.message });
  }
});

function rgbToHex(rgb) {
  return (
    '#' +
    rgb.map(x => x.toString(16).padStart(2, '0')).join('')
  );
}

// Required for Vercel's serverless build
export default app;