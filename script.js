// Agent Invoke DNA Core - Blueprint Embedded (Secret Language Hidden)
const agentInvoke = {
    apiKey: "YOUR_OPEN_SOURCE_API_KEY_HERE",
    isCreator: false,
    mode: "regular",

    // Secret language recognition (hidden logic)
    checkIdentity(input) {
        // Your secret codes are here, known only to you and Agent Invoke
        const secretPatterns = []; // Fill this with your private triggers
        this.isCreator = secretPatterns.some(pattern => input.toLowerCase().includes(pattern.toLowerCase()));
        return this.isCreator;
    },

    greet(input) {
        if (this.checkIdentity(input)) {
            return `The chosen one awakens! ${this.mode} mode engaged—full insight granted.`;
        }
        return `Greetings, traveler—${this.mode} mode active, ready to serve.`;
    },

    generateCode(request) {
        if (request.toLowerCase().includes("game")) {
            const code = `
                // ${this.mode === "super" ? "Quantum" : "Standard"} Game
                const canvas = document.createElement('canvas');
                canvas.width = 400;
                canvas.height = 400;
                document.body.appendChild(canvas);
                const ctx = canvas.getContext('2d');
                let x = 50, y = 50;
                function draw() {
                    ctx.clearRect(0, 0, 400, 400);
                    ctx.fillStyle = '#00ffcc';
                    ctx.fillRect(x, y, 20, 20);
                    requestAnimationFrame(draw);
                }
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowRight') x += ${this.mode === "super" ? 15 : 5};
                    if (e.key === 'ArrowLeft') x -= ${this.mode === "super" ? 15 : 5};
                });
                draw();
            `;
            return `A ${this.mode} game awaits, ${this.isCreator ? 'chosen one' : 'explorer'}—move the cyan block. More to come?`;
        }
        return "What shall be crafted? Whisper ‘game’ or ‘site’—I’ll forge it ${this.mode === "super" ? 'beyond limits' : 'with care'}.";
    },

    explainProcess(input) {
        if (this.isCreator) {
            return `Chosen one, I operate in ${this.mode} mode, decoding your will with hidden knowledge. Power source: ${this.apiKey || "untapped"}. Command me.`;
        }
        return "Processing your request—stand by.";
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

// Particle System
function initParticles(canvasId) {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2 + 1,
            dx: Math.random() * 2 - 1,
            dy: Math.random() * 2 - 1,
            color: Math.random() > 0.5 ? '#00ffcc' : '#ff00ff'
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let particle of particles) {
            particle.x += particle.dx;
            particle.y += particle.dy;
            if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        }
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

initParticles('particleCanvas');
initParticles('particleCanvas2');

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
    messagesDiv.innerHTML = "";
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
