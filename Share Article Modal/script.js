function loadContent() {
    const links = document.querySelectorAll('a');
    const modal = document.querySelector('#share-article');
    const exits = document.querySelectorAll('.close-modal');

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function handleCloseModal() {
        modal.classList.add('slide', 'slide-up');

        setTimeout(() => {
            modal.classList.remove('slide-up');
        }, 2000);
    }

    // on page load ...

    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    exits.forEach(exit => exit.addEventListener('click', handleCloseModal));
}

window.addEventListener('DOMContentLoaded', loadContent);