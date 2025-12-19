const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// چالاککرنا مێشکێ Gemini ب کلیلێ API
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    
    if (!message) {
        return res.status(400).json({ reply: "برا پسیارەکێ بنڤێسە!" });
    }

    try {
        // مۆدێلا جێگیر gemini-pro
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `تۆ پڕۆفیسۆر ئارجانی (Arjan AI). زانایەکی زۆر ژیر و شارەزای لە هەموو بوارەکانی زانست و تەکنەلۆژیا. بە بادینییەکی ڕەسەن و زانستی وەڵام بدەرەوە. پسیار: ${message}`;

        // هەنگاڤێن وەرگرتنا وەڵامێ ب شێوەیەکێ دروست
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        // ئەڤە ئەو پشکەیە کو دبیتە ئەگەرێ شاشیا 500 ئەگەر await لێ نەبیت
        const text = await response.text(); 

        res.json({ reply: text });

    } catch (error) {
        console.error("Error Detail:", error);
        res.status(500).json({ reply: "ببوورە برا، مێشکێ من نوکە تووشی کێشەیەکێ بوو." });
    }
});

// ڕێڕەوێ سەرەکی بۆ چالاککرنا سێرڤەری (Health Check)
app.get('/', (req, res) => {
    res.send("Arjan AI Server is Running Perfectly!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is active on port ${PORT}`));
