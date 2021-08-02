const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarOverlay = document.getElementsByClassName('navbar__overlay')[0]
const menuClose = document.getElementsByClassName('menu__close')[0]

// When I click the toggle button, hide the toggle button and display the overlay w/+offset
toggleButton.addEventListener('click', () => {
     toggleButton.classList.toggle('active')
     navbarOverlay.classList.toggle('active')
})

menuClose.addEventListener('click', () => {
     toggleButton.classList.toggle('active')
     navbarOverlay.classList.toggle('active')
})