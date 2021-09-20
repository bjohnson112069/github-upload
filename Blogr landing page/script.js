const hamburgerMenu = document.getElementsByClassName('navbar__list--hamburger')[0]
const navbar = document.getElementsByClassName('navbar')[0]
const menuClose = document.getElementsByClassName('navbar__list--close')[0]

hamburgerMenu.addEventListener('click', () => {
     hamburgerMenu.classList.toggle('active')
     navbar.classList.toggle('active')
     menuClose.classList.toggle('active')
})

menuClose.addEventListener('click', () => {
     hamburgerMenu.classList.toggle('active')
     navbar.classList.toggle('active')
     menuClose.classList.toggle('active')
})

const hideDropdownContent = (dropdown, dropdownContent) => {
     var i;
     for (i = 0; i < dropdownContent.length; i++) {
          var openDropdown = dropdownContent[i];
          if (openDropdown.classList.contains('active')) {
               openDropdown.classList.remove('active');
          }
     }
     for (i = 0; i < dropdown.length; i++) {
          var openDropdown = dropdown[i];
          if (openDropdown.classList.contains('active')) {
               openDropdown.classList.remove('active');
          }
     }
}

const dropdown = document.getElementsByClassName("dropdown");
const dropdownContent = document.getElementsByClassName("dropdown-content");
var i;

for (i = 0; i < dropdown.length; i++) {
     dropdown[i].addEventListener("click", function() {
     /* Reset all dropdown/dropdown Content to default states */
     hideDropdownContent(dropdown, dropdownContent);
      /* Toggle Active Class for Dropdown - triggers after psuedo */
     this.classList.toggle("active");
     /* Toggle Active Class for firstElementChild (e.g. UL) : dropdown content */
     var openDropdown = this.firstElementChild;
     openDropdown.classList.toggle("active");
});
} 

window.onclick = function(event) {
     if (!event.target.matches('.dropdown')) {
          hideDropdownContent(dropdown, dropdownContent);
     }
} 

