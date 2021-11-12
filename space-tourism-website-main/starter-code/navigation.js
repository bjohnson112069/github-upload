const navToggle = document.querySelector(".mobile-nav-toggle");
const nav = document.querySelector(".primary-navigation");
const srOnly = document.querySelector(".sr-only");

// when someone clise the hambruger button
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

