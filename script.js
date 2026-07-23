// Game State Core Variables
let score = 0;
let clickPower = 1;
let autoProduction = 0;

// Dynamic Scaling Costs
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

// Open/Close Shop Interactions
shopToggleBtn.addEventListener('click', () => shopMenu.classList.add('open'));
shopCloseBtn.addEventListener('click', () => shopMenu.classList.remove('open'));

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
        clickPower += 1; // Increases manual click yields by 1
        clickUpgradeCost = Math.round(clickUpgradeCost * 1.6); // Scale multiplier cost
        updateDisplay();
    }
});

// Shop Action: Purchase Better Auto-Clickers
buyAutoUpBtn.addEventListener('click', () => {
    if (score >= autoUpgradeCost) {
        score -= autoUpgradeCost;
        autoProduction += 1; // Increases automatic yield generation base
        autoUpgradeCost = Math.round(autoUpgradeCost * 1.5); // Scale auto cost
        updateDisplay();
    }
});

// Game Interval Loop Tick Engine (Executes Every Second)
setInterval(() => {
    if (autoProduction > 0) {
        score += autoProduction;
        updateDisplay();
    }
}, 1000);

// Initialize view variables upon file execution
updateDisplay();
