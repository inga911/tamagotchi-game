"use strict";
const start = document.querySelector('.start');
const results = document.querySelector('.results');
const resultInfo = document.querySelector('.result-info');
const playAgainBtn = document.querySelector('.play-again-btn');
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
const spriteDiv = document.querySelector('.sprite');
main.classList.add('d-none');
results.classList.add('d-none');
yourAnimal.classList.add('animation-move');
let hpLevel = 100;
let hungryLevel = 100;
let funLevel = 100;
let sleepLevel = 100;
let timer = 0;
let gameLevel = 1;
let timerInterval;
let hasDecreasedHP = false;
let funReachedZero = false;
let hungryReachedZero = false;
let yourAnimalSize = 40;
let yourAnimalTopPosition = 0;
let pos = 0;
healthPointsHTML.innerHTML = `Hp ${hpLevel}%`;
hungryLevelHTML.innerHTML = `Hungry ${hungryLevel}%`;
funAmountHTML.innerHTML = `Fun ${funLevel}%`;
sleepLevelHTML.innerHTML = `Sleep ${sleepLevel}%`;
gameLevelBox.innerHTML = `Level: ${gameLevel}`;
let animal = ['images/cat.png', 'images/dog.png'];
for (let i = 0; i < animal.length; i++) {
    selectAnimalContainer.innerHTML += `
    <div class="animal-box" data-animal="${animal[i]}">
        <img src="${animal[i]}" alt="animal" class="animal-image">
    </div>
`;
}
const animalBoxes = selectAnimalContainer.querySelectorAll('.animal-box');
animalBoxes.forEach(a => {
    //@ts-ignore
    a.onclick = () => {
        const selectedAnimal = a.getAttribute('data-animal');
        start.classList.add('d-none');
        main.classList.remove('d-none');
        setInterval(() => {
            if (selectedAnimal === 'images/cat.png') {
                spriteDiv.style.backgroundImage = 'url("https://solution-smith.com/diy/css/animation/pixel-art/cat-221-154-8.png")';
                spriteDiv.style.width = '80px';
                spriteDiv.style.height = '55px';
                spriteDiv.style.backgroundSize = '400px';
                spriteDiv.style.backgroundPosition = `-${pos}px 0`;
                pos += 80;
                if (pos > 275)
                    pos = 0;
            }
            else if (selectedAnimal === 'images/dog.png') {
                spriteDiv.style.backgroundImage = 'url("https://codehs.com/uploads/31053db3e99402272fc99cfaba698b88")';
                spriteDiv.style.width = '95px';
                spriteDiv.style.height = '100px';
                spriteDiv.style.backgroundSize = '300px';
                spriteDiv.style.backgroundPosition = `-${pos}px 0`;
                pos += 95;
                if (pos > 297)
                    pos = 0;
            }
        }, 200);
        startGame();
    };
});
function startGame() {
    timerInterval = setInterval(updateTimer, 1000);
    updateButtonState();
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
    updateButtonState();
}
function updateBarsHtml(level, htmlEl) {
    if (htmlEl.classList.contains('health-text')) {
        htmlEl.innerHTML = `Hp ${level.toFixed(2)}%`;
    }
    else if (htmlEl.classList.contains('hungry-text')) {
        htmlEl.innerHTML = `Hungry ${level.toFixed(2)}%`;
    }
    else if (htmlEl.classList.contains('fun-text')) {
        htmlEl.innerHTML = `Fun ${level.toFixed(2)}%`;
    }
    else if (htmlEl.classList.contains('sleep-text')) {
        htmlEl.innerHTML = `Sleep ${level.toFixed(2)}%`;
    }
}
updateProgressBar(hpLevel, healthPointsProgressBar, healthPointsHTML);
updateProgressBar(hungryLevel, hungryLevelProgressBar, hungryLevelHTML);
updateProgressBar(funLevel, funAmountProgressBar, funAmountHTML);
updateProgressBar(sleepLevel, sleepLevelProgressBar, sleepLevelHTML);
function endGame() {
    yourAnimal.classList.remove('animation-move');
    clearInterval(timerInterval);
    //@ts-ignore
    feedBtn.disabled = true;
    //@ts-ignore
    playBtn.disabled = true;
    main.classList.add('d-none');
    results.classList.remove('d-none');
    resultInfo.innerHTML = `Game Over: Your pet died.. Yor pet lived for ${timer}s`;
}
function hungry() {
    hungryLevel -= 1.8;
    updateProgressBar(hungryLevel, hungryLevelProgressBar, hungryLevelHTML);
    if (hungryLevel <= 0) {
        hungryLevel = 0;
        if (!hungryReachedZero) {
            hpLevel -= 20;
            hungryReachedZero = true;
        }
        updateProgressBar(hungryLevel, hungryLevelProgressBar, hungryLevelHTML);
        updateProgressBar(hpLevel, healthPointsProgressBar, healthPointsHTML);
    }
    else {
        hasDecreasedHP = false;
    }
}
function sleep() {
    sleepLevel -= 1;
    updateProgressBar(sleepLevel, sleepLevelProgressBar, sleepLevelHTML);
    if (sleepLevel === 0) {
        sleepLevel = 0;
        hpLevel = 0;
        if (!hasDecreasedHP) {
            hpLevel -= 20;
            hasDecreasedHP = true;
        }
        updateProgressBar(hpLevel, healthPointsProgressBar, healthPointsHTML);
        endGame();
    }
    else {
        hasDecreasedHP = false;
    }
}
function fun() {
    funLevel -= 1.3;
    updateProgressBar(funLevel, funAmountProgressBar, funAmountHTML);
    if (funLevel <= 0) {
        funLevel = 0;
        if (!funReachedZero) {
            hpLevel -= 20;
            funReachedZero = true;
        }
        updateProgressBar(funLevel, funAmountProgressBar, funAmountHTML);
        updateProgressBar(hpLevel, healthPointsProgressBar, healthPointsHTML);
    }
    else {
        hasDecreasedHP = false;
    }
}
function healthPoints(hungry, fun, sleep) {
    hpLevel -= 0.1;
    updateProgressBar(hpLevel, healthPointsProgressBar, healthPointsHTML);
    if (hungry === 0 && fun === 0 && sleep === 0) {
        hpLevel = 0;
        updateProgressBar(hpLevel, healthPointsProgressBar, healthPointsHTML);
        return;
    }
}
function updateTimer() {
    hungry();
    sleep();
    fun();
    healthPoints(hungryLevel, funLevel, sleepLevel);
    timer++;
}
feedBtn.onclick = () => {
    if (hungryLevel < 100) {
        hungryLevel += 2;
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
    if (funLevel < 100) {
        funLevel += 2;
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
function updateButtonState() {
    if (sleepLevel >= 45) {
        //@ts-ignore
        sleepBtn.disabled = true;
        sleepBtn.classList.add('disable');
    }
    else {
        //@ts-ignore
        sleepBtn.disabled = false;
        sleepBtn.classList.remove('disable');
    }
}
sleepBtn.onclick = () => {
    if (sleepLevel < 45) {
        nightEnd();
        clearInterval(timerInterval);
        setTimeout(() => {
            nightStart();
            startGame();
        }, 15000);
        sleepLevel = 100;
        updateProgressBar(sleepLevel, sleepLevelProgressBar, sleepLevelHTML);
        gameLevel++;
        gameLevelBox.innerHTML = `Level: ${gameLevel}`;
        yourAnimalSize += 10;
        yourAnimal.style.fontSize = `${yourAnimalSize}px`;
        yourAnimalTopPosition -= 15;
        yourAnimal.style.top = `${yourAnimalTopPosition}px`;
    }
    else {
        console.log('I am rested!');
    }
};
playAgainBtn.onclick = () => {
    results.classList.add('d-none');
    start.classList.remove('d-none');
    location.reload();
};
