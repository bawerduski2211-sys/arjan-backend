const express = require('express');
const cors = require('cors');
const app = express();

// ڕێپێدان ب پەیوەندییا د ناڤبەرا Frontend و Backend دا
app.use(cors());
app.use(express.json());

// سیستەمێ تێگەهشتن و بەرسڤدانا پڕۆفیشناڵ
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ reply: "برا پسیارەکێ بنڤێسە!" });
        }

        const msg = message.toLowerCase();
        let reply = "";

        // لۆژیکێ زیرەک بۆ جوداکرنا بەرسڤان دا وەک ئێک نەبن
        if (msg.includes("چەوانی") || msg.includes("باشی")) {
            reply = "سوپاس بۆ خودێ، ئەز وەک ژیرییا دەستکرد گەلەک باشم و یێ بەرهەڤم بۆ هەر هاریکارییەکێ. تو چەوانی برا؟";
        } 
        else if (msg.includes("ناڤێ تە") || msg.includes("کێی")) {
            reply = "ناڤێ من Arjan AI یە. ئەز پڕۆژەیەکێ زیرەک و پڕۆفیشناڵ مە کو ژ لایێ Arjan Duski ڤە هاتیمە دروستکرن.";
        } 
        else if (msg.includes("سڵاو") || msg.includes("slaw")) {
            reply = "سڵاو ل تە بیت برا! کەیفا من ب دیتنا تە هات. چەوان دشێم هاریکارییا تە بکەم؟";
        }
        else if (msg.includes("دەستخۆش") || msg.includes("سوپاس")) {
            reply = "ساخبی برا، ئەرکی منە ئەز باشترین زانیارییان پێشکێشی تە بکەم.";
        }
        else {
            // بەرسڤا گشتی بۆ هەر بابەتەکێ دی یێ تو پسیار بکەی
            reply = `وەک پڕۆفیسۆر Arjan AI، من تێبینی کر کو تو پسیارێ ل سەر (${message}) دکەی. ئەڤە بابەتەکێ گرنگە و کاریگەرییا وێ گەلەک یا مەزنە. ئەز دشێم پتر ل سەر باخڤم ئەگەر تو پسیارێن هوویرتر بکەی.`;
        }

        res.json({ reply });

    } catch (error) {
        res.status(500).json({ reply: "ببوورە برا، کێشەیەک د مێشکێ من دا پەیدا بوو!" });
    }
});

// ڕێزگرتن ل پۆرتا Vercel
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Arjan AI Professor is active on port ${PORT}`);
});
