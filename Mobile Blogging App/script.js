const favorites = document.querySelectorAll(".favorite");
const form = document.querySelector(".interests");
const browser = document.querySelector("#browser");
const home = document.querySelector("#home");
const exit = document.querySelector(".x-survey");

function handleBookmawrkClick() {
          const isExpanded = this.getAttribute("aria-selected") === "true";
      
          this.setAttribute("aria-selected", `${!isExpanded}`);
}

function handleFormSubmit(e) {
          e.preventDefault();
          const checked = form.querySelector(`input[type="checkbox"]:checked`);

          if (checked === null) {
                    alert("You must check at least one checkbox.");
                    return;
          }
  
          // Toggle the active states of each section (interests, browser)
          toggleActiveStates(); 

          form.reset();
}

function toggleActiveStates() {
          // Toggle the active states of each section (interests, browser)
          form.classList.toggle("active");
          browser.classList.toggle("active");        
}

function handleExitEvent() {
          const phone = document.querySelector(".smartphone");

          phone.classList.add("scale-down");
          setTimeout(() => {
                    phone.classList.remove("scale-down");
          }, 3000);
}

      
favorites.forEach(favorite => favorite.addEventListener("click", handleBookmawrkClick));
form.addEventListener("submit", handleFormSubmit);
home.addEventListener("click", toggleActiveStates);
exit.addEventListener("click", handleExitEvent);


