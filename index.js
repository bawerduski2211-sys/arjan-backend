const express = require('express');
const cors = require('cors');
const app = express();

// ڕێپێدان ب پەیوەندییا د ناڤبەرا Frontend و Backend دا
app.use(cors());
app.use(express.json());

// پڕۆسێسکرنا پسیاران و دانا بەرسڤێن زیرەک
app.post('/api/chat', (req, res) => {
    const { message } = req.body;
    
    if (!message) {
        return res.status(400).json({ reply: "برا پسیارەکێ بنڤێسە!" });
    }

    const msg = message.toLowerCase();
    let reply = "";

    // سیستەمێ تێگەهشتنا بادینی (ل دویڤ پەیڤێن تە بەرسڤ دگوهۆڕن)
    if (msg.includes("چەوانی") || msg.includes("باشی")) {
        reply = "سوپاس بۆ خودێ، ئەز وەک ژیرییا دەستکرد گەلەک باشم. تو چەوانی برا؟ کەیفا من ب دیتنا تە هات.";
    } 
    else if (msg.includes("ناڤێ تە") || msg.includes("کێی")) {
        reply = "ناڤێ من Arjan AI یە، ئەز ژ لایێ Arjan Duski ڤە هاتیمە دروستکرن دا ببمە هاریکارێ تە یێ زیرەک و پڕۆفیشناڵ.";
    } 
    else if (msg.includes("سڵاو") || msg.includes("slaw")) {
        reply = "سڵاو ل تە بیت برا! کەیفا من ب دیتنا تە هات. چەوان دشێم هاریکارییا تە بکەم؟";
    }
    else if (msg.includes("دەستخۆش") || msg.includes("سوپاس")) {
        reply = "هەر ساخبی برا، ئەرکی منە ئەز باشترین زانیارییان پێشکێشی تە بکەم.";
    }
    else {
        // بەرسڤا "پڕۆفیسۆرانە" بۆ هەر بابەتەکێ دی یێ گشتی
        reply = `وەک پڕۆفیسۆر Arjan AI، من تێبینی کر کو تو پسیارێ ل سەر (${message}) دکەی. ئەڤە بابەتەکێ گرنگە و کاریگەرییا وێ یا مەزنە. ئەز دشێم پتر ل سەر باخڤم ئەگەر تو پسیارێن هوویرتر بکەی.`;
    }

    res.json({ reply });
});

// کارپێکرنا سێرڤەری ل سەر Vercel
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Arjan AI Brain is active on port ${PORT}`);
});
