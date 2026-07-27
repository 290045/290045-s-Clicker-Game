// Current Application Engine Patch Configuration
const CURRENT_VERSION = "1.1.0";

// Game State Core Variables
let score = 0;
let clickPower = 1;
let autoProduction = 0;

// Dynamic Scaling Base Costs
let clickUpgradeCost = 15;
let autoUpgradeCost = 50;

// Track redeemed codes
let usedCodes = ["INIT_BLOCK"];

// DOM Interface Elements
const scoreDisplay = document.getElementById('score');
const ppsDisplay = document.getElementById('pps-display');
const clickBtn = document.getElementById('click-btn');

// Shop UI Interface Components
const shopMenu = document.getElementById('shop-menu');
const shopToggleBtn = document.getElementById('shop-toggle-btn');
const shopCloseBtn = document.getElementById('shop-close-btn');
const buyClickUpBtn = document.getElementById('buy-click-up');
const buyAutoUpBtn = document.getElementById('buy-auto-up');

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
    if (shopMenu.classList.contains('open')) {
        shopMenu.classList.remove('open');
    } else {
        shopMenu.classList.add('open');
        settingsMenu.classList.remove('open');
    }
});
shopCloseBtn.addEventListener('click', () => shopMenu.classList.remove('open'));

settingsToggleBtn.addEventListener('click', () => {
    if (settingsMenu.classList.contains('open')) {
        settingsMenu.classList.remove('open');
    } else {
        settingsMenu.classList.add('open');
        shopMenu.classList.remove('open');
        codeMessage.innerText = "";
        promoCodeInput.value = "";
    }
});
settingsCloseBtn.addEventListener('click', () => settingsMenu.classList.remove('open'));

