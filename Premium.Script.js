async function askAI() {
    const userInputField = document.getElementById('user-input');
    const responseDiv = document.getElementById('response-area');
    const userInput = userInputField.value.trim();

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
            userInputField.value = ""; 
        } else {
            responseDiv.innerText = "خەلەتی: " + (data.error || "بەرسڤ نەهات");
        }
    } catch (error) {
        responseDiv.innerText = "ببورە، پەیوەندی ب سێرڤەری نەکەت.";
    }
}
