const menus = document.querySelectorAll(".dropdown-btn");
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelectorAll("a");

function toggleMenuVisibility(button, list, isHidden) {
          // Toggle active state of the dropdown button and dropdown list based on the aria-hidden attribute:
          // button: not active (default), dropdown list: hidden = true
          // button: active, dropdownlist: hidden = false
          button.classList.toggle("active", isHidden);
          list.setAttribute("aria-hidden", `${!isHidden}`);
}

function handleMenuclick() {
          
          // iterarte through all the menu buttons; close all open/active menus; open the selected menu
          menus.forEach(menu => {
                    // select the dropdown list/menu element
                    const list = menu.nextElementSibling;

                    // if the menu button was clicked toggle the visibility (based on current state)
                    if (menu === this) {
                              // Query current visibility of the dropdown list and convert to boolean value
                              // Set active state of the dropdown button and dropdown list
                              toggleMenuVisibility(menu, list, list.getAttribute("aria-hidden") === "true");
                              list.addEventListener("click", handleMenuSelection);
                    } else{
                              // otherwise close all menus and make button not aactive
                              toggleMenuVisibility(menu, list, false);

                    }
          })
}

// Event delgation on tht dropdown list ...
function handleMenuSelection(e) {
          // return if a dropdown item was not clicked or the value is empty (e.g. placeholder)
          if (!e.target.matches(".dropdown-item") || 
                    (!e.target.dataset.value) ) return;

          const button = this.previousElementSibling;
          const label = button.querySelector("span");

          label.textContent = e.target.textContent;
          toggleMenuVisibility(button, this);
}

function handleNavToggle() {
          const isExpanded = this.getAttribute("aria-expanded") === "true";
          console.log(isExpanded);
          this.setAttribute("aria-expanded", `${!isExpanded}`);
          
}

// Event listeners ...
menus.forEach(menu => menu.addEventListener("click", handleMenuclick));
toggle.addEventListener("click", handleNavToggle);


// Prevent default behavior for all <a> links
links.forEach(link => link.addEventListener("click", (e) => e.preventDefault()));