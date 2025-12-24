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

    if (!prompt) return res.status(400).json({ error: "تکایە پرسیار بنێرە" });
    if (!apiKey) return res.status(500).json({ error: "کلیلێ API بەردەست نینە" });

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://arjan-ai.vercel.app", 
                "X-Title": "Arjan AI"
            },
            body: JSON.stringify({
                "model": "google/gemini-2.0-flash-exp:free",
                "messages": [
                    { "role": "system", "content": "تو پڕۆفیسۆر ئارجانی، شارەزایێ Cyber Security، ب زمانێ کوردی بادینی بەرسڤێ بدە." },
                    { "role": "user", "content": prompt }
                ]
            })
        });

        const data = await response.json();
        if (data.choices && data.choices[0]) {
            // من لێرە کرە 'reply' دا دگەل سکریپتێ تە یێ فۆنتێندێ بگونجیت
            res.json({ reply: data.choices[0].message.content });
        } else {
            res.status(500).json({ error: "بەرسڤ ژ OpenRouter نەهات" });
        }
    } catch (error) {
        res.status(500).json({ error: "کێشەیەک د سێرڤەرێ ئارجان دا هەیە" });
    }
});

module.exports = app;
