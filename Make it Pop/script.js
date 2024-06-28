
function loadContent() {
    const links = document.querySelectorAll('a');

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function handleLinkEvent() {
        links.forEach(link => {
            link === this ? link.classList.add('active') : link.classList.remove('active');
        })
    }

    // On page load... 
    
    // Event Listeners
    links.forEach(link => link.addEventListener ('click', handleLinkEvent));
}

window.addEventListener('DOMContentLoaded', loadContent);