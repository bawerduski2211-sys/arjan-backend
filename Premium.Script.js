async function askAI() {
    const userInputField = document.getElementById('user-input'); // دڵنیابە ئەڤ ئایدییە د HTML دا یا هەی
    const responseDiv = document.getElementById('response-area');
    const userInput = userInputField.value.trim();

    if (!userInput) return;

    responseDiv.innerText = "لێگەڕیان...";

    try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: userInput })
        });

        const data = await res.json();
        responseDiv.innerText = data.text || "ببورە، بەرسڤ نەهات.";
        userInputField.value = ""; 
    } catch (error) {
        responseDiv.innerText = "خەلەتیەک هەبوو د پەیوەندیێ دا.";
    }
}
