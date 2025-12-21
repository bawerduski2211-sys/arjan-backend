// --- Bawerduski Backend Core ---
const supabaseUrl = 'https://cepuvipasminpjcpqvrq.supabase.co';
const supabaseKey = 'EyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlcHV2aXBhc21pbnBqY3BndnJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU4ODM1NDQsImV4cCI6MjA4MTQ1OTU0NH0.FcLh2LgcxHhdtZdqCIu3ImN7T_Xp8a8hXGCZHRhcWuE';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

// تومارکرنا هاکەران د داتابەیسێ دا
async function logHackerToDatabase(email) {
    const { data, error } = await supabase
        .from('hack_logs')
        .insert([{ 
            hacker_email: email,
            action_description: 'Hacker Detected - ARJAN Security System',
            status: 'Blocked'
        }]);

    if (!error) {
        window.location.href = "../Arjan-Frontend/blocked.html"; 
    }
}

// وەرگرتنا نامەیێن بکارئینەران
async function processIncomingMessage(name, email, phone, message) {
    await supabase.from('messages').insert([{ 
        full_name: name, email: email, phone: phone, message_body: message 
    }]);
}
