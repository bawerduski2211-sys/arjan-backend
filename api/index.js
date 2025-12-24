const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const { prompt } = req.body;
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!prompt) return res.status(400).json({ reply: "تکایە پرسیارەکێ بنڤیسە." });
    if (!apiKey) return res.status(500).json({ reply: "کێشە د کلیلێ API دا هەیە." });

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "google/gemini-2.0-flash-exp:free",
                "messages": [
                    { "role": "system", "content": "تو پڕۆفیسۆر ئارجانی، ب زمانێ کوردی بادینی بەرسڤێ بدە." },
                    { "role": "user", "content": prompt }
                ]
            })
        });

        const data = await response.json();
        res.json({ reply: data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ reply: "کێشەیەک د مێشکی دا هەیە." });
    }
});

module.exports = app;
