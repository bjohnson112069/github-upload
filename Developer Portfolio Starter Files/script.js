const htmlElement = document.documentElement;
const menuButton = document.querySelector(".mobile-menu");
const navBar = document.querySelector("nav");

function handleMenuClick(e) {
          htmlElement.classList.toggle("disable-scrolling");
          menuButton.classList.toggle("open");
          navBar.classList.toggle("visible");
}

menuButton.addEventListener("click", handleMenuClick);