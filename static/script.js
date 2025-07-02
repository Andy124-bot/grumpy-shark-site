
document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript loaded!");

    const readBtn = document.getElementById("read-btn");
    const stopBtn = document.getElementById("stop-btn");

    // ✅ Feature Check
    if (!('speechSynthesis' in window)) {
        if (readBtn) {
            readBtn.addEventListener("click", () => {
                alert("🔇 Voice narration isn't supported on this device or browser.");
            });
        }
        return; // Abort narration setup
    }

    // 🍎 Optional: iOS friendly heads-up
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS && readBtn) {
        readBtn.addEventListener("click", () => {
            alert("📱 Voice narration may not work on iPhones due to Safari limitations.");
        });
    }

    // 🎙️ Narration functions
    function speakText(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-AU';
        speechSynthesis.speak(utterance);
    }

    function narratePage() {
        const main = document.querySelector('main');
        if (main) {
            speakText(main.innerText);
            readBtn.classList.add("speaking");
        }
    }

    function stopNarration() {
        speechSynthesis.cancel();
        readBtn.classList.remove("speaking");
    }

    if (readBtn) {
        readBtn.addEventListener("click", narratePage);
        console.log("✅ Read button is ready!");
    }

    if (stopBtn) {
        stopBtn.addEventListener("click", stopNarration);
        console.log("✅ Stop button is ready!");
    }
});
// 📦 DOM-related scripts
document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript loaded!");

    // 📩 Auto-fill Contact Form
    const urlParams = new URLSearchParams(window.location.search);
    const subjectParam = urlParams.get("subject");
    const bodyParam = urlParams.get("body");

    if (subjectParam) {
        const subjectField = document.getElementById("subject");
        if (subjectField) subjectField.value = subjectParam;
    }

    if (bodyParam) {
        const messageField = document.getElementById("message");
        if (messageField) messageField.value = bodyParam;
    }

    // 📩 Email form handling
    const confirmationMessage = document.getElementById("confirmation-message");
    const emailLink = document.getElementById("send-email-link");

    if (emailLink) {
        emailLink.addEventListener("click", function () {
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;

            if (!name || !email || !message) {
                alert("Please fill in all fields before sending!");
                return;
            }

            const mailtoLink = `mailto:grumpsharkwebsite@gmail.com` +
                `?subject=Contact%20Grumpy%20Shark` +
                `&body=Name:%20${encodeURIComponent(name)}%0A` +
                `Email:%20${encodeURIComponent(email)}%0A` +
                `Message:%20${encodeURIComponent(message)}`;

            window.location.href = mailtoLink;

            confirmationMessage.textContent =
                "📬 Your email app should now be open—click Send to complete your message.";
            confirmationMessage.classList.remove("hidden");

            setTimeout(() => confirmationMessage.classList.add("hidden"), 6000);
        });
    }

    // 🌊 Fade-in sections on scroll
    const sections = document.querySelectorAll(".section");

    function revealSections() {
        sections.forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                section.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", revealSections);
    revealSections();

    // 🎨 Button hover effect
    const buttons = document.querySelectorAll(".button");

    buttons.forEach((button) => {
        button.addEventListener("mouseover", function () {
            button.style.transform = "scale(1.1)";
            button.style.boxShadow = "0 4px 10px rgba(0, 102, 255, 0.5)";
        });

        button.addEventListener("mouseout", function () {
            button.style.transform = "scale(1)";
            button.style.boxShadow = "none";
        });
    });

    // 🐠 Floating sway animation
    const floatingElements = document.querySelectorAll(".oceanic-transition");

    function animateFloatingElements() {
        floatingElements.forEach((element) => {
            let position = 0;
            let direction = 1;

            setInterval(() => {
                position += direction * 0.5;
                element.style.transform = `translateY(${position}px)`;

                if (position > 5 || position < -5) {
                    direction *= -1;
                }
            }, 100);
        });
    }

    animateFloatingElements();
});

// === Snap Card Game ===

const characters = [
    'jasmine.png',
    'dad_gill.png',
    'maz.png',
    'grumpy.png',
    'bon-bon.png',
    'craig.png',
    'destiny.png',
    'maz-hiding.png',
    'irene_lightfish.png',
    'jack_gill.png',
    'jada.png',
    'jessica.png',
    'kristine.png',
    'lacy.png',
    'lisa.png',
    'matilda.png',
    'mckenna.png',
    'mum_gill.png',
    'ollie.png',
    'orion.png',
    'pauline.png',
    'polly.png',
    'puffy.png',
    'ronnie.png',
    'rylee.png',
];

let deck = [];
let playerPile = [];
let cpuPile = [];
let currentCards = [];
let turnInterval;
let isMatch = false;

function startGame() {
    // Create duplicated deck
    deck = [...characters, ...characters];
    deck = shuffle(deck);

    playerPile = [];
    cpuPile = [];
    currentCards = [];
    isMatch = false;

    document.getElementById("game-message").textContent = "Game started!";

    playTurn();
    turnInterval = setInterval(playTurn, 1500);
}

function shuffle(arr) {
    // Fisher-Yates Shuffle
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function playTurn() {
    if (deck.length === 0) {
        clearInterval(turnInterval);
        document.getElementById("game-message").textContent =
            playerPile.length > cpuPile.length ? "🎉 You win!" : "🤖 CPU wins!";
        return;
    }

    const playerCard = deck.pop();
    const cpuCard = deck.pop();

    currentCards = [playerCard, cpuCard];

    document.querySelector(".player-card").style.backgroundImage = `url('characters/${playerCard}')`;
    document.querySelector(".cpu-card").style.backgroundImage = `url('characters/${cpuCard}')`;

    if (playerCard === cpuCard) {
        isMatch = true;
        document.getElementById("game-message").textContent = "💥 Match! Tap SNAP!";
        // If user doesn't snap within 1s, CPU takes it
        setTimeout(() => {
            if (isMatch) {
                cpuPile.push(playerCard, cpuCard);
                document.getElementById("game-message").textContent = "⏱ Too slow! CPU got it.";
                isMatch = false;
            }
        }, 1200);
    } else {
        isMatch = false;
        document.getElementById("game-message").textContent = "🤔 Waiting...";
    }
}

function playerSnap() {
    if (isMatch) {
        playerPile.push(...currentCards);
        document.getElementById("game-message").textContent = "👏 Nice snap!";
        isMatch = false;
    } else {
        document.getElementById("game-message").textContent = "😬 No match to snap!";
    }
}