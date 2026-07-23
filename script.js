let score = 0;
let autoClickers = 0;
let autoClickerCost = 10;

const scoreDisplay = document.getElementById('score');
const clickBtn = document.getElementById('click-btn');
const buyAutoBtn = document.getElementById('buy-auto');

function updateDisplay() {
    scoreDisplay.innerText = score;
    buyAutoBtn.disabled = score < autoClickerCost;
    buyAutoBtn.innerText = `Create Mini Singularity (Cost: ${autoClickerCost})`;
}

clickBtn.addEventListener('click', () => {
    score++;
    updateDisplay();
});

buyAutoBtn.addEventListener('click', () => {
    if (score >= autoClickerCost) {
        score -= autoClickerCost;
        autoClickers++;
        autoClickerCost = Math.round(autoClickerCost * 1.5);
        updateDisplay();
    }
});

setInterval(() => {
    if (autoClickers > 0) {
        score += autoClickers;
        updateDisplay();
    }
}, 1000);
