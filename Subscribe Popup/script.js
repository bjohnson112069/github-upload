
function loadContent() {
    const links = document.querySelectorAll('a');
    const form = document.querySelector('form');

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }


    function handleFormSubmission(e) {
        // prevent the form from submitting
        e.preventDefault();

        const input = form.querySelector('.input-wrapper');
        const confirmation = form.querySelector('.confirmation');

        input.classList.add('slide-right');
        confirmation.classList.add('active');

        setTimeout(() => window.location.reload(true), 4000);
    }

    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    form.addEventListener('submit', handleFormSubmission);
}

document.addEventListener('DOMContentLoaded', loadContent);