const classesToRemove = ['slide-left', 'slide-right', 'slide-up', 'slide-down', 'scale-up', 'scale-down'];
const toggle = document.querySelector("#toggle-form");
const form = document.querySelector("#feedback-form");
const links = document.querySelectorAll("a");

function handleToggleForm() {
          const isExpanded = this.getAttribute("aria-expanded") === "true";
          const form = document.querySelector("#feedback-form");
      
          this.setAttribute("aria-expanded", `${!isExpanded}`);
          form.classList.toggle("active", !isExpanded);
}

function handleSubmit(e) {
          e.preventDefault();
          const isExpanded = false;

          toggle.setAttribute("aria-expanded", `${isExpanded}`);
          this.classList.toggle("active", isExpanded);
          this.reset();

          alert("Thank you for your feedback");
}
      
toggle.addEventListener("click", handleToggleForm);
form.addEventListener("submit", handleSubmit);
links.forEach(link => link.addEventListener("click", (e) => e.preventDefault()));

