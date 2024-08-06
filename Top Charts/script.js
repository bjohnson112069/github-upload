
function loadContent() {
    const links = document.querySelectorAll('.nav-link');
    
    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }


    // On page load... 

    // Event Listeners
    links.forEach(link => link.addEventListener ('click', handleNavLinkEvent));
}

window.addEventListener('DOMContentLoaded', loadContent);