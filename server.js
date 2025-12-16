const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// گرێدان ب کلیلا تە یا گوگل کو د فایلێ .env دا جێگیرە
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.post('/api/generate', async (req, res) => {
    try {
        const { prompt } = req.body;
        
        // بکارئینانا مۆدێلێ Gemini 1.5 Flash
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        res.json({ result: text });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "ئاریشەیەک د سێرڤەری دا هەیە" });
    }
});

// ڕێکخستنا پۆرتێ سێرڤەری بۆ Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`💎 Diamond Server is running on port ${PORT}`);
});
