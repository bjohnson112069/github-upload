const hasDownArrow = document.getElementsByClassName('has-down-arrow')[0]
const dropdownContent = document.getElementsByClassName('dropdown-content')[0]
const hamburgerMenu = document.getElementsByClassName('hamburger__menu')[0]
const navbarList = document.getElementsByClassName('navbar--list')[0]
const cookieContainer = document.getElementsByClassName('cookie__container')[0]
const buttonLearnMore = document.getElementsByClassName('btn-learn')[0]
const buttonUnderstand = document.getElementsByClassName('btn-understand')[0]
const buttonSubmit = document.getElementsByClassName('btn-submit')[0]

hasDownArrow.addEventListener('click', () => {
     dropdownContent.classList.toggle('active')
     hasDownArrow.classList.toggle('active')
})

hamburgerMenu.addEventListener('click', () => {
     navbarList.classList.toggle('active')
})

buttonLearnMore.addEventListener('click', () => {
     cookieContainer.classList.toggle('active')
})

buttonUnderstand.addEventListener('click', () => {
     cookieContainer.classList.toggle('active')
})

function manage(txt) {
     // var bt = document.getElementById('btSubmit');
     if (txt.value != '') {
          buttonSubmit.disabled = false;
          console.log("Button Enabled")
     }
     else {
          buttonSubmit.disabled = true;
          console.log("Button Disabled")
     }
 }