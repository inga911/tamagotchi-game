"use strict";
const start = document.querySelector('.start');
const selectAnimalContainer = document.querySelector('.select-animal');
const yourAnimal = document.querySelector('.your-animal');
const main = document.querySelector('.main');
const healthPointsHTML = document.querySelector('.health-text');
const hungryLevelHTML = document.querySelector('.hungry-text');
const funAmountHTML = document.querySelector('.fun-text');
const healthPointsProgressBar = document.querySelector('.health-points');
const hungryLevelProgressBar = document.querySelector('.hungry-level');
const funAmountProgressBar = document.querySelector('.fun-amount');
main.classList.add('d-none');
// start.classList.add('d-none')
let hpLevel = 100;
let hungryLevel = 100;
let funLevel = 100;
healthPointsHTML.innerHTML = `Hp ${hpLevel}%`;
hungryLevelHTML.innerHTML = `Hungry ${hungryLevel}%`;
funAmountHTML.innerHTML = `Fun ${funLevel}%`;
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
    };
});
function updateProgressBar(hp, bar) {
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
}
updateProgressBar(hpLevel, healthPointsProgressBar);
updateProgressBar(hungryLevel, hungryLevelProgressBar);
updateProgressBar(funLevel, funAmountProgressBar);
