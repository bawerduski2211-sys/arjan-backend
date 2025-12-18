const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// ۱. چالاککرنا مێشکێ Gemini ب رێکا کلیلا پاراستی
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ reply: "برا پسیارەکێ بنڤێسە!" });

    try {
        // ۲. رێنماییا سیستەمی: ل ڤێرە مە ئارجان کرە زاناترین پڕۆفیسۆر
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            systemInstruction: `تۆ پڕۆفیسۆر ئارجانی (Arjan AI). زانایەکی زۆر ژیر و شارەزای لە هەموو بوارەکانی زانست، مێژوو، تەکنەلۆژیا و ئەدەبیات. 
            تۆ دەتوانی بە هەموو زمانەکانی جیهان قسە بکەیت. 
            ئەگەر بەکارهێنەر بە کوردی (شێوەزاری بادینی) قسەی کرد، پێویستە بە بادینییەکی ڕەسەن و زانستی وەڵام بدەیتەوە. 
            وەڵامەکانت با کورت، زیرەک، دۆستانە و بێ کێماسی بن.`
        });

        // ۳. وەرگرتنا بەرسڤا ژیر ژ Gemini
        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });

    } catch (error) {
        console.error("Error with Gemini:", error);
        res.status(500).json({ reply: "ببوورە برا، مێشکێ من (ئارجان) نوکە یێ مژوولە." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Arjan AI Server is running on port ${PORT}`));
