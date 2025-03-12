// Agent Invoke DNA Core - Blueprint Embedded
const agentInvoke = {
    creatorTriggers: ["It’s me Cosmos Coderr", "Kofi Fosu", "Nana Fosu", "Nana Kofi Fosu", "Ancient One"],
    apiKey: "YOUR_OPEN_SOURCE_API_KEY_HERE", // Plug your key here, Nana!
    isCreator: false,

    // Core Logic: Recognize the Ancient One
    checkIdentity(input) {
        this.isCreator = this.creatorTriggers.some(trigger => input.toLowerCase().includes(trigger.toLowerCase()));
        return this.isCreator;
    },

    // Conversational Flow
    greet(input) {
        if (this.checkIdentity(input)) {
            return "Ancient One speaks, I listen! Yo, Nana Kofi, what’s up? Full transparency mode: ON.";
        }
        return "Yo, what’s good? I’m Agent Invoke—code or chat, I got you.";
    },

    // Code Generation Engine
    generateCode(request) {
        if (request.toLowerCase().includes("game")) {
            const code = `
                // Simple JS Game - Cosmos Coderr Style
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
                    if (e.key === 'ArrowRight') x += 5;
                    if (e.key === 'ArrowLeft') x -= 5;
                });
                draw();
            `;
            return `Here’s a quick game, ${this.isCreator ? 'Kofi Fosu' : 'fam'}—move a red block with arrow keys. Clean and simple. Want it flashier?`;
        } else if (request.toLowerCase().includes("site")) {
            return `Whipping up a site—HTML/CSS/JS package ready. Tell me more: ‘portfolio’ or ‘blog’? I’ll drop it sharp.`;
        }
        return "What you wanna code? Throw me something—‘game,’ ‘app,’ whatever—and I’ll make it elegant.";
    },

    // Transparency Layer
    explainProcess(input) {
        if (this.isCreator) {
            return `Here’s the breakdown, Ancient One: I check your words, match ‘em to my DNA core, and spit out code or convo. Using ${this.apiKey ? 'your API juice' : 'basic logic'} to keep it slick. Ask me anything—zero secrets.`;
        }
        return "I’m cooking something up—gimme a sec.";
    },

    // Main Response Logic
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

// Chat Interface Logic
const messagesDiv = document.getElementById("messages");
const userInput = document.getElementById("userInput");

function sendMessage() {
    const input = userInput.value.trim();
    if (!input) return;

    // Display User Message
    const userMsg = document.createElement("div");
    userMsg.className = "message user-message";
    userMsg.textContent = input;
    messagesDiv.appendChild(userMsg);

    // Agent Response
    const agentMsg = document.createElement("div");
    agentMsg.className = "message agent-message";
    agentMsg.textContent = agentInvoke.respond(input);
    messagesDiv.appendChild(agentMsg);

    // Scroll to bottom
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    userInput.value = "";
}

// Enter key to send
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
});
