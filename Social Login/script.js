
function loadContent() {
    const links = document.querySelectorAll('a');
    const form = document.querySelector('form');
    const classesToRemove = ['slide-left', 'slide-right', 'slide-up', 'slide-down', 'scale-up', 'scale-down'];

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

        this.classList.add('scale-down');
        setTimeout(() => this.classList.remove('scale-down'), 3000);

        this.reset();
    }

    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    form.addEventListener('submit', handleFormSubmission);
}

document.addEventListener('DOMContentLoaded', loadContent);