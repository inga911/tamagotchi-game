const start = document.querySelector('.start') as HTMLElement
const selectAnimalContainer = document.querySelector('.select-animal') as HTMLElement
const yourAnimal = document.querySelector('.your-animal') as HTMLElement
const main = document.querySelector('.main') as HTMLElement

const healthPointsHTML = document.querySelector('.health-text') as HTMLElement
const hungryLevelHTML = document.querySelector('.hungry-text') as HTMLElement
const funAmountHTML = document.querySelector('.fun-text') as HTMLElement
const healthPointsProgressBar = document.querySelector('.health-points') as HTMLElement
const hungryLevelProgressBar = document.querySelector('.hungry-level') as HTMLElement
const funAmountProgressBar = document.querySelector('.fun-amount') as HTMLElement

const lifeTimer = document.querySelector('.life-timer') as HTMLElement

const feedBtn = document.querySelector('.feed') as HTMLElement
const playBtn = document.querySelector('.play') as HTMLElement




main.classList.add('d-none')
yourAnimal.classList.add('animation-move')

let hpLevel: number = 100
let hungryLevel: number = 100
let funLevel: number = 100
let timer: number = 60
let gameLevel: number = 1
let timerInterval: number;


healthPointsHTML.innerHTML = `Hp ${hpLevel}%`
hungryLevelHTML.innerHTML = `Hungry ${hungryLevel}%`
funAmountHTML.innerHTML = `Fun ${funLevel}%`

let animal: string[] = ['🐶', '🐱', '🦊', '🐼', '🐯', '🐮', '🦥', '🐇', '🦜', '🐠', '🐿', '🐉', '🦒', '🦓', '🦄', '🐧']

for (let i = 0; i < animal.length; i++) {
    selectAnimalContainer.innerHTML += `
        <div class="animal-box">${animal[i]}</div>
        `
}

const animalBoxes = selectAnimalContainer.querySelectorAll('.animal-box')
animalBoxes.forEach(a => {
    //@ts-ignore
    a.onclick = () => {
        start.classList.add('d-none')
        main.classList.remove('d-none')
        yourAnimal.innerHTML = `${a.textContent}`
        yourAnimal.style.fontSize = '40px'
        yourAnimal.style.top = '0px'
        startGame();
    };
});

function startGame() {
    timerInterval = setInterval(updateTimer, 1000);
}

function updateProgressBar(hp: number, bar: HTMLElement, htmlEl: HTMLElement) {
    bar.style.width = hp + '%';
    if (hp >= 75) {
        bar.style.backgroundColor = 'lightgreen'
    } else if (hp >= 45) {
        bar.style.backgroundColor = 'orange'
    } else if (hp >= 0) {
        bar.style.backgroundColor = 'crimson'
    } else {
        bar.style.backgroundColor = 'white'
    }
    updateBarsHtml(hp, htmlEl);

}

function updateBarsHtml(level: number, htmlEl: HTMLElement) {
    htmlEl.innerHTML = `${htmlEl.classList.contains('health-text') ? 'Hp' : htmlEl.classList.contains('hungry-text') ? 'Hungry' : 'Fun'} ${level.toFixed(2)}%`;
}

updateProgressBar(hpLevel, healthPointsProgressBar, healthPointsHTML)
updateProgressBar(hungryLevel, hungryLevelProgressBar, hungryLevelHTML)
updateProgressBar(funLevel, funAmountProgressBar, funAmountHTML)


function endGame(message: string) {
    yourAnimal.classList.remove('animation-move')
    clearInterval(timerInterval);
    //@ts-ignore
    feedBtn.disabled = true;
    //@ts-ignore
    playBtn.disabled = true;
    alert(message);
    start.classList.remove('d-none')
    main.classList.add('d-none')
    location.reload();
}

function updateTimer() {
    hungryLevel -= 1.2
    updateProgressBar(hungryLevel, hungryLevelProgressBar, hungryLevelHTML)
    if (hungryLevel <= 0) {
        hungryLevel = 0
        updateProgressBar(hungryLevel, hungryLevelProgressBar, hungryLevelHTML);
        endGame('Game Over: Your pet has starved to death.');
        return;
    }
    funLevel -= 0.8
    updateProgressBar(funLevel, funAmountProgressBar, funAmountHTML)
    if (funLevel <= 0) {
        funLevel = 0
        hpLevel -= 20
        updateProgressBar(funLevel, funAmountProgressBar, funAmountHTML)
        updateProgressBar(hpLevel, healthPointsProgressBar, healthPointsHTML);
    }
    hpLevel -= 0.1
    updateProgressBar(hpLevel, healthPointsProgressBar, healthPointsHTML)
    lifeTimer.innerHTML = `Life timer: ${timer}s`
    timer--
    if (timer < 0) {
        clearInterval(timerInterval)
    }
}


feedBtn.onclick = () => {
    if (hungryLevel < 100) {
        hungryLevel += 1.2
        if (hungryLevel > 100) {
            hungryLevel = 100
        }
        updateProgressBar(hungryLevel, hungryLevelProgressBar, hungryLevelHTML)
    } else {
        console.log('i am full');
    }
}


playBtn.onclick = () => {
    if (funLevel < 100) {
        funLevel += 1.2
        if (funLevel > 100) {
            funLevel = 100
        }
        updateProgressBar(funLevel, funAmountProgressBar, funAmountHTML)
    } else {
        console.log('i am happy!');
    }
}