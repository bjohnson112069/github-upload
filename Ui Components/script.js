const dropdownButton = document.querySelector(".dropdown-btn");
const dropdownList = document.querySelector(".dropdown-items");
const dropdownItems = dropdownList.querySelectorAll(".dropdown-item");
const slider = document.querySelector(".slider");


function handleDropDownClickEvent() {
  // debugger
  let isHidden= dropdownList.getAttribute("aria-hidden") === "true";
  dropdownButton.classList.toggle("active", isHidden);
  dropdownList.setAttribute("aria-hidden", `${!isHidden}`);
}

function handleDropDownSelectionEvent() {
  console.log(this.querySelector("p").textContent);
  dropdownButton.querySelector("p").textContent = this.querySelector("p").textContent;
  dropdownButton.dataset.value = this.querySelector("p").textContent;
  handleDropDownClickEvent()
}

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
  const circles = document.querySelectorAll(".icon-circle");

  function startSlider() {
    current = slider.querySelector('.current') || slides.firstElementChild;
    prev = current.previousElementSibling || slides.lastElementChild;
    next = current.nextElementSibling || slides.firstElementChild;
    // console.log({ current, prev, next });
  }

  function applyClasses() {
    current.classList.add('current');
    prev.classList.add('prev');
    next.classList.add('next');
  }

  function move() {
    // first strip all the classes off the current slides
    const classesToRemove = ['prev', 'current', 'next'];
    prev.classList.remove(...classesToRemove);
    current.classList.remove(...classesToRemove);
    next.classList.remove(...classesToRemove);

    const selected = document.querySelector(`.slide[data-value="${this.dataset.value}"]`);

    // make an new array of the new values, and destructure them over and into the prev, current and next variables
    [prev, current, next] = [
      // get the prev slide, if there is none, get the last slide from the entire slider for wrapping
      selected.previousElementSibling || slides.lastElementChild,
      selected,
      selected.nextElementSibling || slides.firstElementChild
    ];

    applyClasses();
    slides.scrollLeft = current.offsetLeft;

    circles.forEach(circle => {
      circle === this ? circle.classList.add("active") : circle.classList.remove("active");
    })
  }

  // when this slider is created, run the start slider function
  startSlider();
  applyClasses();

  // Event listeners
  circles.forEach(circle => circle.addEventListener("click", move));
}


// Event listeners ...
dropdownButton.addEventListener("click", handleDropDownClickEvent);
dropdownItems.forEach(item => item.addEventListener("click", handleDropDownSelectionEvent));

// on page load ...
const mySlider = Slider(document.querySelector('.slider'));