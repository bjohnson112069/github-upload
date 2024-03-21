


// on page load, waite 1sec then remove initial animation effects
window.addEventListener('DOMContentLoaded', () => {
          const elements = document.querySelectorAll(".slide");
          const classesToRemove = ['slide-left', 'slide-right', 'slide-up', 'slide-down', 'scale-up', 'scale-down'];
      
          setTimeout(() => {
              elements.forEach(element => element.classList.remove(...classesToRemove))
          }, 2000);
});