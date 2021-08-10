const announcementClose = document.getElementsByClassName('announcement-close')[0]
const announcementContainer = document.getElementsByClassName('announcement__container')[0]
const menuOpen = document.getElementsByClassName('menu-open')[0]
const menuClose = document.getElementsByClassName('menu-close')[0]
const navbarOverlay = document.getElementsByClassName('navbar__overlay')[0]

announcementClose.addEventListener('click', () => {
     announcementContainer.classList.toggle('active')
})

menuOpen.addEventListener('click', () => {
     navbarOverlay.classList.toggle('active')
})
menuClose.addEventListener('click', () => {
     navbarOverlay.classList.toggle('active')
})