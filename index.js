const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// چالاککردنی ژیری دەستکرد بە کلیلەکەت
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    
    if (!message) {
        return res.status(400).json({ reply: "برا پسیارەکێ بنڤێسە!" });
    }

    try {
        // بەکارهێنانی gemini-pro کە جێگیرترین مۆدێلە بۆ ئەم جۆرە پڕۆژانە
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `تۆ پڕۆفیسۆر ئارجانی (Arjan AI). زانایەکی زۆر ژیر و شارەزای لە هەموو بوارەکانی زانست و تەکنەلۆژیا. بە بادینییەکی ڕەسەن و زانستی وەڵام بدەرەوە. پسیار: ${message}`;

        // وەرگرتنی وەڵام بە شێوەیەکی پارێزراو
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text(); // لێرەدا وەڵامەکە وەردەگرین

        res.json({ reply: text });

    } catch (error) {
        // لێرەدا هەڵەکە لە لۆگەکاندا تۆمار دەکەین بۆ ئەوەی بزانین کێشەکە چییە
        console.error("Detailed Error:", error);
        res.status(500).json({ reply: "ببوورە برا، مێشکێ من نوکە تووشی کێشەیەکێ بوو." });
    }
});

// ڕێڕەوێکی سەرەکی بۆ ئەوەی هەڵەی 404 لە لاپەڕەی یەکەم نەمێنێت
app.get('/', (req, res) => {
    res.send("Server is running successfully!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is active on port ${PORT}`));
