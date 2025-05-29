const express = require("express");
const fetch = require("node-fetch");
const ColorThief = require("color-thief");
const { createCanvas, loadImage } = require("canvas");

const app = express();
const colorThief = new ColorThief();

app.get("/dominant", async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) {
    return res.status(400).json({ error: "Missing image URL" });
  }

  try {
    const image = await loadImage(imageUrl);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);

    const rgb = colorThief.getColor(canvas);
    const hex = `#${rgb.map(v => v.toString(16).padStart(2, '0')).join("")}`;
    res.json({ hex });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to extract color." });
  }
});

module.exports = app;