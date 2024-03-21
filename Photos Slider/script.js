const links = document.querySelectorAll("a");


function Slider(slider) {
    if (!(slider instanceof Element)) {
        throw new Error('No slider passed in');
    }

    // create some variables for working iwth the slider
    let current;

    // select the elements needed for the slider
    const slides = slider.querySelector('.slides');
    const prevButton = slider.querySelector('.goToPrev');
    const nextButton = slider.querySelector('.goToNext');
    const viewAll = document.querySelector("#view-all");

    function startSlider() {
          current = slider.querySelector('.current') || slides.firstElementChild;
    }

    function applyClasses() {
          current.classList.add('current');
    }

    function move(direction) {

          // remove the current state from the previous slide
          current.classList.remove('current');

          // if the direction is 'back' ...
          //     current slide = previous sibling or first child
          // else ('forward')
          //     current slide = next sibling or last child
          current = (direction === 'back') ? 
                    (current.previousElementSibling || slides.firstElementChild) : 
                    (current.nextElementSibling || slides.lastElementChild);

          // apply classes to the current slide
          applyClasses();

          // scroll to the left edge of the slides container to the offset of the current slide
          const distance = `${-1 * current.offsetLeft}px`;
          slides.style.left = distance;
    }

    function handleViewAllEvent() {
        const items = slider.querySelectorAll('.slide');
        const arrows = slider.querySelectorAll('.arrow');

        // set a class to reconfigure the grid element

        slides.classList.toggle("all");
        // toggle active status whenever View All is clicked
        arrows.forEach(arrow => arrow.classList.toggle("active"));

        // Change the text on the toggle and capture the state of the toggle
        const view = this.value === "true";

        this.textContent = (view) ? "View All" : "View Less";
        this.value = !view;

        slides.style.left = '0px';
        // If transitinoing from View All to View Less then reinitialize
        if (view) {
            items.forEach(item => item === slides.firstElementChild ?
                item.classList.add('current') :
                item.classList.remove('current'));
            // reinitialize the slider state & classes
            startSlider();
            applyClasses();

        }
    }


    // when this slider is created, run the start slider function
    startSlider();
    applyClasses();

    // Event listeners
    prevButton.addEventListener('click', () => move('back'));
    nextButton.addEventListener('click', () => move('forward'));
    viewAll.addEventListener("click", handleViewAllEvent);
}

const mySlider = Slider(document.querySelector('.album'));

links.forEach(link => link.addEventListener("click", (e) => e.preventDefault()));