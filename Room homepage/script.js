const slideContainer = document.querySelector('.slide__container');
const slides = Array.from(slideContainer.children);
const nextButton = document.querySelector('.hero--button-right');
const prevButton = document.querySelector('.hero--button-left');

const moveToSlide = (track, currentSlide, targetSlide) => {
     currentSlide.classList.remove('current-slide');
     targetSlide.classList.add('current-slide');
     currentSlide.classList.add('is-hidden');
     targetSlide.classList.remove('is-hidden');
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
     if (targetIndex === 0) {
          prevButton.disabled = true;
          nextButton.disabled = false;
     } else if (targetIndex === slides.length - 1) {
          prevButton.disabled = false;
          nextButton.disabled = true;
     } else {
          prevButton.disabled = false;
          nextButton.disabled = false;
     }
}

// when I click left, move slides to the left
prevButton.addEventListener('click', e => {
     const currentSlide = slideContainer.querySelector('.current-slide');
     const prevSlide = currentSlide.previousElementSibling;
     const prevIndex = slides.findIndex(slide => slide === prevSlide);

     moveToSlide(slideContainer, currentSlide, prevSlide);
     hideShowArrows(slides, prevButton, nextButton, prevIndex);
})

// when I click right, move slides to the right
nextButton.addEventListener('click', e => {
     const currentSlide = slideContainer.querySelector('.current-slide');
     const nextSlide = currentSlide.nextElementSibling;
     const nextIndex = slides.findIndex(slide => slide === nextSlide);

     moveToSlide(slideContainer, currentSlide, nextSlide);
     hideShowArrows(slides, prevButton, nextButton, nextIndex);
})

const menuOpen = document.getElementsByClassName('menu--open')[0];
const menuClose = document.getElementsByClassName('menu--close')[0];
const headerNormal = document.getElementsByClassName('header--normal')[0]
const headerOverlay = document.getElementsByClassName('header--overlay')[0]

menuOpen.addEventListener('click', () => {
     headerNormal.classList.toggle('is-hidden')
     headerOverlay.classList.toggle('is-hidden')
})

menuClose.addEventListener('click', () => {
     headerNormal.classList.toggle('is-hidden')
     headerOverlay.classList.toggle('is-hidden')
})