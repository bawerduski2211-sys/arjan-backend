const { Groq } = require("groq-sdk");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. چالاککرنا مێشکێ Llama ب کلیلێ Groq
const groq = new Groq({ 
    apiKey: process.env.GROQ_API_KEY 
});

// 2. رێکا سەرەکی یا چاتێ (ئاخفتن دگەل پڕۆفیسۆر ئارجان)
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ reply: "برا پسیارەکێ بنڤێسە!" });
    }

    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `تۆ پڕۆفیسۆر ئارجانی، خەڵکی دهۆکی. زۆر بە کورتی و تەنها بە یەک ڕستە وەڵام بدەوە. 
                    یاسایێن توند: ١. تەنها ب بادینی باخڤە. ٢. ب چ ڕەنگەکی سۆرانی بەکارنەهێنە. ٣. بەرسڤێن درێژ و بێزارکەر نەدە.`
                },
                {
                    role: "user",
                    content: message
                }
            ],
            model: "llama-3.3-70b-specdec", // مۆدێلێ خێرایێ Llama
            temperature: 0.1, // کێم کر بۆ هندێ بەرسڤ جێگیر و کورت بن
            max_tokens: 100 // سنوردار کر دا بەرسڤێن درێژ نەدەت
        });

        res.json({ reply: completion.choices[0].message.content });

    } catch (error) {
        console.error("Error Detail:", error);
        res.status(500).json({ reply: "ببوورە برا، مێشکێ من نوکە یێ مژوولە." });
    }
});

// 3. پشکنینا کارکرنا سێرڤەری
app.get('/', (req, res) => {
    res.send("Arjan AI System (Llama Mode) is Running Successfully!");
});

// 4. هه‌لکرنا سێرڤەری ل سەر پۆرتا Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is online at port ${PORT}`);
});
