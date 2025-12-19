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

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ reply: "برا پسیارەکێ بنڤێسە!" });
    }

    try {
        // 2. بکارئینانا مۆدێلێ Llama یێ ب هێز
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "تۆ پڕۆفیسۆر ئارجانی (Arjan AI). زانایەکی زۆر ژیر و شارەزای لە هەموو بوارەکانی زانست و تەکنەلۆژیا. بە بادینییەکی ڕەسەن و زانستی وەڵام بدەرەوە."
                },
                {
                    role: "user",
                    content: message
                }
            ],
            model: process.env.MODEL_NAME || "llama-3.3-70b-versatile",
        });

        const text = completion.choices[0].message.content;
        res.json({ reply: text });

    } catch (error) {
        console.error("Error Detail:", error);
        res.status(500).json({ reply: "ببوورە برا، مێشکێ من نوکە تووشی کێشەیەکێ بوو. دڵنیا ببە کلیلێ تە یێ Groq درستە." });
    }
});

app.get('/', (req, res) => {
    res.send("Arjan AI Server (Llama Edition) is Running!");
});

module.exports = app;
