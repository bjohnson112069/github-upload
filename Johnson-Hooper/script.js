const announcementClose = document.getElementsByClassName('announcement-close')[0]
const announcementContainer = document.getElementsByClassName('announcement__container')[0]
const menuOpen = document.getElementsByClassName('menu-open')[0]
const menuClose = document.getElementsByClassName('menu-close')[0]
const navbarOverlay = document.getElementsByClassName('navbar__overlay')[0]
const chatOpen = document.getElementsByClassName('chat__open')[0]
const chatClose = document.getElementsByClassName('chat__close')[0]
const messageContainer = document.getElementsByClassName('message__container')[0]
const buttonSubmit = document.getElementsByClassName('btn-submit')[0]

announcementClose.addEventListener('click', () => {
     announcementContainer.classList.toggle('active')
})

menuOpen.addEventListener('click', () => {
     navbarOverlay.classList.toggle('active')
})

menuClose.addEventListener('click', () => {
     navbarOverlay.classList.toggle('active')
})

chatOpen.addEventListener('click', () => {
     chatOpen.classList.toggle('active')
     chatClose.classList.toggle('active')
     messageContainer.classList.toggle('active')
})

chatClose.addEventListener('click', () => {
     chatClose.classList.toggle('active')
     chatOpen.classList.toggle('active')
     messageContainer.classList.toggle('active')
})

buttonSubmit.addEventListener('click', () => {
     buttonSubmit.classList.toggle('active')
})