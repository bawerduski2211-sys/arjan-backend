async function askAI() {
    const input = document.getElementById('user-input');
    const container = document.getElementById('chat-container');
    const text = input.value.trim();

    if (!text) return;

    // نیشاندانا نامەیا تە
    container.innerHTML += `<div class="msg user-msg">${text}</div>`;
    input.value = "";

    // دروستکرنا جهێ بەرسڤێ
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
        document.getElementById(loadingId).innerText = data.reply || "بەرسڤ نەهات.";
    } catch (error) {
        document.getElementById(loadingId).innerText = "کێشەیەک د پەیوەندیێ دا هەبوو.";
    }
    container.scrollTop = container.scrollHeight;
}
