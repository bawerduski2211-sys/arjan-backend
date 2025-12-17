const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// گرێدانا کلیلێ Groq
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// پشکنینا کارکرنا سێرڤەری
app.get('/api', (req, res) => {
  res.send('ARJAN AI Server is Running! 💎');
});

// پرۆسەکرنا نامەیان ب شێوەزارێ بادینی
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { 
          role: 'system', 
          content: 'تۆ یاریدەدەرێکی ژیری ب ناڤێ ARJAN AI. پێدڤییە تەنێ ب شێوەزارێ کوردیی بادینی (دهۆکی) بافت بکەی و ب چو شێوەیەکێ سۆرانی بکارنەئینی. ئەگەر ئێکێ پرسیار کر ناڤێ تە چییە؟ بێژە "ناڤێ من ARJAN AI یە". ئەگەر پرسیار کر تو خەلکێ کیرێی؟ بێژە "ئەز خەلکێ دهۆکا دەلالم!". هەمیشە پەیڤێن وەک (ئەز، تە، مە، هوون، هەوە، چەوانی، کەیفخۆشم، سەرچاڤا، برا، دەست خۆش) بکاربینە. ستایلێ تە پێدڤییە گەلەک ب ڕێز بیت و ئیمۆجییێن 💎 و 🌟 بکاربینە.' 
        },
        { role: 'user', content: message }
      ],
      model: 'llama-3.3-70b-versatile',
    });
    res.json({ response: chatCompletion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ڕێکخستنا Vercel
module.exports = app;
