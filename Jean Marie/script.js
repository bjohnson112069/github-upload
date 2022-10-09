const navToggle = document.querySelector(".mobile-nav-toggle");
const nav = document.querySelector(".primary-navigation");
const navLinks = nav.querySelectorAll("li");
const body = document.querySelector('body');
var activeLink = nav.querySelector(".active");


// when someone cliks the hambruger button
navToggle.addEventListener("click", () => {
     const visibility = nav.getAttribute("data-visible");

     // if the menu is close, open it
     if (visibility == "false") {
          nav.setAttribute("data-visible", true);
          navToggle.setAttribute("aria-expanded", true);
          body.classList.add('disable-scrolling');
     } else {
          // if the menu is open, close it
          nav.setAttribute("data-visible", false);
          navToggle.setAttribute("aria-expanded", false);
          body.classList.remove('disable-scrolling');
     }
});

const primaryHeader = document.querySelector("#header");

// callback function for ResizeObserver
const myObserver = new ResizeObserver(entries => {
   for (let entry of entries) {
     const navigationHeight = entry.target.offsetHeight;

     // Calculate the height of the primary-header then set the --scroll-padding custom property
     document.documentElement.style.setProperty("--scroll-padding", navigationHeight - 1 + "px");     
   }
});

// Observer Primary Header for resizing
myObserver.observe(primaryHeader);

// when someone clicks on the navigation links
navLinks.forEach(navLink => {
     navLink.addEventListener("click", () => {

          // toggle old active link
          activeLink.classList.toggle('active');
          // toggle new active link
          navLink.classList.toggle('active');
          activeLink = navLink;
          
          // if the menu is open, close it
          nav.setAttribute("data-visible", false);
          navToggle.setAttribute("aria-expanded", false);
          body.classList.remove('disable-scrolling');
     });          
});

window.addEventListener('resize', () => {
     console.log(`Window Height: ${window.innerHeight}px / Nav Height: ${nav.offsetHeight}px`)
});

