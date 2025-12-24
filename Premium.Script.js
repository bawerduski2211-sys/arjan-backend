async function askAI() {
    const input = document.getElementById('user-input');
    const container = document.getElementById('chat-container'); // جهێ چاتێ
    const text = input.value.trim();

    if (!text) {
        alert("تکایە تشتەکێ بنڤێسە");
        return;
    }

    // ١. نیشاندانا نامەیا بەکارهێنەری
    container.innerHTML += `<div class="msg user-msg">${text}</div>`;
    input.value = "";

    // ٢. نیشاندانا لۆدینگێ (پڕۆفیسۆر یێ هزر دکەت)
    const loadingId = "ai-" + Date.now();
    container.innerHTML += `<div id="${loadingId}" class="msg ai-msg">پڕۆفیسۆر ئارجان یێ هزر دکەت...</div>`;
    container.scrollTop = container.scrollHeight;

    try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: text })
        });

        const data = await res.json();
        const aiRes = data.reply || data.text || "بەرسڤ نەهات";

        // ٣. گوهۆڕینا لۆدینگێ بۆ بەرسڤا ڕاستی
        const loadingElement = document.getElementById(loadingId);
        if (loadingElement) {
            loadingElement.innerHTML = aiRes;
            // زێدەکرنا دوگمەیا دەنگی بۆ بەرسڤا نوو
            loadingElement.parentElement.innerHTML = `
                <div class="ai-group">
                    <div class="msg ai-msg">${aiRes}</div>
                    <button class="speaker-btn" onclick="speak(\`${aiRes.replace(/[`"']/g, "")}\`)">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>`;
        }

    } catch (error) {
        const loadingElement = document.getElementById(loadingId);
        if (loadingElement) loadingElement.innerText = "ببورە، پەیوەندی ب سێرڤەری نەکەت.";
    }
    container.scrollTop = container.scrollHeight;
}
