<!DOCTYPE html>
<html lang="ku" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ARJAN AI 💎</title>
    <style>
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            background: radial-gradient(circle, #0f172a 0%, #020617 100%); 
            color: white; 
            margin: 0; 
            padding: 10px; 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            height: 100vh;
        }

        /* ستایلێ زێڕینی و ئەڵماسی بۆ ناڤی */
        .header {
            text-align: center;
            padding: 25px 10px;
            animation: fadeIn 1.5s ease-out;
        }

        .header h1 {
            font-size: 2.8rem;
            margin: 0;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 2px;
            /* ستایلێ گۆڵد و دایمۆند */
            background: linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            filter: drop-shadow(0px 4px 8px rgba(212, 175, 55, 0.4));
        }

        .header p {
            color: #e2e8f0;
            font-size: 1.1rem;
            margin-top: 10px;
            font-weight: 500;
            text-shadow: 0px 2px 4px rgba(0,0,0,0.5);
        }

        #chatbox { 
            width: 100%; 
            max-width: 500px; 
            height: 60vh; 
            background: rgba(30, 41, 59, 0.5); 
            backdrop-filter: blur(12px);
            border-radius: 25px; 
            overflow-y: auto; 
            padding: 20px; 
            margin-bottom: 15px; 
            border: 1px solid rgba(212, 175, 55, 0.3);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
            display: flex;
            flex-direction: column;
        }

        .msg { margin-bottom: 15px; padding: 12px 18px; border-radius: 20px; max-width: 85%; font-size: 15px; line-height: 1.6; position: relative; }
        .user-msg { background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; align-self: flex-start; border-bottom-right-radius: 2px; }
        .ai-msg { background: #1e293b; color: #f1f5f9; align-self: flex-end; border-bottom-left-radius: 2px; border: 1px solid rgba(255,255,255,0.05); }

        .input-area { 
            width: 100%; 
            max-width: 500px; 
            display: flex; 
            gap: 10px; 
            background: rgba(255,255,255,0.05); 
            padding: 8px; 
            border-radius: 20px; 
            border: 1px solid rgba(212, 175, 55, 0.2);
        }
        
        input { flex: 1; padding: 14px; border-radius: 15px; border: none; outline: none; background: #020617; color: white; font-size: 16px; }
        
        button { 
            padding: 10px 25px; 
            background: linear-gradient(to right, #aa771c, #d4af37); 
            color: #020617; 
            border: none; 
            border-radius: 15px; 
            cursor: pointer; 
            font-weight: 800; 
            transition: 0.3s; 
        }
        button:hover { transform: scale(1.05); filter: brightness(1.2); }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
    </style>
</head>
<body>

    <div class="header">
        <h1>ARJAN AI 💎</h1>
        <p>ئارجان ئەی ئای گەل تە یه چ پرسیار هەیە؟ ✨</p>
    </div>

    <div id="chatbox">
        <div class="msg ai-msg">بۆخێرهاتی برا! ئەز ئامادەم بۆ هەر پرسیارەکێ. 🤖💎</div>
    </div>

    <div class="input-area">
        <input type="text" id="userInput" placeholder="پرسیارێ لێرە بنڤیسە..." onkeypress="if(event.key === 'Enter') sendMessage()">
        <button onclick="sendMessage()">ناردن 🚀</button>
    </div>

    <script>
        const API_URL = "https://arjan-backend.vercel.app/api/chat";

        async function sendMessage() {
            const input = document.getElementById("userInput");
            const chatbox = document.getElementById("chatbox");
            const text = input.value.trim();
            if (!text) return;

            chatbox.innerHTML += `<div class="msg user-msg">👤 ${text}</div>`;
            input.value = "";
            chatbox.scrollTop = chatbox.scrollHeight;

            try {
                const response = await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message: text })
                });
                const data = await response.json();
                chatbox.innerHTML += `<div class="msg ai-msg">💎 ${data.response || "ببورە، کێشەیەک هەیە."}</div>`;
            } catch (error) {
                chatbox.innerHTML += `<div class="msg ai-msg" style="color: #ef4444;">❌ سێرڤەر نەدۆزرایەوە.</div>`;
            }
            chatbox.scrollTop = chatbox.scrollHeight;
        }
    </script>
</body>
</html>
