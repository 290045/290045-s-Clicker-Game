document.addEventListener("DOMContentLoaded", () => {
    console.log("SCRIPT LOADED ✅");

    // Game state
    let score = 0;
    let clickPower = 1;
    let autoProduction = 0;

    // DOM elements
    const scoreDisplay = document.getElementById("score");
    const ppsDisplay = document.getElementById("pps-display");
    const clickBtn = document.getElementById("click-btn");

    const shopMenu = document.getElementById("shop-menu");
    const shopToggleBtn = document.getElementById("shop-toggle-btn");
    const shopCloseBtn = document.getElementById("shop-close-btn");

    const settingsMenu = document.getElementById("settings-menu");
    const settingsToggleBtn = document.getElementById("settings-toggle-btn");
    const settingsCloseBtn = document.getElementById("settings-close-btn");
    const hardResetBtn = document.getElementById("hard-reset-btn");

    const promoCodeInput = document.getElementById("promo-code-input");
    const promoCodeBtn = document.getElementById("promo-code-btn");
    const codeMessage = document.getElementById("code-message");

    // Toggle menus
    shopToggleBtn.addEventListener("click", () => {
        shopMenu.classList.toggle("open");
        settingsMenu.classList.remove("open");
    });
    shopCloseBtn.addEventListener("click", () => shopMenu.classList.remove("open"));

    settingsToggleBtn.addEventListener("click", () => {
        settingsMenu.classList.toggle("open");
        shopMenu.classList.remove("open");
        codeMessage.innerText = "";
        promoCodeInput.value = "";
    });
    settingsCloseBtn.addEventListener("click", () => settingsMenu.classList.remove("open"));

    // Click button (black hole)
    clickBtn.addEventListener("click", (event) => {
        score += clickPower;
        spawnFloatingText(event, `+${clickPower}`);
        updateDisplay();
    });

    // Auto production
    setInterval(() => {
        score += autoProduction;
        updateDisplay();
    }, 1000);

    // Promo code
    promoCodeBtn.addEventListener("click", () => {
        const code = promoCodeInput.value.trim().toUpperCase();
        if (code === "BIGBANG") {
            score += 100000;
            codeMessage.innerText = "✨ CODE ACCEPTED: +100,000 Dark Matter!";
        } else {
            codeMessage.innerText = "❌ INVALID CODE";
        }
        updateDisplay();
    });

    // Hard reset
    hardResetBtn.addEventListener("click", () => {
        if (confirm("Are you sure? This will delete ALL progress.")) {
            score = 0;
            clickPower = 1;
            autoProduction = 0;
            updateDisplay();
        }
    });

    // Floating text
    function spawnFloatingText(event, displayText) {
        const textNode = document.createElement("span");
        textNode.innerText = displayText;
        textNode.style.position = "fixed";
        textNode.style.left = `${event.clientX}px`;
        textNode.style.top = `${event.clientY}px`;
        textNode.style.color = "#e0aa85";
        textNode.style.fontWeight = "bold";
        textNode.style.fontSize = "1.3rem";
        textNode.style.pointerEvents = "none";
        textNode.style.zIndex = "999";
        textNode.style.textShadow = "0 0 8px rgba(224, 170, 133, 0.8)";
        textNode.style.transition = "transform 0.8s, opacity 0.8s";
        document.body.appendChild(textNode);
        requestAnimationFrame(() => {
            textNode.style.transform = "translate(-50%, -60px)";
            textNode.style.opacity = "0";
        });
        setTimeout(() => textNode.remove(), 800);
    }

    // Update display
    function updateDisplay() {
        scoreDisplay.innerText = score.toLocaleString();
        ppsDisplay.innerText = `${autoProduction.toLocaleString()} per second`;
    }

    updateDisplay();
});
