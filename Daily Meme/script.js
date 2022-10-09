const baseEndpoint = 'https://meme-api.herokuapp.com/gimme/';
const proxy = 'https://cors-anywhere.herokuapp.com/';

async function fetchData(options) {
  // console.log(`${proxy}${baseEndpoint}${options}`);
  // console.log(`${proxy}${baseEndpoint}`);
  const res = await fetch(`${proxy}${baseEndpoint}${options}`);
  const data = await res.json();
  return data;
}

function handleError(err) {
  console.log(`UH OH!  Error: ${err}`);
}

const form = document.querySelector('.user-form');
const value = form.querySelector('.value');
const range = form.querySelector('[name=range]');
const submit = form.querySelector('[name=submit]');
const slides = document.querySelector('.slides');

function generateSlides(memes) {
  const html = memes.map((meme, index) => {
    let currentClass = '';
    // if first slide set class to current
    if (!index) currentClass = ' current';
    // return `<div class="slide${currentClass}">${index+1}
    // </div>`;
    return `<div class="slide${currentClass}">
      <img src="${meme.url}" alt="${meme.title}"/>
    </div>`;
  });
  // display slides
  slides.innerHTML = html.join('');

  const mySlider = Slider(document.querySelector('.slider'));
}
async function handleSubmit(e) {
  e.preventDefault();
  const rangeValue = e.target.range.value;

 const response = await fetchData(rangeValue).catch(handleError);
 generateSlides(response.memes);
}

function displayValue(e) {
  value.textContent = e.target.value;
}

range.addEventListener('input', displayValue);
form.addEventListener('submit', handleSubmit);

function Slider(slider) {
  if (!(slider instanceof Element)) {
       throw new Error('No Slider Passed In');
  }
  
  // create some variables for working with the slider
  let prev;
  let current;
  let next;

  // select the elements needed for the slider
  const slides = slider.querySelector('.slides')
  const prevButton = slider.querySelector('.goToPrev');
  const nextButton = slider.querySelector('.goToNext');

  function startSlider() {
       current = slider.querySelector('.current') || slides.firstElementChild;
       prev = current.previousElementSibling || slides.lastElementChild;
       next = current.nextElementSibling || slides.firstElementChild;
       // console.log({current, prev, next});
  }

  function applyClasses() {
       current.classList.add('current');
       prev.classList.add('prev');
       next.classList.add('next');
  }

  function move(direction) {
       // first, strip all the classes off the current slides
       const classesToRemove = ['prev', 'current', 'next'];
       current.classList.remove(...classesToRemove);
       prev.classList.remove(...classesToRemove);
       next.classList.remove(...classesToRemove);

       if(direction === 'back') {
            // make a new array of the new values, and destructure them over and into the prev, current, and next variables
            [prev, current, next] = [prev.previousElementSibling || slides.lastElementChild, prev, current];
       } else {
            [prev, current, next] = [current, next, next.nextElementSibling || slides.firstElementChild];
       }
       // console.log({prev, current, next});
       applyClasses();
  }

  function handleKeyUp(e) {
       if(e.key === 'ArrowLeft') return move('back');
       if(e.key === 'ArrowRight') return move('forward');
  }

  // When this slider is created run the startSlider() function
  startSlider();
  applyClasses();

  // Event Listeners
  prevButton.addEventListener('click', () => move('back'));
  nextButton.addEventListener('click', () => move('forward'));
  slider.addEventListener('keyup', handleKeyUp);
}

