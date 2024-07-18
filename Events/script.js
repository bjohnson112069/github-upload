
function loadContent() {
    const links = document.querySelectorAll('a');
    const toggles = document.querySelectorAll('.toggle-details');
    const classesToRemove = ['slide-left', 'slide-right', 'slide-up', 'slide-down', 'scale-up', 'scale-down'];

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function toggleDetails() {
        const event = this.parentElement;

        this.classList.toggle('expanded');
        event.classList.toggle('expanded');
    }

    // On page load... 

    
    // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
    toggles.forEach(toggle => toggle.addEventListener('click', toggleDetails));
}

window.addEventListener('DOMContentLoaded', loadContent);