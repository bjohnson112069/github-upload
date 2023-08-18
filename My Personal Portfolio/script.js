const sections = document.querySelectorAll("section");
const faders = document.querySelectorAll('.fade-in');
const sliders = document.querySelectorAll('.slide-in');

const appearOptions = {
     root: null, // it is the viewport
     threshold: 0, // 0 - 1 scale; 0=initial part of element; 1 = all of the element
     rootMargin: "0px 0px -250px 0px" // similar to margin (in quotes) in CSS (e.g. origin)
};

const appearOnScroll = new IntersectionObserver(
     function(entries, appearOnScroll) {
          entries.forEach(entry => {
               // toggle class based on currnet value of visibility/intersection
               entry.target.classList.toggle("appear", entry.isIntersecting);
               // if visibile stop observing
               if (entry.isIntersecting) appearOnScroll.unobserve(entry.target);
          });
     }, appearOptions);

faders.forEach(fader => {
     appearOnScroll.observe(fader);
});

sliders.forEach(slider => {
     appearOnScroll.observe(slider);
});
        


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
      //  console.log({ current, prev, next });
     }
   
     function applyClasses() {
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
     }
   
     // when this slider is created, run the start slider function
     startSlider();
     applyClasses();
   
     // Event listeners
     prevButton.addEventListener('click', () => move('back'));
     nextButton.addEventListener('click', move);
}

const mySlider = Slider(document.querySelector('.slider'));


const navToggle = document.querySelector(".mobile-nav-toggle");
const nav = document.querySelector(".nav-container");
const body = document.querySelector('body');


function setNavMenuStatus(boolean) {
     nav.setAttribute("data-visible", boolean);
     navToggle.setAttribute("aria-expanded", boolean);
     body.classList.toggle("disable-scrolling", boolean);
}

// when someone cliks the hambruger button
navToggle.addEventListener("click", () => {
     const visibility = nav.getAttribute("data-visible");
     // convert string to boolean value
     let booleanValue = (visibility === "true");

     // toggle the visibility status of the nav menu (using the ! operator)
     setNavMenuStatus(!booleanValue);
});

// when someone clicks on the navigation links
const navLinks = nav.querySelectorAll(".nav-link");
var activeLink = nav.querySelector(".active");

navLinks.forEach(navLink => {
     navLink.addEventListener("click", () => {
          // toggle old active link
          if(activeLink != null) activeLink.classList.toggle('active');

          // toggle new active link
          navLink.classList.toggle('active');
          activeLink = navLink;
          
          // if the menu is open, close (e.g. false) it
          setNavMenuStatus(false);
     });          
});
