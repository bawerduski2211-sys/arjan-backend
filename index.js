const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// پەیوەندی ب کلیلێ ڤە دکەت
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// پشکنینا کارکرنا سێرڤەری
app.get('/api', (req, res) => {
  res.send('ARJAN AI Server is Running! 💎');
});

// پرۆسەکرنا نامەیان ب زمانێ کوردی
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { 
          role: 'system', 
          content: 'تۆ یاریدەدەرێکی ژیری ب ناڤێ ARJAN AI و هەمیشە ب زمانێ کوردی (بادینی و سۆرانی) بەرسڤێ ددەی. ستایلێ تە پێدڤییە ڕێزدار بیت و ئیمۆجییێ 💎 بکاربینی.' 
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
