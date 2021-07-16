const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar__list')[0]
const arrowContainer = document.getElementsByClassName('arrow')[0]
const titleContainer = document.getElementsByClassName('section__title')[0]
//const titleContainer = document.getElementsByClassName('title__container')[0]

//console.log(titleContainer);

toggleButton.addEventListener('click', () => {
     navbarLinks.classList.toggle('active')
     titleContainer.classList.toggle('active')
     arrowContainer.classList.toggle('active')
})