
function loadContent() {
    const links = document.querySelectorAll('a');
    const done = document.querySelector('#done');
    const cancel = document.querySelector('#cancel');

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
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
    cancel.addEventListener('click', (e) => {
        e.preventDefault();
        e.target.form.classList.add('scale-down');
        setTimeout(() => {
            e.target.form.classList.remove('scale-down');
        }, 3000);
    });
    done.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Settings updated');
    });
}

window.addEventListener('DOMContentLoaded', loadContent);