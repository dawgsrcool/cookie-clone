let cookies = 0;
let cookiesPerClick = 1;
let autoClickers = 0;
let grandmas = 0;
let factories = 0;

let upgradeClickCost = 10;
let autoClickerCost = 50;
let grandmaCost = 100;
let factoryCost = 500;

let achievements = {
    "First Click": { earned: false, condition: (cookies) => cookies >= 1 },
    "100 Cookies": { earned: false, condition: (cookies) => cookies >= 100 },
    "500 Cookies": { earned: false, condition: (cookies) => cookies >= 500 },
    "Auto-Clicker Owner": { earned: false, condition: () => autoClickers >= 1 },
    "Grandma Lover": { earned: false, condition: () => grandmas >= 1 },
    "Factory Tycoon": { earned: false, condition: () => factories >= 1 },
};

// Update the score display
function updateScore() {
    document.getElementById("score").textContent = `Cookies: ${cookies}`;
    checkAchievements();
}

// Handle cookie clicks
function clickCookie() {
    cookies += cookiesPerClick;
    updateScore();
    createFloatingCookie();
}

// Create a floating cookie animation
function createFloatingCookie() {
    const cookie = document.createElement("div");
    cookie.textContent = "🍪";
    cookie.classList.add("cookie-float");
    cookie.style.left = `${Math.random() * 80 + 10}%`;
    document.body.appendChild(cookie);
    setTimeout(() => cookie.remove(), 1000);
}

// Buy upgrades
function buyUpgrade(type) {
    let cost = 0;
    switch (type) {
        case "click":
            cost = upgradeClickCost;
            if (cookies >= cost) {
                cookies -= cost;
                cookiesPerClick += 1;
                upgradeClickCost *= 2;
                document.getElementById("upgrade-click").textContent = `Upgrade Click (Cost: ${upgradeClickCost})`;
            }
            break;
        case "auto":
            cost = autoClickerCost;
            if (cookies >= cost) {
                cookies -= cost;
                autoClickers += 1;
                autoClickerCost *= 2;
                document.getElementById("upgrade-auto").textContent = `Buy Auto-Clicker (Cost: ${autoClickerCost})`;
            }
            break;
        case "grandma":
            cost = grandmaCost;
            if (cookies >= cost) {
                cookies -= cost;
                grandmas += 1;
                grandmaCost *= 2;
                document.getElementById("upgrade-grandma").textContent = `Buy Grandma (Cost: ${grandmaCost})`;
            }
            break;
        case "factory":
            cost = factoryCost;
            if (cookies >= cost) {
                cookies -= cost;
                factories += 1;
                factoryCost *= 2;
                document.getElementById("upgrade-factory").textContent = `Buy Factory (Cost: ${factoryCost})`;
            }
            break;
    }
    updateScore();
}

// Auto-clicker and passive income logic
setInterval(() => {
    cookies += autoClickers; // Auto-clickers generate 1 cookie per second
    cookies += grandmas * 5; // Grandmas generate 5 cookies per second
    cookies += factories * 20; // Factories generate 20 cookies per second
    updateScore();
}, 1000);

// Check for achievements
function checkAchievements() {
    const achievementsList = document.getElementById("achievements-list");
    achievementsList.innerHTML = "";
    for (const [name, achievement] of Object.entries(achievements)) {
        if (!achievement.earned && achievement.condition(cookies)) {
            achievement.earned = true;
            const li = document.createElement("li");
            li.textContent = `Achievement Unlocked: ${name}`;
            achievementsList.appendChild(li);
        }
    }
}

// Initialize the game
updateScore();