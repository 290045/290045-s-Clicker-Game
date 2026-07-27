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

// MULTI-LAYER PRESTIGE INFRASTRUCTURE
let rebirths = 0;
let rebirthRequirement = 10000;

let ascensions = 0;
let ascensionRequirement = 10;

let prestiges = 0;
let prestigeRequirement = 5;

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
                    • <b>Smooth Tick Engine:</b> Upgraded loop structure directly tracking CPS changes.<br>
                    • <b>Prestige Layers:</b> Added Rebirths, Ascensions, and Reality Prestiges!
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

function getPrestigeMultiplier() {
    let multiplier = 1;
    multiplier += rebirths * 0.15;
    multiplier *= Math.pow(2, ascensions);
    multiplier *= Math.pow(5, prestiges);
    return multiplier;
}

// Main Refresh Engine
function updateDisplay() {
    const activeMultiplier = getPrestigeMultiplier();
    const activeCPS = autoProduction * activeMultiplier;
    
    scoreDisplay.innerText = Math.floor(score).toLocaleString();
    ppsDisplay.innerText = `${activeCPS.toFixed(1)} per second`;
    
    buyClickUpBtn.disabled = score < clickUpgradeCost;
    buyClickUpBtn.innerHTML = `Quantum Tap (+1/click)<br><span class="cost">Cost: ${clickUpgradeCost.toLocaleString()}</span>`;
    
    buyAutoUpBtn.disabled = score < autoUpgradeCost;
    buyAutoUpBtn.innerHTML = `Mini Singularity (+1/sec)<br><span class="cost">Cost: ${autoUpgradeCost.toLocaleString()}</span>`;
    
    refreshPrestigeUI();
}

// Interactive Manual Clicking Action
clickBtn.addEventListener('click', (e) => {
    const activeMultiplier = getPrestigeMultiplier();
    const finalClickValue = clickPower * activeMultiplier;
    
    score += finalClickValue;
    spawnFloatingText(e, `+${Math.floor(finalClickValue)}`);
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

// DYNAMIC PRESTIGE ENGINE HOOKS
function refreshPrestigeUI() {
    let prestigeWrapper = document.getElementById('prestige-shop-section');
    if (!prestigeWrapper) {
        prestigeWrapper = document.createElement('div');
        prestigeWrapper.id = 'prestige-shop-section';
        prestigeWrapper.className = 'shop-section';
        shopMenu.appendChild(prestigeWrapper);
    }
    
    rebirthRequirement = Math.round(10000 * Math.pow(2.5, rebirths));
    
    prestigeWrapper.innerHTML = `
        <h3>Prestige Pathways</h3>
        <p style="font-size:0.8rem; color:#888; margin:5px 0 12px 0;">Active Multiplier: <b>x${getPrestigeMultiplier().toFixed(2)}</b></p>
        
        <button id="rebirth-btn" class="shop-btn" ${score < rebirthRequirement ? 'disabled' : ''} style="margin-bottom:10px;">
            🌌 Initiate Rebirth (+1)<br><span class="cost">Requires: ${rebirthRequirement.toLocaleString()} Matter</span>
        </button>
        <p style="font-size:0.75rem; color:#00ffcc; margin:-5px 0 10px 5px;">Current Rebirths: ${rebirths}</p>

        <button id="ascension-btn" class="shop-btn" ${rebirths < ascensionRequirement ? 'disabled' : ''} style="margin-bottom:10px; border-color:#00ffcc; color:#00ffcc;">
            🌟 Ascend Reality<br><span class="cost" style="color:#fff;">Requires: ${ascensionRequirement} Rebirths</span>
        </button>
        <p style="font-size:0.75rem; color:#b54fff; margin:-5px 0 10px 5px;">Current Ascensions: ${ascensions}</p>

        <button id="prestige-btn" class="shop-btn" ${ascensions < prestigeRequirement ? 'disabled' : ''} style="border-color:#ef4444; color:#ef4444;">
            👁️ Transcendent Prestige<br><span class="cost" style="color:#fff;">Requires: ${prestigeRequirement} Ascensions</span>
        </button>
        <p style="font-size:0.75rem; color:#ef4444; margin:5px 0 0 5px;">Current Prestiges: ${prestiges}</p>
    `;

    document.getElementById('rebirth-btn').addEventListener('click', executeRebirth);
    document.getElementById('ascension-btn').addEventListener('click', executeAscension);
    document.getElementById('prestige-btn').addEventListener('click', executePrestigeReset);
    
    applyMilestoneCosmetics();
}

function executeRebirth() {
    if (score >= rebirthRequirement) {
        rebirths += 1;
        score = 0;
        clickPower = 1;
        autoProduction = 0;
        clickUpgradeCost = 15;
        autoUpgradeCost = 50;
        
        shopMenu.classList.remove('open');
        updateDisplay();
        saveGame();
        alert("✨ Reality folded! Your matter has consolidated into cosmic rebirth resonance (+15% Production Boost).");
    }
}

function executeAscension() {
    if (rebirths >= ascensionRequirement) {
        ascensions += 1;
        rebirths = 0;
        score = 0;
        clickPower = 1;
        autoProduction = 0;
        clickUpgradeCost = 15;
