
function loadContent() {
    const links = document.querySelectorAll('a');
    const bgs = document.querySelectorAll('.bg');
    const form = document.querySelector('form');
    // const button = document.querySelector('#send-feedback');
    const classesToRemove = ['slide-left', 'slide-right', 'slide-up', 'slide-down', 'scale-up', 'scale-down', 'initial'];

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function handleButtonClick(e) {
        e.preventDefault();

        form.classList.add('scale-down');
        bgs.forEach(bg => bg.classList.add('initial'));
        setTimeout(() => {
            form.reset();
            form.classList.remove('scale-down');
            bgs.forEach(bg => bg.classList.remove(...classesToRemove));
        }, 2000);
    }

    // On page load... 
    setTimeout(() => {
        bgs.forEach(bg => bg.classList.remove(...classesToRemove));
    }, 1000);

    // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
    form.addEventListener('submit', handleButtonClick);
}

window.addEventListener('DOMContentLoaded', loadContent);