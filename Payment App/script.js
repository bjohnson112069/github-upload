const slider = document.querySelector('.slider');
const menuClose = document.querySelector(".icon-close");

window.addEventListener('DOMContentLoaded', () => {

          slider.classList.add("active");
});

menuClose.addEventListener("click", () => {
          slider.classList.remove("active");
          
          const content = document.querySelector(".content");
          const payments = document.querySelector("#frequent-payments");
          const contacts = document.querySelectorAll(".contact");
          const classesToRemove = ['slide-left', 'slide-right', 'slide-up', 'slide-down'];

          setTimeout(() => {
                    payments.classList.remove(...classesToRemove);
                    contacts.forEach(job => job.classList.remove(...classesToRemove))
          }, 500);
});

function Slider(slider) {
          if (!(slider instanceof Element)) {
            throw new Error('No slider passed in');
          }

          // create some variables for working iwth the slider
          let prev;
          let current;
          let next;
          let circle;

          // select the elements needed for the slider
          const slides = slider.querySelector('.slides');
          const prevButton = slider.querySelector('.goToPrev');
          const nextButton = slider.querySelector('.goToNext');
        
          function startSlider() {
            current = slider.querySelector('.current') || slides.firstElementChild;
            prev = current.previousElementSibling || slides.lastElementChild;
            next = current.nextElementSibling || slides.firstElementChild;
            circle = document.querySelector(`.circle[data-value="${current.dataset.value}"]`);
          //   console.log({ current, prev, next, circle });
          }
        
          function applyClasses() {
            current.classList.add('current');
            prev.classList.add('prev');
            next.classList.add('next');
            circle.classList.add('current');
          }
        
          function move(direction) {
            // first strip all the classes off the current slides
            const classesToRemove = ['prev', 'current', 'next'];
            prev.classList.remove(...classesToRemove);
            current.classList.remove(...classesToRemove);
            next.classList.remove(...classesToRemove);
            circle.classList.remove(...classesToRemove);
            if (direction === 'back') {
              // make an new array of the new values, and destructure them over and into the prev, current and next variables
              [prev, current, next] = [
                // get the prev slide, if there is none, get the last slide from the entire slider for wrapping
                prev.previousElementSibling || slides.lastElementChild,
                prev,
                current,
              ];
            } else {
              [prev, current, next] = [
                current,
                next,
                // get the next slide, or if it's at the end, loop around and grab the first slide
                next.nextElementSibling || slides.firstElementChild,
              ];
            }
            circle = document.querySelector(`.circle[data-value="${current.dataset.value}"]`);
            applyClasses();
          }
        
          // when this slider is created, run the start slider function
          startSlider();
          applyClasses();
        
          // Event listeners
          prevButton.addEventListener('click', () => move('back'));
          nextButton.addEventListener('click', move);
}
        
const mySlider = Slider(document.querySelector('.slider'));
