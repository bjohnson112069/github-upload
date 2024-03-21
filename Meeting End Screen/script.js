const classesToRemove = ['slide-left', 'slide-right', 'slide-up', 'slide-down', 'scale-up', 'scale-down'];
const links = document.querySelectorAll("a");

links.forEach(link => link.addEventListener("click", (e) => e.preventDefault()));

// on page load, waite 1sec then remove initial animation effects
window.addEventListener('DOMContentLoaded', () => {
          const sliders = document.querySelectorAll(".slide");
      
          setTimeout(() => {
                    sliders.forEach(element => element.classList.remove(...classesToRemove))
          }, 1000);
});


