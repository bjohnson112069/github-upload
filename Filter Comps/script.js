
function loadContent() {
    const links = document.querySelectorAll('a');
    const triggers = document.querySelectorAll(".nav-item");
    const background = document.querySelector('.dropdown-bg');
    const nav = document.querySelector("nav");
    const dropLinks = document.querySelectorAll('.dropdown-link');

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }
    
    function handleEnter() {
        this.classList.add('trigger-enter');
        setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
        background.classList.add('open');

        const dropdown = this.querySelector('.dropdown');
        const activeLink = this.querySelector('.nav-link');
        const links = document.querySelectorAll('.nav-link');
        const dropdownCoords = dropdown.getBoundingClientRect();
        const navCoords = nav.getBoundingClientRect();
        const arrow = document.querySelector('.arrow');

        const coords = {
            height: dropdownCoords.height,
            width: dropdownCoords.width,
            top: dropdownCoords.top - navCoords.top,
            left: dropdownCoords.left - navCoords.left
        };

        arrow.style.left = `${activeLink.offsetLeft + (activeLink.clientWidth / 2)}px`;
    
        background.style.setProperty('width', `${coords.width}px`);
        background.style.setProperty('height', `${coords.height}px`);
        background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
    
        links.forEach(link => link === activeLink ?
            link.classList.add("active") : link.classList.remove("active"))
    }

    function handleLeave() {
        this.classList.remove('trigger-enter', 'trigger-enter-active');
        background.classList.remove('open');
    }

    function handleDropdownClick() {
        const dropItem = this.closest('.dropdown-item');
        const navItem = this.closest('.nav-item');
        const navLink = navItem.querySelector('.nav-link');

        navLink.innerHTML = dropItem.innerHTML;
    }

    // On page load... 

    
    // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
    triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
    triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));
    dropLinks.forEach(link => link.addEventListener('click', handleDropdownClick));
}

window.addEventListener('DOMContentLoaded', loadContent);