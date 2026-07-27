document.addEventListener("DOMContentLoaded", () => {
    console.log("SCRIPT LOADED ✅");

    // Game State
    let score = 0;
    let clickPower = 1;
    let autoProduction = 0;
    let usedCodes = "NONE";

    // Upgrade Registry
    let upgrades = [
        { id: "click_1", name: "Quantum Tap", type: "click", baseCost: 15, currentCost: 15, power: 1, count: 0, description: "+1 per click" },
        { id: "click_2", name: "Subatomic Friction", type: "click", baseCost: 250, currentCost: 250, power: 5, count: 0, description: "+5 per click" },
        { id: "click_3", name: "Event Horizon Anchor", type: "click", baseCost: 2500, currentCost: 2500, power: 25, count: 0, description: "+25 per click" },
        { id: "click_4", name: "Wormhole Puncher", type: "click", baseCost: 25000, currentCost: 25000, power: 150, count: 0, description: "+150 per click" },
        { id: "auto_1", name: "Mini Singularity", type: "auto", baseCost: 50, currentCost: 50, power: 1, count: 0, description: "+1 Dark Matter/sec" },
        { id: "auto_2", name: "Orbital Dust Vacuum", type: "auto", baseCost: 400, currentCost: 400, power: 5, count: 0, description: "+5 Dark Matter/sec" },
        { id: "auto_3", name: "Asteroid Driller", type: "auto", baseCost: 3000, currentCost: 3000, power: 25, count: 0, description: "+25 Dark Matter/sec" },
        { id: "auto_4", name: "Nebula Scoop", type: "auto", baseCost: 18000, currentCost: 18000, power: 120, count: 0, description: "+120 Dark Matter/sec" },
        { id: "auto_5", name: "Moon Cracker", type: "auto", baseCost: 95000, currentCost: 95000, power: 600, count: 0, description: "+600 Dark Matter/sec" },
        { id: "auto_6", name: "Gas Giant Siphon", type: "auto", baseCost: 550000, currentCost: 550000, power: 3200, count: 0, description: "+3,200 Dark Matter/sec" },
        { id: "auto_7", name: "Solar Satellite Array", type: "auto", baseCost: 4000000, currentCost: 4000000, power: 18000, count: 0, description: "+18,000 Dark Matter/sec" },
        { id: "auto_8", name: "Dyson Swarm Fleet", type: "auto", baseCost: 35000000, currentCost: 35000000, power: 110000, count: 0, description: "+110,000 Dark Matter/sec" }
    ];

    // DOM Elements
    const scoreDisplay = document.getElementById("score");
    const ppsDisplay = document.getElementById("pps-display");
    const clickBtn = document.getElementById("click-btn");

    const shopMenu = document.getElementById("shop-menu");
    const shopToggleBtn = document.getElementById("shop-toggle-btn");
    const shopCloseBtn = document.getElementById("shop-close-btn");
    const manualContainer = document.getElementById("manual-upgrades-container");
    const automatedContainer = document.getElementById("automated-upgrades-container");

    const settingsMenu = document.getElementById("settings-menu");
    const settingsToggleBtn = document.getElementById("settings-toggle-btn");
    const settingsCloseBtn = document.getElementById("settings-close-btn");
    const hardResetBtn = document.getElementById("hard-reset-btn");

    const promoCodeInput = document.getElementById("promo-code-input");
    const promoCodeBtn = document.getElementById("promo-code-btn");
    const codeMessage = document.getElementById("code-message");

    // Toggle Menus
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

    // Floating Text
    function spawnFloatingText(event, displayText) {
        const textNode = document.createElement("span");
        textNode.innerText = displayText;
        textNode.style.position = "fixed";
        textNode.style.left = `${event.clientX}px`;
        textNode.style.top = `${event.clientY}px`;
        textNode.style.color = "#b000ff";
        textNode.style.fontWeight = "bold";
        textNode.style.fontSize = "1.3rem";
        textNode.style.pointerEvents = "none";
        textNode.style.zIndex = "999";
        textNode.style.textShadow = "0 0 12px rgba(176,0,255,0.9)";
        textNode.style.transition = "transform 0.8s, opacity 0.8s";
        document.body.appendChild(textNode);
        requestAnimationFrame(() => {
            textNode.style.transform = "translate(-50%, -60px)";
            textNode.style.opacity = "0";
        });
        setTimeout(() => textNode.remove(), 800);
    }

    // Shop Rendering
    function buildShopInterfaceButtons() {
        manualContainer.innerHTML = "";
        automatedContainer.innerHTML = "";
        upgrades.forEach((upgrade) => {
            const btn = document.createElement("button");
            btn.id = `btn-${upgrade.id}`;
            btn.className = "shop-btn";
            btn.innerHTML = `
                ${upgrade.name} (${upgrade.count})<br>
                <small>${upgrade.description}</small><br>
                <span>Cost: ${Math.floor(upgrade.currentCost).toLocaleString()}</span>
            `;
            btn.addEventListener("click", () => buyUpgradeModule(upgrade));
            if (upgrade.type === "click") manualContainer.appendChild(btn);
            else automatedContainer.appendChild(btn);
        });
    }

    function buyUpgradeModule(upgrade) {
        if (score >= upgrade.currentCost) {
            score -= upgrade.currentCost;
            upgrade.count++;
            if (upgrade.type === "click") clickPower += upgrade.power;
            else autoProduction += upgrade.power;
            upgrade.currentCost = Math.round(upgrade.baseCost * Math.pow(1.5, upgrade.count));
            updateDisplay();
            saveGame();
            buildShopInterfaceButtons();
        }
    }

    // Display
    function updateDisplay() {
        scoreDisplay.innerText = Math.floor(score).toLocaleString();
        ppsDisplay.innerText = `${autoProduction.toLocaleString()} per second`;
        upgrades.forEach((upgrade) => {
            const btn = document.getElementById(`btn-${upgrade.id}`);
            if (btn) btn.disabled = score < upgrade.currentCost;
        });
    }

    // Click Button
    clickBtn.addEventListener("click", (event) => {
        score += clickPower;
        spawnFloatingText(event, `+${clickPower}`);
        updateDisplay();
        saveGame();
    });

    // Auto Production
    setInterval(() => {
        score += autoProduction;
        updateDisplay();
        saveGame();
    }, 1000);

    // Save/Load
    function saveGame() {
        const data = {
            score,
            clickPower,
            autoProduction,
            upgrades,
            usedCodes,
            lastSave: Date.now()
        };
        localStorage.setItem("blackholeSave", JSON.stringify(data));
    }

    function loadGame() {
        const data = JSON.parse(localStorage.getItem("blackholeSave"));
        if (!data) return;
        score = data.score;
        clickPower = data.clickPower;
        autoProduction = data.autoProduction;
        usedCodes = data.usedCodes;
        upgrades.forEach((u, i) => {
            upgrades[i].count = data.upgrades[i].count;
            upgrades[i].currentCost = data.upgrades[i].currentCost;
        });
        // Offline catch-up
        const elapsed = (Date.now() - data.lastSave) / 1000;
        score += elapsed * autoProduction;
    }

    // Hard Reset
    hardResetBtn.addEventListener("click", () => {
        if (confirm("Are you sure? This will delete ALL progress.")) {
            localStorage.removeItem("blackholeSave");
            location.reload();
        }
    });
    // Promo Codes
    promoCodeBtn.addEventListener("click", () => {
        const code = promoCodeInput.value.trim().toUpperCase();

        if (code === "RELEASE" && usedCodes.indexOf("RELEASE") === -1) {
            score += 1000;
            usedCodes += "RELEASE";
            codeMessage.innerText = "✨ CODE ACCEPTED: +1,000 Dark Matter!";
        } else {
            codeMessage.innerText = "❌ INVALID OR ALREADY USED CODE";
        }

        updateDisplay();
        saveGame();
    });

    // Initialize game on load
    loadGame();
    buildShopInterfaceButtons();
    updateDisplay();

    // Auto-save every 10 seconds
    setInterval(saveGame, 10000);
});
