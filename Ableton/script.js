const buttonMore = document.getElementsByClassName('btn__more')[0]
const sectionMore = document.getElementsByClassName('section__more')[0]
const navBorder = document.getElementById("header__nav")
const listMenu = document.getElementsByClassName('list-menu')[0]
const menuInput = document.getElementsByClassName('menu__input')[0]
const overlayContainer = document.getElementsByClassName('overlay__container')[0]
const sectionHeader = document.getElementsByClassName('section__header')[0]
const toggleLogo = document.getElementsByClassName('toggle-logo-bgc')[0]
var bool = 0;

buttonMore.addEventListener('click', () => {
     sectionMore.classList.toggle('active')
     buttonMore.classList.toggle('active')
     bool = !bool;
     if(bool) {
          const navBorder = document.getElementById("header__nav").style.borderColor="#ffffff"
     } else {
          const navBorder = document.getElementById("header__nav").style.borderColor="#eeeeee"
     }

})

// listMenu.addEventListener('click', () => {
     // sectionHeader.classList.toggle('active')
     // toggleLogo.classList.toggle('active')
     // overlayContainer.classList.toggle('active')
// })

menuInput.addEventListener('change', function() {
     if (this.checked) {
     sectionHeader.classList.toggle('active')
     toggleLogo.classList.toggle('active')
     overlayContainer.classList.toggle('active')
     } else {
          sectionHeader.classList.toggle('active')
          toggleLogo.classList.toggle('active')
          overlayContainer.classList.toggle('active')
     }
   });


