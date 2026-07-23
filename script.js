// Game State Core Variables
let score = 0;
let clickPower = 1;
let autoProduction = 0;

// Dynamic Scaling Base Costs
let clickUpgradeCost = 15;
let autoUpgradeCost = 50;

// Track redeemed codes so they can't be used twice
let usedCodes = [];

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

// NEW: Promo Code DOM Components
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
        // Clear old code alerts when opening settings
        codeMessage.innerText = "";
        promoCodeInput.value = "";
    }
});
settingsCloseBtn.addEventListener('click', () => settingsMenu.classList.remove('open'));

// Main Refresh Engine
function updateDisplay() {
    scoreDisplay.innerText = Math.floor(score);
    ppsDisplay.innerText = `${autoProduction} per second`;
    
    buyClickUpBtn.disabled = score < clickUpgradeCost;
    buyClickUpBtn.innerHTML = `Quantum Tap (+1/click)<br><span class="cost">Cost: ${clickUpgradeCost}</span>`;
    
    buyAutoUpBtn.disabled = score < autoUpgradeCost;
    buyAutoUpBtn.innerHTML = `Mini Singularity (+1/sec)<br><span class="cost">Cost: ${autoUpgradeCost}</span>`;
}

// Interactive Manual Clicking Action
clickBtn.addEventListener('click', () => {
    score += clickPower;
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

// ==========================================
// PROMO CODE LOGIC HOOKS
// ==========================================
promoCodeBtn.addEventListener('click', () => {
    const enteredCode = promoCodeInput.value.trim().toUpperCase();
    
    if (enteredCode === "") return;

    // Check if code has already been redeemed
    if (usedCodes.includes(enteredCode)) {
        codeMessage.style.color = "#ef4444"; // Red text
        codeMessage.innerText = "CODE ALREADY REDEEMED!";
        return;
    }

    // LIST OF ACTIVE CODES: Add or change secret phrases here!
    if (enteredCode === "NEBULA") {
        score += 500; // Gives 500 dark matter
        successfulRedeem(enteredCode, "Gained 500 Dark Matter!");
    } 
    else if (enteredCode === "VOID") {
        score += 5000; // Gives 5000 dark matter
        successfulRedeem(enteredCode, "Gained 5,000 Dark Matter!");
    }
    else if (enteredCode === "CHEATER") {
        clickPower += 10; // Instantly gives massive click strength
        successfulRedeem(enteredCode, "Quantum Tap boosted +10!");
    }
    else {
        codeMessage.style.color = "#ef4444";
        codeMessage.innerText = "INVALID QUANTUM CODE!";
    }
    
    promoCodeInput.value = ""; // Clear input field box after submit
});

function successfulRedeem(code, successText) {
    usedCodes.push(code); // Lock code out from future use
    codeMessage.style.color = "#00ffcc"; // Neon cyan success text
    codeMessage.innerText = `SUCCESS: ${successText}`;
    updateDisplay();
    saveGame();
}
// ==========================================


// ==========================================
// LOCAL STORAGE SAVING & LOADING SYSTEM
// ==========================================
function saveGame() {
    const gameState = {
        score: score,
        clickPower: clickPower,
        autoProduction: autoProduction,
        clickUpgradeCost: clickUpgradeCost,
        autoUpgradeCost: autoUpgradeCost,
        usedCodes: usedCodes // Saves your code history safely
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
        usedCodes = gameState.usedCodes || []; // Restores your code history on boot
    }
}

hardResetBtn.addEventListener('click', () => {
    const confirmReset = confirm("Are you completely sure you want to collapse reality? This deletes ALL your progress permanently.");
    
    if (confirmReset) {
        localStorage.removeItem('blackholeClickerSave');
        
        score = 0;
        clickPower = 1;
        autoProduction = 0;
        clickUpgradeCost = 15;
        autoUpgradeCost = 50;
        usedCodes = []; // Wipes used codes list so they can be tested again
        
        settingsMenu.classList.remove('open');
        updateDisplay();
    }
});
// ==========================================

// Game Interval Loops
setInterval(() => {
    if (autoProduction > 0) {
        score += autoProduction;
        updateDisplay();
    }
}, 1000);

setInterval(() => {
    saveGame();
}, 5000);

// Initialize Game Execution
loadGame();
updateDisplay();
