// Game State Core Variables
let score = 0;
let clickPower = 1;
let autoProduction = 0;

// Dynamic Scaling Base Costs
let clickUpgradeCost = 15;
let autoUpgradeCost = 50;

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

// Toggle Function: Controls Shop Visibility States Safely
shopToggleBtn.addEventListener('click', () => {
    // If shop is already open, clicking again hides it cleanly
    if (shopMenu.classList.contains('open')) {
        shopMenu.classList.remove('open');
    } else {
        shopMenu.classList.add('open');
        settingsMenu.classList.remove('open'); // Auto hides open settings menu panel
    }
});
shopCloseBtn.addEventListener('click', () => shopMenu.classList.remove('open'));

// Toggle Function: Controls Settings Visibility States Safely
settingsToggleBtn.addEventListener('click', () => {
    // If settings is already open, clicking again hides it cleanly
    if (settingsMenu.classList.contains('open')) {
        settingsMenu.classList.remove('open');
    } else {
        settingsMenu.classList.add('open');
        shopMenu.classList.remove('open'); // Auto hides open shop menu panel
    }
});
settingsCloseBtn.addEventListener('click', () => settingsMenu.classList.remove('open'));

// Main Refresh Engine
function updateDisplay() {
    scoreDisplay.innerText = Math.floor(score);
    ppsDisplay.innerText = `${autoProduction} per second`;
    
    // Manage click upgrade visibility states
    buyClickUpBtn.disabled = score < clickUpgradeCost;
    buyClickUpBtn.innerHTML = `Quantum Tap (+1/click)<br><span class="cost">Cost: ${clickUpgradeCost}</span>`;
    
    // Manage auto upgrade visibility states
    buyAutoUpBtn.disabled = score < autoUpgradeCost;
    buyAutoUpBtn.innerHTML = `Mini Singularity (+1/sec)<br><span class="cost">Cost: ${autoUpgradeCost}</span>`;
}

// Interactive Manual Clicking Action
clickBtn.addEventListener('click', () => {
    score += clickPower;
    updateDisplay();
});

// Shop Action: Purchase Better Manual Clicks
buyClickUpBtn.addEventListener('click', () => {
    if (score >= clickUpgradeCost) {
        score -= clickUpgradeCost;
        clickPower += 1;
        clickUpgradeCost = Math.round(clickUpgradeCost * 1.6);
        updateDisplay();
        saveGame();
    }
});

// Shop Action: Purchase Better Auto-Clickers
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
// LOCAL STORAGE SAVING & LOADING SYSTEM
// ==========================================

function saveGame() {
    const gameState = {
        score: score,
        clickPower: clickPower,
        autoProduction: autoProduction,
        clickUpgradeCost: clickUpgradeCost,
        autoUpgradeCost: autoUpgradeCost
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
    }
}

// Settings Action: Hard Reset Game Progress
hardResetBtn.addEventListener('click', () => {
    const confirmReset = confirm("Are you completely sure you want to collapse reality? This deletes ALL your progress permanently.");
    
    if (confirmReset) {
        localStorage.removeItem('blackholeClickerSave');
        
        score = 0;
        clickPower = 1;
        autoProduction = 0;
        clickUpgradeCost = 15;
        autoUpgradeCost = 50;
        
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
