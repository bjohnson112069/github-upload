
async function loadContent() {
    const links = document.querySelectorAll('.nav-link');
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
        e.preventDefault(); 
        const confirmation = document.querySelector('.confirmation');

        confirmation.classList.add('active');
        setTimeout(() => {
            confirmation.classList.remove('active');
        }, 3000);


        this.reset();
    }

    // on page load ...

    // Event Listeners
    links.forEach(link => link.addEventListener('click', handleNavLinkClick));
    form.addEventListener('submit', handleFormSubmission);
}

window.addEventListener('DOMContentLoaded', loadContent);