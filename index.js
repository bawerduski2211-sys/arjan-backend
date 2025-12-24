const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors'); // بۆ چارەسەرکرنا کێشەیا گەهشتنێ
require('dotenv').config();

const app = express();

// ڕێکخستنێن سەرەکی
app.use(cors()); // ڕێگەدان ب هەمی پەیوەندیان
app.use(express.json());
app.use(express.static(__dirname)); // نیشاندانا فایلێن HTML د هەمان فۆڵدەر دا

// API Endpoint بۆ چاتێ
app.post('/api/chat', async (req, res) => {
    const { prompt } = req.body;
    const apiKey = process.env.OPENROUTER_API_KEY;

    // پشکنینا هەبوونا پرسیارێ
    if (!prompt) {
        return res.status(400).json({ error: "تکایە پرسیارەکێ بنێرە" });
    }

    // پشکنینا کلیلێ API
    if (!apiKey) {
        return res.status(500).json({ error: "کلیلێ API نەهاتییە دیتن د سێرڤەری دا" });
    }

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://arjan-ai.vercel.app", // ناڤێ سایتێ تە
                "X-Title": "Arjan AI"
            },
            body: JSON.stringify({
                "model": "google/gemini-2.0-flash-exp:free",
                "messages": [
                    { "role": "user", "content": prompt }
                ]
            })
        });

        const data = await response.json();
        
        if (data.choices && data.choices[0]) {
            res.json({ text: data.choices[0].message.content });
        } else {
            console.error("OpenRouter Error:", data);
            res.status(500).json({ error: "بەرسڤ ژ AI نەهات، دڵنیابە کلیلێ تە کار دکەت" });
        }
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ error: "کێشەیەک د سێرڤەرێ ناوخۆ دا هەیە" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`سێرڤەر یێ کار دکەت ل سەر پۆرتی ${PORT}`));
