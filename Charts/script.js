
function loadContent() {
    const links = document.querySelectorAll('a');
    const elements = document.querySelectorAll(".slide");
    const readReport = document.querySelector('#full-report');
    const goals = document.querySelector('#goals');
    const exti = document.querySelector('#exit');
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
    elements.forEach(element => element.classList.remove(...classesToRemove));
    
   // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
    readReport.addEventListener('click', (e) => goals.classList.toggle('active'));
    exit.addEventListener('click', (e) => goals.classList.toggle('active'));
}

window.addEventListener('DOMContentLoaded', loadContent);