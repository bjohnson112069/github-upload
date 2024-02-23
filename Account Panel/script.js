const links = document.querySelectorAll("a");
const exit = document.querySelector("#sign-out");

function Slider(slider) {
          if (!(slider instanceof Element)) {
                    throw new Error('No slider passed in');
          }

          // create some variables for working iwth the slider
          let prev;
          let current;
          let next;

          // select the elements needed for the slider
          const slides = slider.querySelector('.accounts');
          const min = parseInt(slides.firstElementChild.dataset.account);
          const max = parseInt(slides.lastElementChild.dataset.account);
          const prevButton = slider.querySelector('.goToPrev');
          const nextButton = slider.querySelector('.goToNext');
        
          function startSlider() {
                    current = slider.querySelector('.current') || slides.firstElementChild;
                    prev = current.previousElementSibling || slides.lastElementChild;
                    next = current.nextElementSibling || slides.firstElementChild;
          }
          
          function applyClasses() {
                    current.classList.add('current');
                    prev.classList.add('prev');
                    next.classList.add('next');
                    parseInt(current.dataset.account) === (min + 1) ? prevButton.setAttribute("disabled", "true") : prevButton.removeAttribute("disabled");
                    
                    parseInt(current.dataset.account) === (max - 1) ? nextButton.setAttribute("disabled", "true") : nextButton.removeAttribute("disabled");

                    // console.log({ current, prev, next });
          }
        
          function move(direction) {
                    // first strip all the classes off the current slides
                    const classesToRemove = ['prev', 'current', 'next'];

                    // If direction is back and within bounds ...
                    if ( (direction === 'back') && (parseInt(current.dataset.account) > (min + 1)) ) {
                              prev.classList.remove(...classesToRemove);
                              current.classList.remove(...classesToRemove);
                              next.classList.remove(...classesToRemove);

                              // make an new array of the new values, and destructure them over and into the prev, current and next variables
                              [prev, current, next] = [
                                        prev.previousElementSibling,
                                        prev,
                                        current
                              ];
                    } 
                    
                    // if direction is forward and within bounds ...
                    if ( (direction === 'forward') && parseInt(current.dataset.account) < (max - 1) ) {
                              prev.classList.remove(...classesToRemove);
                              current.classList.remove(...classesToRemove);
                              next.classList.remove(...classesToRemove);

                              [prev, current, next] = [
                                        current,
                                        next,
                                        next.nextElementSibling
                              ];
                    }

                    applyClasses();

                    // scroll to the left edge of the prev element
                    slides.scrollLeft = prev.offsetLeft;
          }

          // when this slider is created, run the start slider function
          startSlider();
          applyClasses();

          // Event listeners
          prevButton.addEventListener('click', () => move('back'));
          nextButton.addEventListener('click', () => move('forward'));
}
        
function handleSignOutEvent() {
          const switchAcct = document.querySelector("#switch-account");

          switchAcct.classList.add("sign-out");

          setTimeout(() => {
                    switchAcct.classList.remove("sign-out");
          }, 2000);
}

const mySlider = Slider(document.querySelector('.slider'));
exit.addEventListener("click", handleSignOutEvent);
links.forEach(link => link.addEventListener("click", (e) => e.preventDefault()));