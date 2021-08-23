const menuOpen = document.getElementsByClassName('menu--open')[0]
const menuClose = document.getElementsByClassName('menu--close')[0]
const navbarOverlay = document.getElementsByClassName('navbar__overlay')[0]

menuOpen.addEventListener('click', () => {
     navbarOverlay.classList.toggle('active')
     menuOpen.classList.toggle('active')
     console.log("menu open")
})

menuClose.addEventListener('click', () => {
     navbarOverlay.classList.toggle('active')
     menuOpen.classList.toggle('active')
     console.log("menu close")
})