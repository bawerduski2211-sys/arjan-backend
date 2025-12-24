const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();

// رێكپێدان ب هەمی ناونیشانان (CORS)
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
                "messages": [{ "role": "user", "content": prompt }]
            })
        });

        const data = await response.json();
        if (data.choices && data.choices[0]) {
            res.json({ text: data.choices[0].message.content });
        } else {
            res.status(500).json({ error: "بەرسڤ نەهات، دبیت کووتا ب دوماهی هاتبیت" });
        }
    } catch (error) {
        res.status(500).json({ error: "کێشەیەک د سێرڤەری دا هەیە" });
    }
});

module.exports = app; 
