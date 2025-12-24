// Arjan AI - Fixed chat.js
module.exports = async (req, res) => {
    // ڕێپێدان بۆ فۆنتێندێ تە
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { prompt } = req.body;
    
    // ئاگاداربه‌: پێتڤییە ئەڤ ناڤە درست د Vercel دا هەبیت
    const apiKey = process.env.OPENROUTER_API_KEY; 

    if (!apiKey) {
        return res.status(500).json({ reply: "کلیلێ API ناهێتە دیتن! ل ناڤ ڤێرسل زێدە بکە." });
    }

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
                    { "role": "system", "content": "تو پڕۆفیسۆر ئارجانی، ب بادینی بەرسڤێ بدە." },
                    { "role": "user", "content": prompt }
                ]
            })
        });

        const data = await response.json();
        
        if (data.choices && data.choices[0]) {
            // من کرە 'reply' دا دگەل دیزاینا تە بگونجیت
            res.status(200).json({ reply: data.choices[0].message.content });
        } else {
            res.status(500).json({ reply: "بەرسڤ ژ سێرڤەری نەهات." });
        }
        
    } catch (error) {
        res.status(500).json({ reply: "ببوورە برا، مێشکێ من نوکە یێ مژوولە." });
    }
};
