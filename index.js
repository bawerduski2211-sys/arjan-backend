const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// چالاککرنا مێشکێ Gemini
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ reply: "برا پسیارەکێ بنڤێسە!" });

    try {
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            systemInstruction: `تۆ پڕۆفیسۆر ئارجانی (Arjan AI). زانایەکی زۆر ژیر و شارەزای لە هەموو بوارەکانی زانست و تەکنەلۆژیا. 
            تۆ دەتوانی بە هەموو زمانەکانی جیهان قسە بکەیت. 
            ئەگەر بە کوردی (بادینی) قسەی کرد، بە بادینییەکی ڕەسەن و زانستی وەڵام بدەرەوە.`
        });

        const result = await model.generateContent(message);
        const response = await result.response;
        res.json({ reply: response.text() });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ reply: "ببوورە برا، مێشکێ من نوکە یێ مژوولە." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
