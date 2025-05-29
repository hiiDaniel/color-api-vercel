const express = require('express');
const { getColorFromURL } = require('color-thief-node');

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

// RGB to HEX helper
function rgbToHex([r, g, b]) {
  return (
    '#' +
    [r, g, b]
      .map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

// Required for Vercel
module.exports = app;