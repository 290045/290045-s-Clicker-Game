document.addEventListener("DOMContentLoaded", () => {

    // Current Application Engine Patch Configuration
    const CURRENT_VERSION = "1.2.0";

    // Game State Core Variables
    let score = 0;
    let clickPower = 1;
    let autoProduction = 0;

    // FIXED: String-based tracking completely prevents broken brackets or punctuation errors!
    let usedCodes = "NONE";

    // ==========================================
    // 🌌 THE MASSIVE UPGRADE REGISTRY DATABASE
    // ==========================================
    let upgrades = [
        // --- MANUAL CLICK UPGRADES ---
        { id: "click_1", name: "Quantum Tap", type: "click", baseCost: 15, currentCost: 15, power: 1, count: 0, description: "+1 per click" },
        { id: "click_2", name: "Subatomic Friction", type: "click", baseCost: 250, currentCost: 250, power: 5, count: 0, description: "+5 per click" },
        { id: "click_3", name: "Event Horizon Anchor", type: "click", baseCost: 2500, currentCost: 2500, power: 25, count: 0, description: "+25 per click" },
        { id: "click_4", name: "Wormhole Puncher", type: "click", baseCost: 25000, currentCost: 25000, power: 150, count: 0, description: "+150 per click" },

        // --- TIER 1 AUTOMATION ---
        { id: "auto_1", name: "Mini Singularity", type: "auto", baseCost: 50, currentCost: 50, power: 1, count: 0, description: "+1 Dark Matter/sec" },
        { id: "auto_2", name: "Orbital Dust Vacuum", type: "auto", baseCost: 400, currentCost: 400, power: 5, count: 0, description: "+5 Dark Matter/sec" },
        { id: "auto_3", name: "Asteroid Driller", type: "auto", baseCost: 3000, currentCost: 3000, power: 25, count: 0, description: "+25 Dark Matter/sec" },
        { id: "auto_4", name: "Nebula Scoop", type: "auto", baseCost: 18000, currentCost: 18000, power: 120, count: 0, description: "+120 Dark Matter/sec" },

        // --- TIER 2 AUTOMATION ---
        { id: "auto_5", name: "Moon Cracker", type: "auto", baseCost: 95000, currentCost: 95000, power: 600, count: 0, description: "+600 Dark Matter/sec" },
        { id: "auto_6", name: "Gas Giant Siphon", type: "auto", baseCost: 550000, currentCost: 550000, power: 3200, count: 0, description: "+3,200 Dark Matter/sec" },
        { id: "auto_7", name: "Solar Satellite Array", type: "auto", baseCost: 4000000, currentCost: 4000000, power: 18000, count: 0, description: "+18,000 Dark Matter/sec" },
        { id: "auto_8", name: "Dyson Swarm Fleet", type: "auto", baseCost: 35000000, currentCost: 35000000, power: 110000, count: 0, description: "+110,000 Dark Matter/sec" }
    ];

    // DOM Interface Elements
    const scoreDisplay = document.getElementById('score');
    const ppsDisplay = document.getElementById('pps-display');
    const clickBtn = document.getElementById('click-btn');

    // Shop UI Target Structural Nodes
    const shopMenu = document.getElementById('shop-menu');
    const shopToggleBtn = document.getElementById('shop-toggle-btn');
    const shopCloseBtn = document.getElementById('shop-close-btn');
    const manualContainer = document.getElementById('manual-upgrades-container');
    const automatedContainer = document.getElementById('automated-upgrades-container');

    // Settings UI Interface Components
    const settingsMenu = document.getElementById('settings-menu');
    const settingsToggleBtn = document.getElementById('settings-toggle-btn');
    const settingsCloseBtn = document.getElementById('settings-close-btn');
    const hardResetBtn = document.getElementById('hard-reset-btn');

    // Promo Code DOM Components
    const promoCodeInput = document.getElementById('promo-code-input');
    const promoCodeBtn = document.getElementById('promo-code-btn');
    const codeMessage = document.getElementById('code-message');

    // Toggle Function Panels
    shopToggleBtn.addEventListener('click', () => {
        shopMenu.classList.toggle('open');
        settingsMenu.classList.remove('open');
    });

    shopCloseBtn.addEventListener('click', () => shopMenu.classList.remove('open'));

    settingsToggleBtn.addEventListener('click', () => {
        settingsMenu.classList.toggle('open');
        shopMenu.classList.remove('open');
        codeMessage.innerText = "";
        promoCodeInput.value = "";
    });

    settingsCloseBtn.addEventListener('click', () => settingsMenu.classList.remove('open'));

    // DYNAMIC VERSION NOTIFICATION MODAL
    function checkEngineVersionPatch() {
        const savedPatch = localStorage.getItem('blackholeClickerVersion');
        if (savedPatch !== CURRENT_VERSION) {
            const patchOverlay = document.createElement('div');
            patchOverlay.style = `
                position:fixed; top:0; left:0; width:100vw; height:100vh;
                background:rgba(5,2,15,0.95); z-index:9999;
                display:flex; justify-content:center; align-items:center;
                font-family:monospace; color:#00ffcc;
            `;

            patchOverlay.innerHTML = `
                <div style="border:2px solid #a124ff; padding:30px; border-radius:12px; background:#0b061a; max-width:450px; width:90%; box-shadow:0 0 30px rgba(161,36,255,0.5); text-align:center; pointer-events:auto;">
                    <h2 style="color:#a124ff; margin-top:0;">🚀 SYSTEM PATCH v${CURRENT_VERSION}</h2>
                    <div style="text-align:left; color:#fff; line-height:1.6; margin:20px 0; font-size:0.9rem;">
                        • <b>Massive Expansion:</b> Added 12 brand-new, scaling shop upgrades!<br>
                        • <b>Automated UI Spawning:</b> Upgrades are built dynamically via JavaScript loops.<br>
                        • <b>Inventory Tracker:</b> Buttons now display exactly how many modules you own.
                    </div>
                    <button id="close-patch-btn" style="background:#00ffcc; color:#000; border:none; padding:10px 25px; border-radius:6px; cursor:pointer; font-weight:bold; font-family:inherit;">SYNC DATAFEED</button>
                </div>
            `;
            document.body.appendChild(patchOverlay);

            document.getElementById('close-patch-btn').addEventListener('click', () => {
                document.body.removeChild(patchOverlay);
                localStorage.setItem('blackholeClickerVersion', CURRENT_VERSION);
            });
        }
    }

    // FLOATING RISING TEXT ALGORITHM
    function spawnFloatingText(event, displayText) {
        const textNode = document.createElement('span');
        textNode.innerText = displayText;

        const clickX = event.clientX;
        const clickY = event.clientY;

        textNode.style.position = 'fixed';
        textNode.style.left = `${clickX}px`;
        textNode.style.top = `${clickY}px`;
        textNode.style.color = '#e0aa85';
        textNode.style.fontWeight = 'bold';
        textNode.style.fontSize = '1.3rem';
        textNode.style.pointerEvents = 'none';
        textNode.style.zIndex = '999';
        textNode.style.textShadow = '0 0 8px rgba(224, 170, 133, 0.8)';
        textNode.style.transition = 'transform 0.8s cubic-bezier(0.1, 0.8, 0.3, 1), opacity 0.8s ease';

        document.body.appendChild(textNode);

        requestAnimationFrame(() => {
            textNode.style.transform = 'translate(-50%, -60px)';
            textNode.style.opacity = '0';
        });

        setTimeout(() => {
            if (textNode.parentNode) {
                document.body.removeChild(textNode);
            }
        }, 800);
    }

    // ==========================================
    // 🛠️ AUTOMATED SHOP RENDERING SYSTEM
    // ==========================================
    function buildShopInterfaceButtons() {
        manualContainer.innerHTML = "";
        automatedContainer.innerHTML = "";

        upgrades.forEach((upgrade) => {
            const btn = document.createElement('button');
            btn.id = `btn-${upgrade.id}`;
            btn.className = 'shop-btn';
            btn.style.marginBottom = '12px';

            btn.innerHTML = `
                ${upgrade.name} (${upgrade.count})<br>
                <small style="color:#888; font-size:0.75rem;">${upgrade.description}</small><br>
                <span class="cost">Cost: ${Math.floor(upgrade.currentCost).toLocaleString()}</span>
            `;

            btn.addEventListener('click', () => buyUpgradeModule(upgrade));

            if (upgrade.type === 'click') {
                manualContainer.appendChild(btn);
            } else {
                automatedContainer.appendChild(btn);
            }
        });
    }

    function buyUpgradeModule(upgrade) {
        if (score >= upgrade.currentCost) {
            score -= upgrade.currentCost;
            upgrade.count += 1;

            if (upgrade.type === 'click') {
                clickPower += upgrade.power;
            } else {
                autoProduction += upgrade.power;
            }

            upgrade.currentCost = Math.round(upgrade.baseCost * Math.pow(1.5, upgrade.count));

            updateDisplay();
            saveGame();
        }
    }

    // ==========================================

    // Main Refresh Engine
    function updateDisplay() {
        scoreDisplay.innerText = Math.floor(score).toLocaleString();
        ppsDisplay.innerText = `${autoProduction.toLocaleString()} per second`;

        upgrades.forEach((upgrade) => {
            const btn = document.getElementById(`btn-${upgrade.id}`);
            if (btn) {
                btn.disabled = score < upgrade.currentCost;
            }
        });
    }

    // CLICK BUTTON
    clickBtn.addEventListener("click", (event) => {
        score += clickPower;
        spawnFloatingText(event, `+${clickPower}`);
        updateDisplay();
    });

    // AUTO PRODUCTION ENGINE
    setInterval(() => {
        score += autoProduction;
        updateDisplay();
    }, 1000);

    // SAVE SYSTEM
    function saveGame() {
        const data = {
            score,
            clickPower,
            autoProduction,
            upgrades,
            usedCodes
        };
        localStorage.setItem("blackholeSave", JSON.stringify(data));
    }

    // LOAD SYSTEM
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
    }

    // HARD RESET
    hardResetBtn.addEventListener("click", () => {
        if (confirm("Are you sure? This will delete ALL progress.")) {
            localStorage.removeItem("blackholeSave");
            location.reload();
        }
    });

    // PROMO CODE SYSTEM
    promoCodeBtn.addEventListener("click", () => {
        const code = promoCodeInput.value.trim().toUpperCase();

        if (code === "RELEASE") {
            score += 1000;
            codeMessage.innerText = "✨ CODE ACCEPTED: +1,000 Dark Matter!";
        } else {
            codeMessage.innerText = "❌ INVALID CODE";
        }

        updateDisplay();
        saveGame();
    });

    // INITIALIZE GAME
    loadGame();
    buildShopInterfaceButtons();
    updateDisplay();
    checkEngineVersionPatch();

});
