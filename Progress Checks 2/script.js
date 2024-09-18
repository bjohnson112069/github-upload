function loadContent() {
    const links = document.querySelectorAll('a');
    const progress = document.querySelector('.progress');
    const steps = document.querySelectorAll('.step');

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }


    // on page load ...
    const width = 100 / steps.length;
    steps.forEach((step, i) => {
        setTimeout(() => {
            step.classList.add('active');
            progress.style.width = `${width * (i + 1)}%`;
        }, (i * 1000));
    })

    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
}

window.addEventListener('DOMContentLoaded', loadContent);