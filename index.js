const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
// نیشاندانا فایلێن ستاتیک (HTML, CSS, JS) ژ فۆڵدەرێ سەرەکی
app.use(express.static(__dirname));

// API Endpoint بۆ چاتێ
app.post('/api/chat', async (req, res) => {
    const { prompt } = req.body;
    
    // وەرگرتنا کلیلان ژ Vercel Environment Variables
    const apiKey = process.env.OPENROUTER_API_KEY;
    const baseUrl = "https://openrouter.ai/api/v1/chat/completions";

    try {
        const response = await fetch(baseUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "google/gemini-2.0-flash-exp:free", // یان هەر مۆدێلەکێ تە بڤێت
                "messages": [
                    { "role": "user", "content": prompt }
                ]
            })
        });

        const data = await response.json();
        
        if (data.choices && data.choices[0]) {
            res.json({ text: data.choices[0].message.content });
        } else {
            res.status(500).json({ error: "بەرسڤ ژ AI نەهات" });
        }
    } catch (error) {
        res.status(500).json({ error: "کێشەیەک د سێرڤەری دا هەیە" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
