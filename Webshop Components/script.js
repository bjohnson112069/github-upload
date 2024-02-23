const links = document.querySelectorAll(".nav-link");
const slides = document.querySelectorAll(".slide");
const buttons = document.querySelectorAll("button[data-slide]");
const hearts = document.querySelectorAll(".icon-heart");

let slideIndex = 1;
let interval;
const POSITIONS = {
          1: [0, 100, 200, 300], 
          2: [-100, 0, 100, 200],
          3: [-200, -100, 0, 100],
          4: [-300, -200, -100, 0]
}

function displaySlides(slideIndex) {

          slides.forEach((slide, arrIndex) => {
                    slide.style.transform = `translateX(${POSITIONS[slideIndex][arrIndex]}%)`;
          })

          buttons.forEach(button => parseInt(button.dataset.slide) === slideIndex ? button.classList.add("active") : button.classList.remove("active"));

}

function handleLikeEvent(e) {
          this.classList.toggle("active");
}

function handleNavLinkClick(e) {
          e.preventDefault();

          links.forEach(link => {
                    const item = link.parentElement;
                    link === this ? item.classList.add("active") : item.classList.remove("active");
          })
}

// Event listners to handle button clicks
hearts.forEach(heart => heart.addEventListener("click", handleLikeEvent));

// Prevent Default on nav links to prevent redirect error
// links.forEach(link => link.addEventListener("click", (e) => e.preventDefault()));
links.forEach(link => link.addEventListener("click", handleNavLinkClick));

// When the DOM finishes parsing ...
window.addEventListener('DOMContentLoaded', () => {
          // set an interval whcih launches every 5 second
          interval = setInterval(() => {
                    slideIndex += 1;
                    if (slideIndex > slides.length) {slideIndex = 1};
                    displaySlides(slideIndex);
          }, 5000);
});
