const followers = document.querySelector("#followers");
const classesToRemove = ['slide-left', 'slide-right', 'slide-up', 'slide-down', 'scale-up', 'scale-down'];


followers.addEventListener("transitionend", () => {
          console.log("here")
          const elements = document.querySelectorAll(".slide");

          setTimeout(() => {
                    elements.forEach(element => element.classList.remove(...classesToRemove))
          }, 500);      
})




// on page load, waite 1sec then remove initial animation effects
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
              followers.classList.remove(...classesToRemove)
    }, 500);
});