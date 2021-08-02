const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar__list')[0]
const navbarOverlay = document.getElementsByClassName('navbar__overlay')[0]
const menuClose = document.getElementsByClassName('menu__close')[0]

toggleButton.addEventListener('click', () => {
     toggleButton.classList.toggle('active')
     navbarOverlay.classList.toggle('active')
})

menuClose.addEventListener('click', () => {
     toggleButton.classList.toggle('active')
     navbarOverlay.classList.toggle('active')
})