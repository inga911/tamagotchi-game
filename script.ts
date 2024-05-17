const selectAnimalContainer = document.querySelector('.select-animal') as HTMLElement
console.log(selectAnimalContainer);

let animal: string[] = ['🐶', '🐱', '🦊', '🐼', '🐯', '🐮', '🦥', '🐇', '🦜', '🐠', '🐿', '🐉', '🦒', '🦓', '🦄', '🐧']

for (let i = 0; i < animal.length; i++) {

    selectAnimalContainer.innerHTML += `
        <div class="animal-box">${animal[i]}</div>
        `
}