
async function askAI() {
    const input = document.getElementById('user-input');
    const container = document.getElementById('chat-container');
    const text = input.value.trim();

    if (!text) return;

    // پیشاندانی نامەی بەکارهێنەر
    container.innerHTML += `<div class="msg user-msg">${text}</div>`;
    input.value = "";

    // دروستکردنی شوێنی بەرسڤی AI
    const loadingId = "ai-" + Date.now();
    container.innerHTML += `<div id="${loadingId}" class="msg ai-msg">پڕۆفیسۆر ئارجان بیر دەکاتەوە...</div>`;
    container.scrollTop = container.scrollHeight;

    try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: text })
        });

        const data = await res.json();
        const aiRes = data.reply || "ببوورە بەرسڤ نەهات.";

        document.getElementById(loadingId).innerText = aiRes;
    } catch (error) {
        document.getElementById(loadingId).innerText = "کێشەیەک لە پەیوەندیدا هەیە.";
    }
    container.scrollTop = container.scrollHeight;
}
