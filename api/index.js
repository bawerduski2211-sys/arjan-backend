const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ڕێپێدان ب هەمی پەیوەندییان (CORS)
app.use(cors());
app.use(express.json());

// ڕێکا سەرەکی یا چاتێ
app.post('/api/chat', async (req, res) => {
    const { prompt } = req.body;
    const apiKey = process.env.OPENROUTER_API_KEY;

    // پشکنینا هەبوونا پرسیارێ و کلیلێ API
    if (!prompt) return res.status(400).json({ reply: "تکایە پرسیارەکێ بنڤیسە." });
    if (!apiKey) return res.status(500).json({ reply: "کێشە د کلیلێ API دا هەیە، ل سەر Vercel پشکنین بکە." });

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://arjan-ai.vercel.app", // ناڤنیشانێ سایتێ تە
                "X-Title": "Arjan AI System"
            },
            body: JSON.stringify({
                "model": "google/gemini-2.0-flash-exp:free",
                "messages": [
                    { 
                        "role": "system", 
                        "content": "تو پڕۆفیسۆر ئارجانی، شارەزایێ Cyber Security و ژیرییا دەستکردی. ب زمانێ کوردی بادینی بەرسڤێ بدە." 
                    },
                    { "role": "user", "content": prompt }
                ]
            })
        });

        const data = await response.json();

        if (data.choices && data.choices[0]) {
            // فرێکرنا بەرسڤێ ب ناڤێ 'reply' دا دگەل script.js بگونجیت
            res.json({ reply: data.choices[0].message.content });
        } else {
            res.status(500).json({ reply: "بەرسڤ ژ سێرڤەرێن Google نەهات، دبیت کووتا ب دوماهی هاتبیت." });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ reply: "ببوورە برا، مێشکێ من نوکە یێ مژوولە." });
    }
});

module.exports = app;
