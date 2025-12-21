// --- ڕێکخستنا باکئێند بۆ داتابەیسا Bawerduski ---
const supabaseUrl = 'https://cepuvipasminpjcpqvrq.supabase.co';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'; // لێرە کلیلا Anon دانی
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// فەکشنا تومارکرنا هاکەران د داتابەیسێ دا
async function logHackerToDatabase(email) {
    console.log("جارێ هنارتنا زانیارییان بۆ داتابەیسێ...");
    const { data, error } = await supabase
        .from('hack_logs') // خشتێ هاکەران
        .insert([{ 
            hacker_email: email, 
            action_description: 'هەوڵدانا هاککرنێ - سیستمێ ARJAN AI',
            status: 'Blocked'
        }]);
    
    if (error) {
        console.error('ئیرۆر:', error.message);
    } else {
        // هنارتنا هاکەری بۆ لاپەرێ سزا
        window.location.href = "../Arjan-Frontend/blocked.html"; 
    }
}

// فەکشنا وەرگرتنا نامەیان
async function processIncomingMessage(name, email, phone, message) {
    await supabase.from('messages').insert([{ 
        full_name: name, email: email, phone: phone, message_body: message 
    }]);
}
