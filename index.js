const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// سیستەمێ جابدانێ یێ زیرەک
app.post('/api/chat', (req, res) => {
    const { message } = req.body;
    if (!message) return res.status(400).json({ reply: "برا پسیارەکێ بنڤێسە!" });

    const msg = message.toLowerCase();
    let reply = `وەک پڕۆفیسۆر Arjan AI، من تێبینی کر کو تو پسیارێ ل سەر (${message}) دکەی. ئەڤە بابەتەکێ گرنگە و کاریگەرییا وێ یا مەزنە. ئەز دشێم پتر ل سەر باخڤم ئەگەر تو پسیارێن هوویرتر بکەی.`;

    if (msg.includes("چەوانی") || msg.includes("باشی")) {
        reply = "سوپاس بۆ خودێ، ئەز وەک ژیرییا دەستکرد گەلەک باشم. تو چەوانی برا؟ کەیفا من ب تە هات.";
    } else if (msg.includes("ناڤێ تە") || msg.includes("کێی")) {
        reply = "ناڤێ من Arjan AI یە، ئەز ژ لایێ Arjan Duski ڤە هاتیمە دروستکرن دا ببمە هاریکارێ تە یێ زیرەک.";
    }

    res.json({ reply });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running`));
