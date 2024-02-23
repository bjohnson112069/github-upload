

function Slider(slider) {
          if (!(slider instanceof Element)) {
            throw new Error('No slider passed in');
          }
          // create some variables for working iwth the slider
          let prev;
          let current;
          let next;
          // select the elements needed for the slider
          const slides = slider.querySelector('.slides');
          const prevButton = slider.querySelector('.goToPrev');
          const nextButton = slider.querySelector('.goToNext');
        
          function startSlider() {
            current = slider.querySelector('.current') || slides.firstElementChild;
            prev = current.previousElementSibling || slides.lastElementChild;
            next = current.nextElementSibling || slides.firstElementChild;
          }
        
          function applyClasses() {
          //   console.log("applying classes:", { current, prev, next });
            current.classList.add('current');
            prev.classList.add('prev');
            next.classList.add('next');
          }
        
          function move(direction) {
            // first strip all the classes off the current slides
            const classesToRemove = ['prev', 'current', 'next'];
            prev.classList.remove(...classesToRemove);
            current.classList.remove(...classesToRemove);
            next.classList.remove(...classesToRemove);
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
            applyClasses();
            slides.scrollLeft = current.offsetLeft;
            pageNumber.textContent = `0${current.dataset.value}`;
          }
        
          // when this slider is created, run the start slider function
          startSlider();
          applyClasses();
        
          // Event listeners
          prevButton.addEventListener('click', () => move('back'));
          nextButton.addEventListener('click', () => move('forward'));

          /* CLICK AND DRAG */

          let isDown = false;
          let startX;
          let scrollLeft;
          const pageNumber = document.querySelector(".page-number");

          slides.addEventListener('mousedown', (e) => {
                    isDown = true;
                    slides.classList.add('active');
                    startX = e.pageX - slides.offsetLeft;
                    scrollLeft = slides.scrollLeft;
          });

          slides.addEventListener('mouseleave', () => {
                    isDown = false;
                    slides.classList.remove('active');
          });

          slides.addEventListener('mouseup', () => {
                    isDown = false;
                    slides.classList.remove('active');
          });

          slides.addEventListener('mousemove', (e) => {
                    if (!isDown) return;  // stop the fn from running
                    e.preventDefault();
                    const x = e.pageX - slides.offsetLeft;
                    const walk = (x - startX) * 3;
                    slides.scrollLeft = scrollLeft - walk;

                    pageNumber.textContent = `0${e.target.dataset.value}`;

                    const classesToRemove = ['prev', 'current', 'next'];
                    prev.classList.remove(...classesToRemove);
                    current.classList.remove(...classesToRemove);
                    next.classList.remove(...classesToRemove);

                    // make an new array of the new values, and destructure them over and into the prev, current and next variables
                    [prev, current, next] = [
                        // get the prev slide, if there is none, get the last slide from the entire slider for wrapping
                        e.target.previousElementSibling || slides.lastElementChild,
                        e.target,
                        e.target.nextElementSibling || slides.firstElementChild
                    ];

                    applyClasses();
          });

        }
        
const mySlider = Slider(document.querySelector('.slider'));