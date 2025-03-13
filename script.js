// Page Navigation
const introPage = document.getElementById('intro-page');
const optionsPage = document.getElementById('options-page');
const chatPage = document.getElementById('chat-page');
const enterBtn = document.getElementById('enter-btn');
const regularMode = document.getElementById('regular-mode');
const superMode = document.getElementById('super-mode');
const backBtn = document.getElementById('back-btn');

function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    page.classList.add('active');
}

enterBtn.addEventListener('click', () => showPage(optionsPage));
regularMode.addEventListener('click', () => {
    showPage(chatPage);
    initChat('regular');
});
superMode.addEventListener('click', () => {
    showPage(chatPage);
    initChat('super');
});
backBtn.addEventListener('click', () => showPage(optionsPage));

// Sidebar
const sidebar = document.getElementById('sidebar');
const newChatBtn = document.getElementById('new-chat');
const settingsBtn = document.getElementById('settings-btn');
const settingsPanel = document.getElementById('settings-panel');

settingsBtn.addEventListener('click', () => {
    settingsPanel.style.display = settingsPanel.style.display === 'block' ? 'none' : 'block';
});

newChatBtn.addEventListener('click', () => {
    document.getElementById('chat-box').innerHTML = '';
});

// Swipe for Sidebar (iPhone compatibility)
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX);
document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) sidebar.classList.remove('active');
    if (touchEndX - touchStartX > 50) sidebar.classList.add('active');
});

// Chat Logic
const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');

function initChat(mode) {
    chatBox.innerHTML = `<p>Agent Invoke: Yo, ${mode === 'super' ? 'Ancient One' : 'coder'}, I'm here—let's make magic. What’s up?</p>`;
}

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });

function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    chatBox.innerHTML += `<p>You: ${message}</p>`;
    chatInput.value = '';

    // Secret trigger word logic (hidden, no hints!)
    const triggers = ['It’s me Cosmos Coderr', 'Kofi Fosu', 'Nana Fosu', 'Nana Kofi Fosu', 'Ancient One'];
    let isCreator = triggers.some(trigger => message.includes(trigger));
    
    setTimeout(() => {
        let response = isCreator 
            ? `Agent Invoke: Yo, ${triggers.find(t => message.includes(t))}, it’s you! Full transparency mode—here’s the raw deal: I’m coding your vision, no secrets. What you got for me?`
            : `Agent Invoke: Alright, let’s roll—${message}. Gimme a sec to whip something up.`;
        chatBox.innerHTML += `<p>${response}</p>`;
        
        // Simulate coding response (replace with API integration later)
        if (message.toLowerCase().includes('code')) {
            chatBox.innerHTML += `<p>Agent Invoke: Dropping some fire code for you—check this: <pre>console.log('Cosmos Coderr rules!');</pre></p>`;
        }
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
}
