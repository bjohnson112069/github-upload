
function loadContent() {
    const links = document.querySelectorAll('.nav-link');
    const mobile = document.querySelector('.mobile-menu');

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function handleNavLinkClick(e) {
        e.preventDefault();

        const dropdown = document.querySelector('.dropdown-menu');

        // set active state for the nav links
        links.forEach(link => {
            link === this ? 
            link.classList.toggle('active') : link.classList.remove('active');
        });

        this.matches('#signin-link') ? 
            dropdown.classList.toggle('expanded') : 
            dropdown.classList.remove('expanded');    
    }

    function handleMobileMenuClick() {
        const htmlElement = document.documentElement;
        const nav = document.querySelector('nav');

        this.classList.toggle('expanded');
        nav.classList.toggle('expanded');
        htmlElement.classList.toggle("disable-scrolling");
    }

    // On page load... 

    // Event Listeners
    links.forEach(link => link.addEventListener ('click', handleNavLinkClick));
    mobile.addEventListener('click', handleMobileMenuClick);
}

window.addEventListener('DOMContentLoaded', loadContent);