window.addEventListener("scroll", setScrollVar);
window.addEventListener("resize", setScrollVar);

const htmlElement = document.documentElement;
let prevScrollValue = htmlElement.scrollTop;
let scrollCounter = 0;
let scrollMultiplier = 0;
let initialScrollValue = 0;
let scrollLeftValue = 25;
let pageCounter = 1;
let currentPageScrollValue = 0;

function setScrollVar(event) {
     const currentScrollValue = htmlElement.scrollTop;
     const scrollTopMax = htmlElement.scrollTopMax;
     const clientHeight = htmlElement.clientHeight;
     const documentHeight = htmlElement.scrollHeight;
     // console.log(`Current Scroll Value: ${currentScrollValue}`);
     // console.log(`Client Height: ${clientHeight}`);
     

     const percentOfScreenHeightScrolled = currentScrollValue / clientHeight * 100;
     const percentOfDocumentScrolled = currentScrollValue / scrollTopMax * 100;
     // calculate the scroll direction: +1 = down; -1 = up
     const scrollDirection = (currentScrollValue - prevScrollValue) < 0 ? -1 : 1;

     // console.log(`Percent of Screen Scrolled: ${percentOfScreenHeightScrolled}`);
     // console.log(`Percent of Document Scrolled: ${percentOfDocumentScrolled}`);
     // console.log(`Scroll Direction: ${scrollDirection}`);


     // console.log("scrollDirection:", scrollDirection);

     scrollCounter += scrollDirection;
     // console.log(`scrollCounter: ${scrollCounter}`);

     prevScrollValue = currentScrollValue;

     // targetElement.dataset.scrollValue = scrollMultiplier;

     scrollMultiplier += scrollDirection;
     // console.log(scrollMultiplier);
     // console.log(percentOfScreenHeightScrolled, percentOfDocumentScrolled);
     // set the custom property on the root element

     const scrollMin = 0;
     const scrollMax = 25;
     scrollLeftValue = Math.max(scrollMin, Math.min(scrollMax, scrollLeftValue + -1*scrollDirection));
     // console.log("scrollLeftValue:", scrollLeftValue)
     htmlElement.style.setProperty("--scroll", percentOfScreenHeightScrolled);
     htmlElement.style.setProperty("--scrollValue", scrollDirection);
     htmlElement.style.setProperty("--scrollDirection", scrollLeftValue);

     moveElement(slideRight, scrollLeftValue, 0)

};

function moveElement(element, distanceX, distanceY) {
     element.style.transform = `translate(${distanceX}, ${distanceY})`;
};

const slideRight = document.querySelector('.slide-right');
// moveElement(slideRight, "25%", "-50%");


const sections = document.querySelectorAll("section");
const faders = document.querySelectorAll('.fade-in');
const sliders = document.querySelectorAll('.slide-in');

const appearOptions = {
     // it is the viewport
     root: null, 
     // 0 - 1 scale; 0=initial part of element; 1 = all of the element
     threshold: 0, 
     // similar to margin top/right/bottom/left
     rootMargin: "0px 0px 0px 0px" 
};

const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
               entry.target.classList.toggle("appear", entry.isIntersecting);
               // if visibile stop observing
               if (entry.isIntersecting) observer.unobserve(entry.target);
               scrollLeftValue = 25;
               // console.log(entry.target)
               // entry.target.dataset.scrollValue = 0;
          });
     }, appearOptions);

faders.forEach(fader => {
     observer.observe(fader);
});

sliders.forEach(slider => {
     observer.observe(slider);
});



const sectionOptions = {
     // it is the viewport
     root: null, 
     // 0 - 1 scale; 0=initial part of element; 1 = all of the element
     threshold: 0, 
     // similar to margin top/right/bottom/left
     rootMargin: "0px 0px -1px 0px" 
};

const sectionObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
               entry.target.classList.toggle("appear", entry.isIntersecting);
               // if (entry.isIntersecting) sectionObserver.unobserve(entry.target);
               // console.log("section observer", entry.target);
               // console.log(entry.target.offsetHeight);
          });
     }, sectionOptions);

sections.forEach(section => {
     sectionObserver.observe(section);
})

// on page load
setScrollVar();