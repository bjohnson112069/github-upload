
async function loadContent() {
    const links = document.querySelectorAll('a');
    const menu = document.querySelector('.menu');


    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function toggleMenu() {
        const nav = document.querySelector('nav');
        
        if (this.matches('.closed')) {
            this.classList.remove('closed');
            this.classList.add('open');
            nav.classList.add('expanded');
        } else if (this.matches('.open')) {
            this.classList.remove('open');
            this.classList.add('closed');
            nav.classList.remove('expanded');
        }
    }
    
    // On page load...

    
    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    menu.addEventListener('click', toggleMenu);
}

window.addEventListener('DOMContentLoaded', loadContent);