import express from 'express';
import getColors from 'get-image-colors';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3000;

app.get('/dominant', async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) {
    return res.status(400).json({ error: 'Missing URL' });
  }

  try {
    // fetch the image into a buffer
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();

    // extract dominant color
    const colors = await getColors(buffer, 'image/jpeg'); // adjust MIME if needed
    const dominantHex = colors[0].hex();

    // return under the field your Worker expects
    res.json({ album_color: dominantHex });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to extract color' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});