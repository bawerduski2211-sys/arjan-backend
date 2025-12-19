const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// گرێدانا کلیلێ API ب مێشکێ Gemini ڤە
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ reply: "برا پسیارەکێ بنڤێسە!" });

    try {
        // مۆدێلا جێگیر و ناسراو
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `تۆ پڕۆفیسۆر ئارجانی (Arjan AI). زانایەکی زۆر ژیر و شارەزای لە هەموو بوارەکانی زانست و تەکنەلۆژیا. بە بادینییەکی ڕەسەن و زانستی وەڵام بدەرەوە. پسیار: ${message}`;

        // ڤێرە پشکەکا گرنگە: چاوەڕێکرنا وەڵامێ
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        // ئەڤە ئەو دێڕە بوو کو کێشە دروست دکر، نوکە مە await بۆ زێدە کر
        const text = await response.text(); 

        res.json({ reply: text });

    } catch (error) {
        console.error("Error Details:", error);
        res.status(500).json({ reply: "ببوورە برا، مێشکێ من نوکە تووشی کێشەیەکێ بوو." });
    }
});

// ڕێڕەوێ سەرەکی بۆ چالاککرنا سێرڤەری
app.get('/', (req, res) => {
    res.send("Arjan AI Server is Running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
