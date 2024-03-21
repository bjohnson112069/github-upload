const classesToRemove = ['slide-left', 'slide-right', 'slide-up', 'slide-down', 'scale-up', 'scale-down'];
const links = document.querySelectorAll("a");
const form = document.querySelector("#login-form");

function handleSubmitEvent(e) {
          e.preventDefault();

          const hero = document.querySelector("#hero");

          hero.classList.add("scale-down");
          setTimeout(() => {
                    hero.classList.remove("scale-down");
          }, 3000);

          form.reset();
}

form.addEventListener("submit", handleSubmitEvent);
links.forEach(link => link.addEventListener("click", (e) => e.preventDefault()));

// on page load, waite 1sec then remove initial animation effects
window.addEventListener('DOMContentLoaded', () => {
          const scalers = document.querySelectorAll(".scale");
      
          setTimeout(() => {
                    scalers.forEach(element => element.classList.remove(...classesToRemove))
          }, 1000);
});


