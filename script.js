"use strict";
// Start div
const start = document.querySelector('.start');
const selectAnimalContainer = document.querySelector('.select-animal');
//Main game
const yourAnimal = document.querySelector('.your-animal');
const main = document.querySelector('.main');
const mainGame = document.querySelector('.main-game');
const gameLevelBox = document.querySelector('.level-box');
const nightTime = document.querySelector('.night-time');
const nightTxt = document.querySelector('.night-text');
const sun = document.querySelector('.sun-img');
const gameBox = document.querySelector('.game-box');
const funpoints = document.querySelector('.fun-points');
// Result div
const results = document.querySelector('.results');
const resultInfo = document.querySelector('.result-info');
const playAgainBtn = document.querySelector('.play-again-btn');
// Progress bars texts
const healthPointsHTML = document.querySelector('.health-text');
const hungryLevelHTML = document.querySelector('.hungry-text');
const funAmountHTML = document.querySelector('.fun-text');
const sleepLevelHTML = document.querySelector('.sleep-text');
//Progress bars
const healthPointsProgressBar = document.querySelector('.health-points');
const hungryLevelProgressBar = document.querySelector('.hungry-level');
const funAmountProgressBar = document.querySelector('.fun-amount');
const sleepLevelProgressBar = document.querySelector('.sleep-level');
//Buttons
const feedBtn = document.querySelector('.feed');
const playBtn = document.querySelector('.play');
const sleepBtn = document.querySelector('.sleep');
//Animal
const spriteDiv = document.querySelector('.sprite');
//Default styles
main.classList.add('d-none');
results.classList.add('d-none');
yourAnimal.classList.add('animation-move');
//@ts-ignore
nightTxt.classList.add('d-none');
gameBox.classList.add('d-none');
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
let sleepReachedZero = false;
let pos = 0;
let nightTimer = 15;
let cellPosition;
let animal = ['images/cat.png', 'images/dog.png'];
healthPointsHTML.innerHTML = `Hp ${hpLevel}%`;
hungryLevelHTML.innerHTML = `Hungry ${hungryLevel}%`;
funAmountHTML.innerHTML = `Fun ${funLevel}%`;
sleepLevelHTML.innerHTML = `Sleep ${sleepLevel}%`;
gameLevelBox.innerHTML = `Level: ${gameLevel}`;
//@ts-ignore
sun.classList.add('img-animation');
for (let i = 0; i < animal.length; i++) {
    selectAnimalContainer.innerHTML += `
    <div class="animal-box" data-animal="${animal[i]}">
        <img src="${animal[i]}" alt="animal" class="animal-image">
    </div>
`;
}
// Select the animal and display it on main game box 
const animalBoxes = selectAnimalContainer.querySelectorAll('.animal-box');
animalBoxes.forEach(a => {
    //@ts-ignore
    a.onclick = () => {
        const selectedAnimal = a.getAttribute('data-animal');
        start.classList.add('d-none');
        main.classList.remove('d-none');
        setInterval(() => {
            if (selectedAnimal === animal[0]) {
                firstAnimal();
            }
            else if (selectedAnimal === animal[1]) {
                secondAnimal();
            }
        }, 200);
        startGame();
    };
});
//First animal styles
function firstAnimal() {
    spriteDiv.style.backgroundImage = 'url("https://solution-smith.com/diy/css/animation/pixel-art/cat-221-154-8.png")';
    spriteDiv.style.width = '80px';
    spriteDiv.style.height = '55px';
    spriteDiv.style.backgroundSize = '400px';
    spriteDiv.style.backgroundPosition = `-${pos}px 0`;
    pos += 80;
    if (pos > 275)
        pos = 0;
}
//Second animal styles
function secondAnimal() {
    spriteDiv.style.backgroundImage = 'url("https://codehs.com/uploads/31053db3e99402272fc99cfaba698b88")';
    spriteDiv.style.width = '98px';
    spriteDiv.style.height = '100px';
    spriteDiv.style.backgroundSize = '295px';
    spriteDiv.style.backgroundPosition = `-${pos}px 0`;
    pos += 175;
    if (pos > 345)
        pos = 0;
}
// Start game
function startGame() {
    timerInterval = setInterval(updateTimer, 1000);
    updateButtonStatus();
}
// End game
function endGame() {
    clearInterval(timerInterval);
    main.classList.add('d-none');
    results.classList.remove('d-none');
    resultInfo.innerHTML = `Game Over: Yor pet lived for ${timer} seconds`;
}
// Check and update button status
function updateButtonStatus() {
    if (sleepLevel >= 45) {
        sleepBtn.classList.add('d-none');
    }
    else {
        sleepBtn.classList.remove('d-none');
    }
}
//Update progress bars
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
    updateButtonStatus();
}
function updateBarsHtml(level, htmlEl) {
    if (htmlEl.classList.contains('health-text')) {
        htmlEl.innerHTML = `Hp ${level.toFixed(0)}%`;
    }
    else if (htmlEl.classList.contains('hungry-text')) {
        htmlEl.innerHTML = `Hungry ${level.toFixed(0)}%`;
    }
    else if (htmlEl.classList.contains('fun-text')) {
        htmlEl.innerHTML = `Fun ${level.toFixed(0)}%`;
    }
    else if (htmlEl.classList.contains('sleep-text')) {
        htmlEl.innerHTML = `Sleep ${level.toFixed(0)}%`;
    }
}
updateProgressBar(hpLevel, healthPointsProgressBar, healthPointsHTML);
updateProgressBar(hungryLevel, hungryLevelProgressBar, hungryLevelHTML);
updateProgressBar(funLevel, funAmountProgressBar, funAmountHTML);
updateProgressBar(sleepLevel, sleepLevelProgressBar, sleepLevelHTML);
// Health
function healthPoints(hungry, fun, sleep) {
    hpLevel -= 0.05;
    updateProgressBar(hpLevel, healthPointsProgressBar, healthPointsHTML);
    if (hungry === 0 && fun === 0 && sleep === 0) {
        hpLevel = 0;
        updateProgressBar(hpLevel, healthPointsProgressBar, healthPointsHTML);
        endGame();
        return;
    }
}
//Hungry 
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
//Fun
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
// Sleep
function sleep() {
    sleepLevel -= 1;
    updateProgressBar(sleepLevel, sleepLevelProgressBar, sleepLevelHTML);
    if (sleepLevel <= 0) {
        sleepLevel = 0;
        if (!sleepReachedZero) {
            hpLevel -= 20;
            sleepReachedZero = true;
        }
        updateProgressBar(sleepLevel, sleepLevelProgressBar, sleepLevelHTML);
        updateProgressBar(hpLevel, healthPointsProgressBar, healthPointsHTML);
    }
    else {
        hasDecreasedHP = false;
    }
}
// Timer
function updateTimer() {
    hungry();
    sleep();
    fun();
    healthPoints(hungryLevel, funLevel, sleepLevel);
    timer++;
}
///////// Buttons 
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
    gameBox.classList.remove('d-none');
    funpoints.classList.remove('d-none');
    setTimeout(() => {
        gameBox.classList.add('d-none');
        funpoints.classList.add('d-none');
    }, 15000);
};
//Sleep
function nightEnd() {
    yourAnimal.classList.add('animation-move');
    mainGame.classList.remove('nightbg');
    feedBtn.classList.remove('d-none');
    playBtn.classList.remove('d-none');
    sleepBtn.classList.remove('button-nigth');
    mainGame.style.color = 'black';
    sleepBtn.classList.remove('d-none');
    //@ts-ignore
    nightTxt.classList.add('d-none');
    //@ts-ignore
    sun.setAttribute('src', 'https://cdn.iconscout.com/icon/free/png-256/free-sun-631-445578.png?f=webp');
    //@ts-ignore
    sun.classList.add('img-animation');
    //@ts-ignore
    sun.classList.remove('img-moon');
}
function nightStart() {
    yourAnimal.classList.remove('animation-move');
    mainGame.classList.add('nightbg');
    mainGame.style.color = 'yellow';
    feedBtn.classList.add('d-none');
    playBtn.classList.add('d-none');
    sleepBtn.classList.add('d-none');
    //@ts-ignore
    nightTxt.classList.remove('d-none');
    //@ts-ignore
    sun.setAttribute('src', 'https://cdn-icons-png.freepik.com/512/365/365871.png');
    //@ts-ignore
    sun.classList.remove('img-animation');
    //@ts-ignore
    sun.classList.add('img-moon');
}
sleepBtn.onclick = () => {
    if (sleepLevel < 45) {
        nightStart();
        clearInterval(timerInterval);
        const nightInterval = setInterval(() => {
            nightTimer--;
            // @ts-ignore
            nightTime.innerHTML = ` ${nightTimer}s`;
            if (nightTimer <= 0) {
                clearInterval(nightInterval);
                nightEnd();
                startGame();
                sleepLevel = 100;
                updateProgressBar(sleepLevel, sleepLevelProgressBar, sleepLevelHTML);
                nightTimer = 15;
                gameLevel++;
                gameLevelBox.innerHTML = `Level: ${gameLevel}`;
            }
        }, 1000);
    }
    else {
        console.log('I am rested!');
    }
};
//Result div button
playAgainBtn.onclick = () => {
    results.classList.add('d-none');
    start.classList.remove('d-none');
    location.reload();
};
//Game for fun
function game() {
    for (let i = 0; i < 16; i++) {
        gameBox.innerHTML += `
        <div class="cell" id="${i}"></div>
      `;
    }
    const cells = gameBox.querySelectorAll('.cell');
    return cells;
}
const cells = game();
function getRandomCell(cells) {
    //@ts-ignore
    cells.forEach(cell => cell.classList.remove('color'));
    let randomCell = cells[Math.floor(Math.random() * cells.length)];
    randomCell.classList.add('color');
    cellPosition = randomCell.id;
}
function moveColor() {
    setInterval(() => {
        getRandomCell(cells);
    }, 1000);
}
moveColor();
cells.forEach(cell => {
    //@ts-ignore
    cell.onclick = () => {
        funpoints.innerHTML = `Fun ${funLevel.toFixed(0)}%`;
        //@ts-ignore
        if (cell.id === cellPosition) {
            if (funLevel < 100) {
                funLevel += 2;
                if (funLevel > 100) {
                    funLevel = 100;
                    funpoints.innerHTML = `Fun ${funLevel.toFixed(0)}%`;
                }
                updateProgressBar(funLevel, funAmountProgressBar, funAmountHTML);
            }
        }
    };
});
