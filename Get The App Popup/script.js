const classesToRemove = ['slide-left', 'slide-right', 'slide-up', 'slide-down', 'scale-up', 'scale-down'];
const links = document.querySelectorAll("a");
const exit = document.querySelector(".fa-x");

function handleExitEvent() {
          const popup = document.querySelector(".popup");

          popup.classList.add("scale-down");
          setTimeout(() => {
                    popup.classList.remove("scale-down");
          }, 3000);
}

exit.addEventListener("click", handleExitEvent);
links.forEach(link => link.addEventListener("click", (e) => e.preventDefault()));



// on page load, waite 1sec then remove initial animation effects
window.addEventListener('DOMContentLoaded', () => {
          // const sliders = document.querySelectorAll(".slide");
          const scalers = document.querySelectorAll(".scale");
          // const rotaters = document.querySelectorAll(".rotate");
      
          setTimeout(() => {
                    // sliders.forEach(element => element.classList.remove(...classesToRemove))
                    scalers.forEach(element => element.classList.remove(...classesToRemove))
                    // rotaters.forEach(element => element.classList.remove(...classesToRemove))
          }, 1000);
});