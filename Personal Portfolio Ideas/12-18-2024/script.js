async function loadContent() {
    // configuration parameters
    const navbar = document.querySelector('#navbar');
    const openNavbar = document.querySelector('#open-navbar-button');
    const closeNavbar = document.querySelector('#close-navbar-button');
    const overlay = document.querySelector('.overlay');
    const media = window.matchMedia('(width <= 780px)');
    const navLinks = document.querySelectorAll('.nav__link');
    const moreButtons = document.querySelectorAll('.view-more-button');
    let isMobile = false;

    // FUNCTIONS
    function openSidebar() {
        navbar.classList.add('show');
        openNavbar.setAttribute('aria-expanded', 'true');
        navbar.removeAttribute('inert', '')
    }

    function closeSidebar() {
        navbar.classList.remove('show');
        openNavbar.setAttribute('aria-expanded', 'false');
        navbar.setAttribute('inert', '')
    }

    function updateNavbar(e) {
        isMobile = e.matches;

        isMobile ? navbar.setAttribute('inert', '') : navbar.removeAttribute('inert', '');
    }

    function handleNavLinkClick() {
        if (isMobile) closeSidebar();

        navLinks.forEach(link => link === this ?
            link.classList.add('nav__link--active') : 
            link.classList.remove('nav__link--active')
        );
    }

    function handleViewMoreClick() {
        const span = this.querySelector('span');
        this.classList.toggle('expanded');

        span.textContent = this.matches('.expanded') ? 'View Less' : 'View More';
    }

    // on page load ...
    gsap.registerPlugin(ScrollTrigger);
    
    updateNavbar(media);

    // Event Listeners
    openNavbar.addEventListener('click', openSidebar);
    closeNavbar.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);
    media.addEventListener('change', (e) => updateNavbar(e));
    navLinks.forEach(link => link.addEventListener('click', handleNavLinkClick));
    moreButtons.forEach(button => button.addEventListener('click', handleViewMoreClick));
}

window.addEventListener('DOMContentLoaded', loadContent);