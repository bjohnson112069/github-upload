const dropdownButtons = document.querySelectorAll(".dropdown-btn");

function toggleDropDownVisibility(dropdownButton, dropdownList) {
          let isHidden= dropdownList.getAttribute("aria-hidden") === "true";
          dropdownButton.classList.toggle("active", isHidden);
          dropdownList.setAttribute("aria-hidden", `${!isHidden}`);
}

function handleDropDownClickEvent() {
          console.log(this);
          const dropdownList = this.nextElementSibling;

          toggleDropDownVisibility(this, dropdownList);

          dropdownList.addEventListener("click", handleDropDownSelectionEvent);
}

// Event delgation on tht dropdown list ...
function handleDropDownSelectionEvent(e) {
          if (!e.target.matches(".dropdown-item")) return;

          const button = this.previousElementSibling;

          button.querySelector("p").textContent = e.target.textContent;
          button.dataset.value = e.target.textContent;
          
          toggleDropDownVisibility(button, this);
}
        

// Event listeners ...
dropdownButtons.forEach(button => button.addEventListener("click", handleDropDownClickEvent))
