
async function loadContent() {
    const links = document.querySelectorAll('a');
    const buttons = document.querySelectorAll('button');
    const navLinks = document.querySelectorAll('.nav-link');
    const menu = document.querySelector('#menu');

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }
    
    function toggleMenu() {
        const nav = document.querySelector('.nav');

        nav.matches('.mobile-expanded') ? 
            nav.classList.remove('mobile-expanded') : 
            nav.classList.add('mobile-expanded');
    }

    // On page load...


    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    buttons.forEach(button => button.addEventListener('click', (e) => e.preventDefault()));
    navLinks.forEach(link => link.addEventListener('click', toggleMenu));
    menu.addEventListener('click', toggleMenu);
}

window.addEventListener('DOMContentLoaded', loadContent);