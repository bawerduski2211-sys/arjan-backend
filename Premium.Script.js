// فایلێ: Premium.Script.js

async function askAI() {
    const userInput = document.getElementById('user-input').value; 
    const responseDiv = document.getElementById('response-area');

    if (!userInput) {
        alert("تکایە تشتەکێ بنڤێسە");
        return;
    }

    responseDiv.innerText = "لێگەڕیان و بەرسڤدان...";

    try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: userInput })
        });

        const data = await res.json();
        
        if (data.text) {
            responseDiv.innerText = data.text;
        } else {
            responseDiv.innerText = "خەلەتیەک هەبوو: " + (data.error || "نەدیار");
        }
    } catch (error) {
        responseDiv.innerText = "ببورە، پەیوەندی ب سێرڤەری نەکەت.";
        console.error("AI Fetch Error:", error);
    }
}
