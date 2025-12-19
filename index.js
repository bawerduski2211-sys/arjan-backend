const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// چالاککردنی Gemini بە کلیلەکەت
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ reply: "تکایە پسیارێک بنووسە!" });

    try {
        // لێرەدا ناوی مۆدێلەکەمان گۆڕی بۆ gemini-pro کە جێگیرترە
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // ناردنی پەیامەکە بۆ Gemini
        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });

    } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ reply: "ببوورە برا، کێشەیەک لە پەیوەندی بە مێشکی دەستکرد دروست بوو." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
