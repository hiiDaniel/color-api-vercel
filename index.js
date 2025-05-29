import express from 'express';
import getColors from 'get-image-colors';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3000;

app.get('/colors', async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) {
    return res.status(400).json({ error: 'Missing URL' });
  }

  try {
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();

    const colors = await getColors(buffer, 'image/jpeg'); // or 'image/png'
    const hexColors = colors.map(color => color.hex());

    res.json({
      album_color: hexColors[0],
      album_colors: hexColors
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to extract colors' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});