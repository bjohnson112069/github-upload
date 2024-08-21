
function loadContent() {
    const links = document.querySelectorAll('.nav-link');
    const form = document.querySelector('#search-ui');
    
    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function handleFormSubmission(e) {

        e.preventDefault();

        const dora = document.querySelector('#the-map');
        dora.classList.add('active');
        form.classList.add('slide-up');
        setTimeout(() => {
            dora.classList.remove('active');
            form.classList.remove('slide-up');
        }, 5000);
    }

    // On page load... 

    // Event Listeners
    links.forEach(link => link.addEventListener ('click', handleNavLinkEvent));
    form.addEventListener('submit', handleFormSubmission);
}

window.addEventListener('DOMContentLoaded', loadContent);