// DYNAMIC VERSION NOTIFICATION MODAL
function checkEngineVersionPatch() {
    const savedPatch = localStorage.getItem('blackholeClickerVersion');
    if (savedPatch !== CURRENT_VERSION) {
        const patchOverlay = document.createElement('div');
        patchOverlay.style = "position:fixed; top:0; left:0; width:100vw; height:100vh; background:rgba(5,2,15,0.95); z-index:9999; display:flex; justify-content:center; align-items:center; font-family:monospace; color:#00ffcc;";
        
        patchOverlay.innerHTML = `
            <div style="border:2px solid #a124ff; padding:30px; border-radius:12px; background:#0b061a; max-width:450px; width:90%; box-shadow:0 0 30px rgba(161,36,255,0.5); text-align:center; pointer-events:auto;">
                <h2 style="color:#a124ff; margin-top:0;">🚀 SYSTEM PATCH v${CURRENT_VERSION}</h2>
                <div style="text-align:left; color:#fff; line-height:1.6; margin:20px 0; font-size:0.9rem;">
                    • <b>Image-Free:</b> Core replaced with a pure CSS Singularity Anomaly.<br>
                    • <b>Floating Numbers:</b> Manual clicks now spawn real-time particle text.<br>
                    • <b>Smooth Tick Engine:</b> Upgraded loop structure tracking CPS seamlessly.
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
    textNode.style.color = '#00ffcc';
    textNode.style.fontWeight = 'bold';
    textNode.style.fontSize = '1.3rem';
    textNode.style.pointerEvents = 'none';
    textNode.style.zIndex = '999';
    textNode.style.textShadow = '0 0 8px rgba(0, 255, 204, 0.8)';
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

// Main Refresh Engine
function updateDisplay() {
    scoreDisplay.innerText = Math.floor(score).toLocaleString();
    ppsDisplay.innerText = `${autoProduction} per second`;
    
    buyClickUpBtn.disabled = score < clickUpgradeCost;
    buyClickUpBtn.innerHTML = `Quantum Tap (+1/click)<br><span class="cost">Cost: ${clickUpgradeCost.toLocaleString()}</span>`;
    
    buyAutoUpBtn.disabled = score < autoUpgradeCost;
    buyAutoUpBtn.innerHTML = `Mini Singularity (+1/sec)<br><span class="cost">Cost: ${autoUpgradeCost.toLocaleString()}</span>`;
}

// Interactive Manual Clicking Action
clickBtn.addEventListener('click', (e) => {
    score += clickPower;
    spawnFloatingText(e, `+${clickPower}`);
    updateDisplay();
});

// Shop Actions
buyClickUpBtn.addEventListener('click', () => {
    if (score >= clickUpgradeCost) {
        score -= clickUpgradeCost;
        clickPower += 1;
        clickUpgradeCost = Math.round(clickUpgradeCost * 1.6);
        updateDisplay();
        saveGame();
    }
});

buyAutoUpBtn.addEventListener('click', () => {
    if (score >= autoUpgradeCost) {
        score -= autoUpgradeCost;
        autoProduction += 1;
        autoUpgradeCost = Math.round(autoUpgradeCost * 1.5);
        updateDisplay();
        saveGame();
    }
});

// PROMO CODE LOGIC HOOKS
promoCodeBtn.addEventListener('click', () => {
    const enteredCode = promoCodeInput.value.trim().toUpperCase();
    
    if (enteredCode === "") return;

    if (usedCodes.includes(enteredCode)) {
        codeMessage.style.color = "#ef4444"; 
        codeMessage.innerText = "CODE ALREADY REDEEMED!";
        return;
    }

    if (enteredCode === "RELEASE!") {
        score += 500; 
        successfulRedeem(enteredCode, "Gained 500 Dark Matter!");
    } 
    else if (enteredCode === "SECRET") {
        clickPower += 10; 
        successfulRedeem(enteredCode, "Quantum Tap boosted +10!");
    }
    else {
        codeMessage.style.color = "#ef4444";
        codeMessage.innerText = "INVALID QUANTUM CODE!";
    }
    
    promoCodeInput.value = ""; 
});

function successfulRedeem(code, successText) {
    usedCodes.push(code); 
    codeMessage.style.color = "#00ffcc"; 
    codeMessage.innerText = `SUCCESS: ${successText}`;
    updateDisplay();
    saveGame();
}

// LOCAL STORAGE SYSTEM
function saveGame() {
    const gameState = {
        score: score,
        clickPower: clickPower,
        autoProduction: autoProduction,
        clickUpgradeCost: clickUpgradeCost,
        autoUpgradeCost: autoUpgradeCost,
        usedCodes: usedCodes
    };
    localStorage.setItem('blackholeClickerSave', JSON.stringify(gameState));
}

function loadGame() {
    const savedData = localStorage.getItem('blackholeClickerSave');
    if (savedData) {
        const gameState = JSON.parse(savedData);
        score = gameState.score || 0;
        clickPower = gameState.clickPower || 1;
        autoProduction = gameState.autoProduction || 0;
        clickUpgradeCost = gameState.clickUpgradeCost || 15;
        autoUpgradeCost = gameState.autoUpgradeCost || 50;
        usedCodes = gameState.usedCodes || ["INIT_BLOCK"];
    }
}

hardResetBtn.addEventListener('click', () => {
    const confirmReset = confirm("Are you completely sure you want to collapse reality? This deletes ALL your progress permanently.");
    if (confirmReset) {
        localStorage.removeItem('blackholeClickerSave');
        localStorage.removeItem('blackholeClickerVersion');
        
        score = 0;
        clickPower = 1;
        autoProduction = 0;
        clickUpgradeCost = 15;
        autoUpgradeCost = 50;
        usedCodes = ["INIT_BLOCK"];
        
        settingsMenu.classList.remove('open');
        updateDisplay();
    }
});

// UPGRADED TICK ENGINE
// Splitting production into 20 micro-ticks a second makes the counter climb smoothly
setInterval(() => {
    if (autoProduction > 0) {
        score += (autoProduction / 20);
        updateDisplay();
    }
}, 50);

// Save game progress data safely every 5 seconds
setInterval(() => {
    saveGame();
}, 5000);

// Initialize Game Execution
loadGame();
checkEngineVersionPatch();
updateDisplay();
