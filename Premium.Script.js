async function askAI() {
    const userInputField = document.getElementById('user-input');
    const responseDiv = document.getElementById('response-area'); // دڵنیابە ئەڤ ئایدییە د HTML دا هەیە
    const userInput = userInputField.value;

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
            userInputField.value = ""; // پاککرنا خانکا نڤیسینێ
        } else {
            responseDiv.innerText = "خەلەتیەک هەبوو: " + (data.error || "نەدیار");
        }
    } catch (error) {
        responseDiv.innerText = "ببورە، پەیوەندی ب سێرڤەری نەکەت.";
        console.error("AI Fetch Error:", error);
    }
}
