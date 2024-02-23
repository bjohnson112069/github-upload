const dropdownButton = document.querySelector(".dropdown-btn");
const buttons = document.querySelector(".buttons-box"). querySelectorAll("button");

function toggleDropDownVisibility(dropdownButton, dropdownList) {
          let isHidden= dropdownList.getAttribute("aria-hidden") === "true";
          dropdownButton.classList.toggle("active", isHidden);
          dropdownList.setAttribute("aria-hidden", `${!isHidden}`);
}

function handleDropDownClickEvent() {
          const dropdownList = this.nextElementSibling;

          toggleDropDownVisibility(this, dropdownList);

          dropdownList.addEventListener("click", handleDropDownSelectionEvent);
}

// Event delgation on tht dropdown list ...
function handleDropDownSelectionEvent(e) {
          // return if a dropdown item was not clicked
          if (!e.target.matches(".dropdown-item")) return;

          const button = this.previousElementSibling;
          toggleDropDownVisibility(button, this);
}
        
function handleButtonClickEvent() {
          console.log(this.value)
          const choices = document.querySelectorAll(".choices");
          const notify = document.querySelector(".notification");

          choices.forEach(choice => {
                    const inputs = choice.querySelectorAll("input");
                    inputs.forEach(input => { input.checked = false; })
          })

          if (this.value === "save") {
                    notify.classList.add("active");
                    setTimeout(() => { notify.classList.remove("active"); }, 2000);
          }
}

// Event listeners ...
dropdownButton.addEventListener("click", handleDropDownClickEvent);
buttons.forEach(button => button.addEventListener("click", handleButtonClickEvent));

// Event listener for entrance ...
window.addEventListener('DOMContentLoaded', () => {
          const elements = document.querySelectorAll(".slide");
          const classesToRemove = ['slide-left', 'slide-right', 'slide-up', 'slide-down'];

          setTimeout(() => {
                    elements.forEach(element => element.classList.remove(...classesToRemove))
          }, 1000);
});