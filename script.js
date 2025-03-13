let cookies = 0;
let grandmas = 0;
let cats = 0;
let factories = 0;
let cookiesPerSecond = 0;
let cookiesPerClick = 1;

const achievements = [
  { name: "First Cookie!", condition: (cookies) => cookies >= 1, unlocked: false },
  { name: "10 Cookies!", condition: (cookies) => cookies >= 10, unlocked: false },
  { name: "100 Cookies!", condition: (cookies) => cookies >= 100, unlocked: false },
  { name: "First Grandma!", condition: (grandmas) => grandmas >= 1, unlocked: false },
  { name: "First Cat!", condition: (cats) => cats >= 1, unlocked: false },
  { name: "First Factory!", condition: (factories) => factories >= 1, unlocked: false },
  { name: "First Emoji Upgrade!", condition: (cookies) => cookies >= 20, unlocked: false },
  { name: "First Cursor Upgrade!", condition: (cookies) => cookies >= 30, unlocked: false },
];

document.getElementById("cookie").addEventListener("click", function () {
  cookies += cookiesPerClick;
  updateGame();
});

document.getElementById("grandma-upgrade").addEventListener("click", function () {
  if (cookies >= 10) {
    cookies -= 10;
    grandmas++;
    cookiesPerSecond += 1;
    updateGame();
    addEmoji("👵");
  }
});

document.getElementById("cat-upgrade").addEventListener("click", function () {
  if (cookies >= 50) {
    cookies -= 50;
    cats++;
    cookiesPerSecond += 5;
    updateGame();
    addEmoji("🐱");
  }
});

document.getElementById("factory-upgrade").addEventListener("click", function () {
  if (cookies >= 100) {
    cookies -= 100;
    factories++;
    cookiesPerSecond += 10;
    updateGame();
    addEmoji("🏭");
  }
});

document.getElementById("emoji-cookie-1").addEventListener("click", function () {
  if (cookies >= 20) {
    cookies -= 20;
    document.getElementById("cookie").textContent = "🍪";
    updateGame();
    addEmoji("🍪");
  }
});

document.getElementById("emoji-cookie-2").addEventListener("click", function () {
  if (cookies >= 50) {
    cookies -= 50;
    document.getElementById("cookie").textContent = "🍩";
    updateGame();
    addEmoji("🍩");
  }
});

document.getElementById("emoji-cookie-3").addEventListener("click", function () {
  if (cookies >= 100) {
    cookies -= 100;
    document.getElementById("cookie").textContent = "🍕";
    updateGame();
    addEmoji("🍕");
  }
});

document.getElementById("cursor-1").addEventListener("click", function () {
  if (cookies >= 30) {
    cookies -= 30;
    cookiesPerClick += 1;
    updateGame();
    addEmoji("🖱️");
  }
});

document.getElementById("cursor-2").addEventListener("click", function () {
  if (cookies >= 100) {
    cookies -= 100;
    cookiesPerClick += 2;
    updateGame();
    addEmoji("🖲️");
  }
});

document.getElementById("cursor-3").addEventListener("click", function () {
  if (cookies >= 500) {
    cookies -= 500;
    cookiesPerClick += 5;
    updateGame();
    addEmoji("👆");
  }
});

function updateGame() {
  document.getElementById("cookie-count").textContent = `Cookies: ${cookies}`;
  checkAchievements();
}

function checkAchievements() {
  const achievementsList = document.getElementById("achievements-list");
  achievementsList.innerHTML = "";

  achievements.forEach((achievement) => {
    if (!achievement.unlocked && achievement.condition(cookies, grandmas, cats, factories)) {
      achievement.unlocked = true;
      achievementsList.innerHTML += `<div>🎉 ${achievement.name}</div>`;
    }
  });
}

function addEmoji(emoji) {
  const emojiList = document.getElementById("emoji-list");
  const emojiItem = document.createElement("div");
  emojiItem.classList.add("emoji-item");
  emojiItem.textContent = emoji;
  emojiList.appendChild(emojiItem);
}

// Auto-generate cookies every second
setInterval(function () {
  cookies += cookiesPerSecond;
  updateGame();
}, 1000);