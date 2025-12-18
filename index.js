const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// مێشکێ زیرەک یێ Arjan AI
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    const msg = message.toLowerCase();

    // بەرسڤێن ژیرانە و پڕۆفیشناڵ ب زمانێ بادینی
    let reply = "وەک پڕۆفیسۆر Arjan AI، ئەز تێگەهشتم کو تو بەحسێ (" + message + ") دکەی. ئەڤە بابەتەکێ گەلەک گرنگە و پێدڤی ب ڤەکۆلینەکا پڕۆفیشناڵ هەیە. ئەز ل خزمەتا تە دام بۆ هەر زانیارییەکا دی.";

    if (msg.includes("چەوانی") || msg.includes("باشی")) {
        reply = "سوپاس بۆ خودێ، ئەز وەک ژیرییا دەستکرد گەلەک باشم و یێ بەرهەڤم بۆ هاریکارییا تە. تو چەوانی برا؟";
    } else if (msg.includes("ناڤێ تە") || msg.includes("کێی")) {
        reply = "ناڤێ من Arjan AI یە، ئەز ژ لایێ Arjan Duski ڤە هاتیمە دروستکرن دا ببمە هاریکارێ تە یێ زیرەک و پڕۆفیشناڵ.";
    } else if (msg.includes("سڵاو") || msg.includes("slaw")) {
        reply = "سڵاو ل تە بیت برا، کەیفا من ب دیتنا تە هات! چەوان دشێم هاریکارییا تە بکەم؟";
    }

    res.json({ reply });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Arjan AI Brain is Running!'));
