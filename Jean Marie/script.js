const navToggle = document.querySelector(".mobile-nav-toggle");
const nav = document.querySelector(".primary-navigation");
const navLinks = nav.querySelectorAll("li");
var activeLink = nav.querySelector(".active");
const toHome = document.querySelectorAll(".to-home");

// when someone cliks the hambruger button
navToggle.addEventListener("click", () => {
     // if the menu is close, open it
     const visibility = nav.getAttribute("data-visible");

     if (visibility == "false") {
          nav.setAttribute("data-visible", true);
          navToggle.setAttribute("aria-expanded", true);
     } else {
          // if the menu is open, close it
          nav.setAttribute("data-visible", false);
          navToggle.setAttribute("aria-expanded", false);
     }
});

// when someone click on the navigation links
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
     });          
});

// when someone clicks on the up/home section title link
toHome.forEach(link => {
     link.addEventListener("click", () => {
          const firstLink = navLinks[0];
          
          // toggle old active link
          activeLink.classList.toggle('active');
          // toggle to first link in the nodelist (e.g. Home)
          firstLink.classList.toggle('active');
          activeLink = firstLink;

     });
});