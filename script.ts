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





main.classList.add('d-none')
// start.classList.add('d-none')

let hpLevel: number = 100
let hungryLevel: number = 100
let funLevel: number = 100

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
    }
})


function updateProgressBar(hp: number, bar: HTMLElement) {
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
}

updateProgressBar(hpLevel, healthPointsProgressBar)
updateProgressBar(hungryLevel, hungryLevelProgressBar)
updateProgressBar(funLevel, funAmountProgressBar)