
async function loadContent() {
    const links = document.querySelectorAll('a');
    const menu = document.querySelector('#mobile-menu-button');
    const navLinks = document.querySelectorAll('.nav-link');

    function handleMenuButtonClick() {
        const header = document.querySelector('header');
        const htmlElement = document.documentElement;
        
        header.classList.toggle('expanded');
        htmlElement.classList.toggle("disable-scrolling");
    }

    function handleNavLinkClick() {
        navLinks.forEach(link => link === this ? link.classList.add('active') : link.classList.remove('active'));
    }

    // On page load... 
   // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
    menu.addEventListener('click', handleMenuButtonClick);
    navLinks.forEach(link => link.addEventListener('click', handleNavLinkClick));
}

window.addEventListener('DOMContentLoaded', loadContent);