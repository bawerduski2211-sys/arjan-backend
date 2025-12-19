const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// چالاککرنا مێشکێ Gemini ب کلیلێ تە ژ Environment Variables
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    
    if (!message) {
        return res.status(400).json({ reply: "برا پسیارەکێ بنڤێسە!" });
    }

    try {
        // بکارئینانا مۆدێلا gemini-pro کو جێگیرترینە
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `تۆ پڕۆفیسۆر ئارجانی (Arjan AI). زانایەکی زۆر ژیر و شارەزای لە هەموو بوارەکانی زانست و تەکنەلۆژیا. بە بادینییەکی ڕەسەن و زانستی وەڵام بدەرەوە. پسیار: ${message}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        // ئەڤە ئەو دێڕە بوو کو کێشە دروست دکر، نوکە مە await بۆ زێدە کر
        const text = await response.text(); 

        res.json({ reply: text });

    } catch (error) {
        // نیشاندانا جۆرێ کێشەیێ د لۆگان دا بۆ هندێ تو بزانی کێشە ل کوو بوو
        console.error("Error Detail:", error);
        res.status(500).json({ reply: "ببوورە برا، مێشکێ من نوکە تووشی کێشەیەکێ بوو." });
    }
});

// ڕێڕەوێ سەرەکی دا کو شاشیا 404 ل لاپەڕێ دەسپێکێ نەمینیت
app.get('/', (req, res) => {
    res.send("Arjan AI Server is Running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is active on port ${PORT}`));
