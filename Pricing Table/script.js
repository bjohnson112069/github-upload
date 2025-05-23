
function loadContent() {
    const buttons = document.querySelectorAll('button');
    const links = document.querySelectorAll('a');

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
    buttons.forEach(button => button.addEventListener ('click', (e) => e.preventDefault()));
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
}

window.addEventListener('DOMContentLoaded', loadContent);