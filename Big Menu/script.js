
function loadContent() {
    const links = document.querySelectorAll('a');
    const trigger = document.querySelector('.mobile-menu-trigger');
    const homeBtn = document.querySelector('.home');
    const menuLinks = document.querySelectorAll('.menu-bar-link');
    const backBtns = document.querySelectorAll('.mobile-menu-back');
    
    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function toggleMenuBar() {
        const bar = document.querySelector('.menu-bar');
        bar.classList.toggle('active');
    }

    function toggleMegaMenu() {

        const mega = this.matches('.menu-bar-link') ? 
        this.closest('li').querySelector('.mega-menu') : 
        this.closest('.mega-menu');

        if (mega != null) {
            mega.classList.toggle('active');
        }
    }

    // On page load... 

    // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
    trigger.addEventListener('click', toggleMenuBar);
    homeBtn.addEventListener('click', toggleMenuBar);
    backBtns.forEach(btn => btn.addEventListener('click', toggleMegaMenu));
    menuLinks.forEach(link => link.addEventListener('click', toggleMegaMenu));
}

window.addEventListener('DOMContentLoaded', loadContent);