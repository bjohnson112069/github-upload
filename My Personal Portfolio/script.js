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
               if(!entry.isIntersecting) {
                    return;
               } else {
                    entry.target.classList.add("appear");
                    appearOnScroll.unobserve(entry.target);
               }
          });
     }, appearOptions);

faders.forEach(fader => {
     appearOnScroll.observe(fader);
});

sliders.forEach(slider => {
     appearOnScroll.observe(slider);
});
          

const menuOpen = document.getElementsByClassName('menu--open')[0];
const menuClose = document.getElementsByClassName('menu--close')[0];
const navbarHeader = document.getElementsByClassName('navbar--container')[0];

menuOpen.addEventListener('click', () => {
     navbarHeader.classList.toggle('active')
     menuOpen.classList.toggle('active')
     menuClose.classList.toggle('active')
})

menuClose.addEventListener('click', () => {
     navbarHeader.classList.toggle('active')
     menuOpen.classList.toggle('active')
     menuClose.classList.toggle('active')
})

/* Reset to default active states for large screens */
window.addEventListener("resize", function() {
     if (window.innerWidth > 1000){
          navbarHeader.classList.remove("active");
          menuOpen.classList.remove("active");
          menuClose.classList.remove("active");
     } 
   });