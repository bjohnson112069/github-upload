const classesToRemove = ['slide-left', 'slide-right', 'slide-up', 'slide-down', 'scale-up', 'scale-down'];
const links = document.querySelectorAll("a");
const notification = document.querySelector("#notification");
const exit = document.querySelector("header").querySelector(".icon");

function handleExitEvent() {
          console.log(this);

          notification.classList.add("scale", "scale-down");
          setTimeout(() => {
                    notification.classList.remove(...classesToRemove);
          }, 3000);
}


exit.addEventListener("click", handleExitEvent);
links.forEach(link => link.addEventListener("click", (e) => e.preventDefault()));

// on page load, waite 1sec then remove initial animation effects
window.addEventListener('DOMContentLoaded', () => {
          const sliders = document.querySelectorAll(".slide");

          notification.classList.remove(...classesToRemove);
          setTimeout(() => {
                    sliders.forEach(element => element.classList.remove(...classesToRemove))
          }, 1000);
});


