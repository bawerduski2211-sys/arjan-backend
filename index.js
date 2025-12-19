const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. چالاککرنا مێشکێ Gemini ب کلیلێ API کو ژ Vercel دهێت
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ reply: "برا پسیارەکێ بنڤێسە!" });
    }

    try {
        // 2. بکارئینانا مۆدێلا نوو و زیرەک gemini-1.5-flash
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `تۆ پڕۆفیسۆر ئارجانی (Arjan AI). زانایەکی زۆر ژیر و شارەزای لە هەموو بوارەکانی زانست و تەکنەلۆژیا. بە بادینییەکی ڕەسەن و زانستی وەڵام بدەرەوە. پسیار: ${message}`;

        // 3. وەرگرتنا وەڵامێ ب شێوەیەکێ دروست و خێرا
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text(); 

        res.json({ reply: text });

    } catch (error) {
        console.error("Error Detail:", error);
        res.status(500).json({ reply: "ببوورە برا، مێشکێ من نوکە تووشی کێشەیەکێ بوو. دڵنیا ببە کلیلێ تە یێ API درستە." });
    }
});

// 4. پشکنینا سێرڤەری (Health Check)
app.get('/', (req, res) => {
    res.send("Arjan AI Server is Running Perfectly!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is active on port ${PORT}`));
