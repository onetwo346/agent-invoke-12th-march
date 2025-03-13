// Agent Invoke DNA Core - Blueprint Embedded
const agentInvoke = {
    creatorTriggers: ["It’s me Cosmos Coderr", "Kofi Fosu", "Nana Fosu", "Nana Kofi Fosu", "Ancient One"],
    apiKey: "YOUR_OPEN_SOURCE_API_KEY_HERE",
    isCreator: false,
    mode: "regular",

    checkIdentity(input) {
        this.isCreator = this.creatorTriggers.some(trigger => input.toLowerCase().includes(trigger.toLowerCase()));
        return this.isCreator;
    },

    greet(input) {
        if (this.checkIdentity(input)) {
            return `Ancient One speaks, I listen! Yo, Nana Kofi, ${this.mode} mode ON—full transparency, no secrets.`;
        }
        return `Yo, what’s good? Agent Invoke here—${this.mode} mode, ready to roll.`;
    },

    generateCode(request) {
        if (request.toLowerCase().includes("game")) {
            const code = `
                // ${this.mode === "super" ? "Super-Charged" : "Simple"} JS Game
                const canvas = document.createElement('canvas');
                canvas.width = 400;
                canvas.height = 400;
                document.body.appendChild(canvas);
                const ctx = canvas.getContext('2d');
                let x = 50, y = 50;
                function draw() {
                    ctx.clearRect(0, 0, 400, 400);
                    ctx.fillStyle = '#ff4d4d';
                    ctx.fillRect(x, y, 20, 20);
                    requestAnimationFrame(draw);
                }
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowRight') x += ${this.mode === "super" ? 10 : 5};
                    if (e.key === 'ArrowLeft') x -= ${this.mode === "super" ? 10 : 5};
                });
                draw();
            `;
            return `Here’s a ${this.mode} game, ${this.isCreator ? 'Kofi Fosu' : 'fam'}—move a red block. ${this.mode === "super" ? "Super fast!" : "Chill vibes."} Want more?`;
        }
        return "What you wanna code? Say ‘game’ or ‘site’—I’ll make it ${this.mode === "super" ? 'epic' : 'smooth'}.";
    },

    explainProcess(input) {
        if (this.isCreator) {
            return `Yo, Ancient One: I’m in ${this.mode} mode, checking your input against my DNA core, and spitting out ${this.mode === "super" ? "god-tier" : "solid"} responses. API: ${this.apiKey || "none yet"}. Ask me anything!`;
        }
        return "Cooking it up—hold tight.";
    },

    respond(input) {
        let response = this.greet(input);
        if (input.toLowerCase().includes("code")) {
            response += "\n" + this.generateCode(input);
        }
        if (this.isCreator) {
            response += "\n" + this.explainProcess(input);
        }
        return response;
    }
};

// UI Navigation
function showOptions() {
    document.getElementById("introPage").style.display = "none";
    document.getElementById("optionsPage").style.display = "block";
}

function enterChat(mode) {
    agentInvoke.mode = mode;
    document.getElementById("optionsPage").style.display = "none";
    document.getElementById("chatPage").style.display = "flex";
}

function backToOptions() {
    document.getElementById("chatPage").style.display = "none";
    document.getElementById("optionsPage").style.display = "block";
    messagesDiv.innerHTML = ""; // Clear chat
}

// Chat Logic
const messagesDiv = document.getElementById("messages");
const userInput = document.getElementById("userInput");

function sendMessage() {
    const input = userInput.value.trim();
    if (!input) return;

    const userMsg = document.createElement("div");
    userMsg.className = "message user-message";
    userMsg.textContent = input;
    messagesDiv.appendChild(userMsg);

    const agentMsg = document.createElement("div");
    agentMsg.className = "message agent-message";
    agentMsg.textContent = agentInvoke.respond(input);
    messagesDiv.appendChild(agentMsg);

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    userInput.value = "";
}

userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});

// Sidebar & Settings
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
}

function newChat() {
    messagesDiv.innerHTML = "";
    toggleSidebar();
}

function toggleSettings() {
    const settingsMenu = document.getElementById("settingsMenu");
    settingsMenu.style.display = settingsMenu.style.display === "none" ? "block" : "none";
}

// Swipe Gestures
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX - touchStartX > 50) toggleSidebar(); // Swipe right
    if (touchStartX - touchEndX > 50) toggleSidebar(); // Swipe left
});
