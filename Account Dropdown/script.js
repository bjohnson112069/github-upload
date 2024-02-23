const dropdownBtn = document.querySelector(".dropdown-btn");
const profileBtns = document.querySelectorAll("button[data-profile]");
const links = document.querySelectorAll("a");

function toggleDropDownVisibility(dropdownBtn, dropdownList) {
          // Query current visibility of the dropdown list and convert to boolean value
          let isHidden= dropdownList.getAttribute("aria-hidden") === "true";

          // Toggle active state of the dropdown button and dropdown list based on the aria-hidden attribute:
          // button: not active (default), dropdown list: hidden = true
          // button: active, dropdownlist: hidden = false
          dropdownBtn.classList.toggle("active", isHidden);
          dropdownList.setAttribute("aria-hidden", `${!isHidden}`);
}

function handleDropDownClickEvent() {
          // selec the dropdown list element
          const dropdownList = this.nextElementSibling;

          // Set active state of the dropdown button and dropdown list
          toggleDropDownVisibility(this, dropdownList);

          // Even listeners for dropdown item selection
          dropdownList.addEventListener("click", handleDropDownSelectionEvent);
}

// Event delgation on tht dropdown list ...
function handleDropDownSelectionEvent(e) {
          // return if a dropdown item was not clicked
          if (!e.target.matches(".dropdown-item")) return;

          // const button = this.previousElementSibling;
          // toggleDropDownVisibility(button, this);
}

function handleProfileButtonClick() {

          profileBtns.forEach(button => button === this ? button.classList.add("active") : button.classList.remove("active"));
}

// Event listeners ...
dropdownBtn.addEventListener("click", handleDropDownClickEvent);
profileBtns.forEach(button => button.addEventListener("click", handleProfileButtonClick));


// Prevent default behavior for all <a> links
links.forEach(link => link.addEventListener("click", (e) => e.preventDefault()));