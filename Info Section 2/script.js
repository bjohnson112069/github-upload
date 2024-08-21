
function loadContent() {
    const links = document.querySelectorAll('.nav-link');
    const button = document.querySelector('#close-dialog')
    
    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function handleButtonClick() {
        const project = document.querySelector('article');

        project.classList.add('scale-down');
        setTimeout(() => {
            project.classList.remove('scale-down');
        }, 5000);
    }

    // On page load... 

    // Event Listeners
    links.forEach(link => link.addEventListener ('click', handleNavLinkEvent));
    button.addEventListener('click', handleButtonClick);
}

window.addEventListener('DOMContentLoaded', loadContent);