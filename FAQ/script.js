
function loadContent() {
    const links = document.querySelectorAll('a');
    const options = document.querySelector('#options');
    const pricing = document.querySelector('#pricing');
    const started = document.querySelector('#get-started');
    const classesToRemove = ['slide-left', 'slide-right', 'slide-up', 'slide-down', 'scale-up', 'scale-down'];

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }


    // On page load... 
    setTimeout(() => {
        options.classList.remove(...classesToRemove);
        setTimeout(() => {
            pricing.classList.remove(...classesToRemove);
            setTimeout(() => {
                started.classList.remove(...classesToRemove);
            }, 1000);
        }, 1000);
    }, 1000);
    
    // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
}

window.addEventListener('DOMContentLoaded', loadContent);