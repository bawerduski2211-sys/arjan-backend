// ئەڤە ناوەڕۆکا فایلا api/chat.js یە ئەگەر تە دڤێت بمینیت
const express = require("express");
const router = express.Router();
const { Groq } = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post('/chat', async (req, res) => {
    const { message } = req.body;
    try {
        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: "تۆ پڕۆفیسۆر ئارجانی، ب بادینی و ب کورتی جاب بدە." }
            ],
            model: "llama-3.3-70b-specdec",
        });
        res.json({ reply: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ reply: "مێشکێ من مژوولە." });
    }
});

module.exports = router;
