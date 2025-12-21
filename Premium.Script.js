// --- ١. ڕێکخستنا سەرەکی یا داتابەیسا Bawerduski ---
const supabaseUrl = 'https://cepuvipasminpjcpqvrq.supabase.co';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'; // لێرە کلیلا خۆ یا ANON دانی
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// --- ٢. فەکشنێ گرتنا هاکەران و تومارکرن د خشتێ hack_logs دا ---
async function logHackerAttempt(email) {
    console.log("هەوڵدانا هاککرنێ هاتە دۆزینەوە بۆ ئیمێڵا: ", email);
    
    const { data, error } = await supabase
        .from('hack_logs')
        .insert([
            { 
                hacker_email: email, 
                action_description: 'زێدەتر ژ ٤ جاران پاسۆرد خەلەت لێدایە - هەوڵدانا چوونە ژوورێ',
                status: 'Blocked'
            }
        ]);

    if (error) {
        console.error('Error logging hacker:', error.message);
    } else {
        console.log('Hacker logged successfully!');
        // نیشاندانا نامەیا سزا بۆ هاکەری
        alert("سیستمێ ARJAN AI تە وەک هاکەر ناس دکەت! ئیمێڵا تە هاتە تومارکرن و تو هاتە بلۆککرن.");
        window.location.href = "blocked.html"; 
    }
}

// --- ٣. فەکشنێ وەرگرتنا نامەیان و تومارکرن د خشتێ messages دا ---
async function sendMessage(fullName, email, phone, message) {
    const { data, error } = await supabase
        .from('messages')
        .insert([
            { 
                full_name: fullName, 
                email: email, 
                phone: phone, 
                message_body: message 
            }
        ]);

    if (error) {
        alert("کێشەیەک د ناردنا نامەیێ دا هەبوو: " + error.message);
    } else {
        alert("نامەیا تە ب سەرکەفتی گەهشتە دەستێ Bawerduski!");
    }
}

// --- ٤. سیستەمێ چاڤدێرییا پاسۆردێن خەلەت ---
let loginAttempts = 0;
function checkLogin(email, password) {
    const correctPassword = "YOUR_SECRET_PASSWORD"; // پاسۆردێ خۆ لێرە دانێ

    if (password !== correctPassword) {
        loginAttempts++;
        if (loginAttempts >= 4) {
            logHackerAttempt(email); // گرتنا هاکەری پشتی ٤ جاران
        } else {
            alert("پاسۆرد خەلەتە! هەوڵدانا ژمارە: " + loginAttempts);
        }
    } else {
        alert("بخێر بێی بۆ سیستەمێ Bawerduski!");
        window.location.href = "admin-panel.html"; 
    }
}
