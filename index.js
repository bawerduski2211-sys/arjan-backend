const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// پەیوەندی ب کلیلێ ڤە دکەت (GROQ_API_KEY پێدڤییە د Settings دا هەبیت)
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.get('/api', (req, res) => {
  res.send('Backend is running with Groq llama-3.3!');
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    // گۆڕینا مۆدێلێ بۆ llama-3.3-70b-versatile دا کو خەتەیا 400 نەمینیت
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: message }],
      model: 'llama-3.3-70b-versatile',
    });
    res.json({ response: chatCompletion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
