
function loadContent() {
    const links = document.querySelectorAll('a');
    const menu = document.querySelector('.menu');
    const button = document.querySelector('#sign-in')

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function toggleMenu() {
        const aside = document.querySelector('aside');

        aside.classList.toggle('active');
    }

    function handleLinkEvent(e) {
        e.preventDefault();

        if (this.matches('.nav-link')) this.classList.toggle('active');
    }

   // On page load... 

   // Event Listeners
    links.forEach(link => link.addEventListener ('click', handleLinkEvent));
    menu.addEventListener('click', toggleMenu);
    button.addEventListener('click', toggleMenu);
}

window.addEventListener('DOMContentLoaded', loadContent);