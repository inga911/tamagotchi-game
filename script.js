"use strict";
const start = document.querySelector('.start');
const selectAnimalContainer = document.querySelector('.select-animal');
const yourAnimal = document.querySelector('.your-animal');
const main = document.querySelector('.main');
const mainGame = document.querySelector('.main-game');
const gameLevelBox = document.querySelector('.level-box');
const healthPointsHTML = document.querySelector('.health-text');
const hungryLevelHTML = document.querySelector('.hungry-text');
const funAmountHTML = document.querySelector('.fun-text');
const sleepLevelHTML = document.querySelector('.sleep-text');
const healthPointsProgressBar = document.querySelector('.health-points');
const hungryLevelProgressBar = document.querySelector('.hungry-level');
const funAmountProgressBar = document.querySelector('.fun-amount');
const sleepLevelProgressBar = document.querySelector('.sleep-level');
const lifeTimer = document.querySelector('.life-timer');
const feedBtn = document.querySelector('.feed');
const playBtn = document.querySelector('.play');
const sleepBtn = document.querySelector('.sleep');
main.classList.add('d-none');
yourAnimal.classList.add('animation-move');
let hpLevel = 100;
let hungryLevel = 100;
let funLevel = 100;
let sleepLevel = 100;
let timer = 60;
let gameLevel = 1;
let timerInterval;
let hasDecreasedHP = false;
let yourAnimalSize = 40;
let yourAnimalTopPosition = 0;
healthPointsHTML.innerHTML = `Hp ${hpLevel}%`;
hungryLevelHTML.innerHTML = `Hungry ${hungryLevel}%`;
funAmountHTML.innerHTML = `Fun ${funLevel}%`;
sleepLevelHTML.innerHTML = `Sleep ${sleepLevel}%`;
gameLevelBox.innerHTML = `Level: ${gameLevel}`;
let animal = ['🐶', '🐱', '🦊', '🐼', '🐯', '🐮', '🦥', '🐇', '🦜', '🐠', '🐿', '🐉', '🦒', '🦓', '🦄', '🐧'];
for (let i = 0; i < animal.length; i++) {
    selectAnimalContainer.innerHTML += `
        <div class="animal-box">${animal[i]}</div>
        `;
}
const animalBoxes = selectAnimalContainer.querySelectorAll('.animal-box');
animalBoxes.forEach(a => {
    //@ts-ignore
    a.onclick = () => {
        start.classList.add('d-none');
        main.classList.remove('d-none');
        yourAnimal.innerHTML = `${a.textContent}`;
        yourAnimal.style.fontSize = `${yourAnimalSize}px`;
        yourAnimal.style.top = `${yourAnimalTopPosition}px`;
        startGame();
    };
});
function startGame() {
    timerInterval = setInterval(updateTimer, 1000);
}
function updateProgressBar(hp, bar, htmlEl) {
    bar.style.width = hp + '%';
    if (hp >= 75) {
        bar.style.backgroundColor = 'lightgreen';
    }
    else if (hp >= 45) {
        bar.style.backgroundColor = 'orange';
    }
    else if (hp >= 0) {
        bar.style.backgroundColor = 'crimson';
    }
    else {
        bar.style.backgroundColor = 'white';
    }
    updateBarsHtml(hp, htmlEl);
}
function updateBarsHtml(level, htmlEl) {
    htmlEl.innerHTML = `${htmlEl.classList.contains('health-text') ? 'Hp' : htmlEl.classList.contains('hungry-text') ? 'Hungry' : 'Fun'} ${level.toFixed(2)}%`;
}
updateProgressBar(hpLevel, healthPointsProgressBar, healthPointsHTML);
updateProgressBar(hungryLevel, hungryLevelProgressBar, hungryLevelHTML);
updateProgressBar(funLevel, funAmountProgressBar, funAmountHTML);
updateProgressBar(sleepLevel, sleepLevelProgressBar, sleepLevelHTML);
function endGame(message) {
    yourAnimal.classList.remove('animation-move');
    clearInterval(timerInterval);
    //@ts-ignore
    feedBtn.disabled = true;
    //@ts-ignore
    playBtn.disabled = true;
    alert(message);
    start.classList.remove('d-none');
    main.classList.add('d-none');
    location.reload();
}
function hungry() {
    hungryLevel -= 0.8;
    updateProgressBar(hungryLevel, hungryLevelProgressBar, hungryLevelHTML);
    if (hungryLevel <= 0) {
        hungryLevel = 0;
        updateProgressBar(hungryLevel, hungryLevelProgressBar, hungryLevelHTML);
        endGame('Game Over: Your pet has starved to death.');
        return;
    }
}
function sleep() {
    sleepLevel -= 1;
    updateProgressBar(sleepLevel, sleepLevelProgressBar, sleepLevelHTML);
    if (sleepLevel === 0) {
        sleepLevel = 0;
        hpLevel = 0;
        updateProgressBar(hpLevel, healthPointsProgressBar, healthPointsHTML);
        endGame('Game Over: Your pet has died because was too tired.');
        return;
    }
}
function fun() {
    funLevel -= 1.3;
    updateProgressBar(funLevel, funAmountProgressBar, funAmountHTML);
    if (funLevel <= 0) {
        funLevel = 0;
        if (!hasDecreasedHP) {
            hpLevel -= 20;
            hasDecreasedHP = true;
        }
        updateProgressBar(funLevel, funAmountProgressBar, funAmountHTML);
        updateProgressBar(hpLevel, healthPointsProgressBar, healthPointsHTML);
    }
    else {
        hasDecreasedHP = false;
    }
}
function healthPoints(hungry, fun, sleep) {
    hpLevel -= 0.5;
    updateProgressBar(hpLevel, healthPointsProgressBar, healthPointsHTML);
    if (hungry === 0 && fun === 0 && sleep === 0) {
        hpLevel = 0;
        updateProgressBar(hpLevel, healthPointsProgressBar, healthPointsHTML);
        endGame('Game Over: Your pet died..');
        return;
    }
}
function updateTimer() {
    hungry();
    sleep();
    fun();
    healthPoints(hungryLevel, funLevel, sleepLevel);
    lifeTimer.innerHTML = `Life timer: ${timer}s`;
    timer--;
    if (timer < 0) {
        clearInterval(timerInterval);
    }
}
feedBtn.onclick = () => {
    if (hungryLevel < 70) {
        hungryLevel += 0.8;
        if (hungryLevel > 100) {
            hungryLevel = 100;
        }
        updateProgressBar(hungryLevel, hungryLevelProgressBar, hungryLevelHTML);
    }
    else {
        console.log('i am full');
    }
};
playBtn.onclick = () => {
    if (funLevel < 80) {
        funLevel += 1.3;
        if (funLevel > 100) {
            funLevel = 100;
        }
        updateProgressBar(funLevel, funAmountProgressBar, funAmountHTML);
    }
    else {
        console.log('i am happy!');
    }
};
function nightStart() {
    yourAnimal.classList.add('animation-move');
    mainGame.classList.remove('nightbg');
    playBtn.classList.remove('button-nigth');
    feedBtn.classList.remove('button-nigth');
    sleepBtn.classList.remove('button-nigth');
    mainGame.style.color = 'black';
}
function nightEnd() {
    yourAnimal.classList.remove('animation-move');
    mainGame.classList.add('nightbg');
    mainGame.style.color = 'yellow';
    playBtn.classList.add('button-nigth');
    feedBtn.classList.add('button-nigth');
    sleepBtn.classList.add('button-nigth');
}
sleepBtn.onclick = () => {
    if (sleepLevel < 95) {
        nightEnd();
        clearInterval(timerInterval);
        setTimeout(() => {
            startGame();
            nightStart();
            if (sleepLevel === 100) {
                gameLevel++;
                gameLevelBox.innerHTML = `Level: ${gameLevel}`;
                yourAnimalSize += 10;
                yourAnimal.style.fontSize = `${yourAnimalSize}px`;
                yourAnimalTopPosition -= 15;
                yourAnimal.style.top = `${yourAnimalTopPosition}px`;
            }
        }, 15000);
        sleepLevel = 100;
        updateProgressBar(sleepLevel, sleepLevelProgressBar, sleepLevelHTML);
    }
    else {
        console.log('i am rest!');
    }
};
