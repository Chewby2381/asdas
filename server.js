const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const YOUR_API_KEY = process.env.API_KEY; // Load from Render env variable

app.post("/proxy", async (req, res) => {
  const promptData = req.body;
  console.log("🔵 Incoming prompt:", JSON.stringify(promptData, null, 2));

  try {
    const response = await axios.post(OPENROUTER_URL, promptData, {
      headers: {
        Authorization: `Bearer ${YOUR_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    res.status(200).json(response.data);
  } catch (err) {
    console.error("❌ Error forwarding request:", err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Proxy server listening on port ${PORT}`);
});
