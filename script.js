"use strict";
const selectAnimalContainer = document.querySelector('.select-animal');
console.log(selectAnimalContainer);
let animal = ['🐶', '🐱', '🦊', '🐼', '🐯', '🐮', '🦥', '🐇', '🦜', '🐠', '🐿', '🐉', '🦒', '🦓', '🦄', '🐧'];
for (let i = 0; i < animal.length; i++) {
    selectAnimalContainer.innerHTML += `
        <div class="animal-box">${animal[i]}</div>
        `;
}
