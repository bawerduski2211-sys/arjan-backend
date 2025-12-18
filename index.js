const express = require('express');
const cors = require('cors');
const app = express();

// ڕێپێدان ب گه‌هشتنا نامه‌یان ژ هه‌می لایه‌كان
app.use(cors());
app.use(express.json());

// سیسته‌مێ جابدانێ یێ زیره‌ك ب كلیلێن كوگڵ و ئۆپن ئه‌ی ئای
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    
    if (!message) {
        return res.status(400).json({ reply: "برا پسیارەکێ بنڤێسە!" });
    }

    const msg = message.toLowerCase();
    let reply = "";

    // سیسته‌مێ لۆژیكی یێ پڕۆفیسۆر ئارجان
    if (msg.includes("چەوانی") || msg.includes("باشی")) {
        reply = "سوپاس بۆ خودێ، ئەز وەک ژیرییا دەستکرد گەلەک باشم. تو چەوانی برا؟ کەیفا من ب دیتنا تە هات.";
    } 
    else if (msg.includes("ناڤێ تە") || msg.includes("کێی")) {
        reply = "ناڤێ من Arjan AI یە، ئەز ژ لایێ Arjan Duski ڤە هاتیمە دروستکرن دا ببمە هاریکارێ تە یێ زیرەک.";
    } 
    else if (msg.includes("سڵاو") || msg.includes("slaw")) {
        reply = "سڵاو ل تە بیت برا! کەیفا من ب دیتنا تە هات. چەوان دشێم هاریکارییا تە بکەم؟";
    }
    else {
        // ئه‌ڤه‌ به‌رسڤا پڕۆفیشناڵه‌ بۆ پسیارێن گشتی
        reply = `وەک پڕۆفیسۆر Arjan AI، من تێبینی کر کو تو پسیارێ ل سەر (${message}) دکەی. ئەڤە بابەتەکێ زۆر گرنگە و پێدڤی ب ڤەکۆلینەکا پڕۆفیشناڵ هەیە. ئەز ل خزمەتا تە دام بۆ هەر زانیارییەکا دی.`;
    }

    res.json({ reply });
});

// گرنگ: لایێ سێرڤه‌ری ل سه‌ر پۆرتا گونجای
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Arjan AI Brain is running on port ${PORT}`);
});
