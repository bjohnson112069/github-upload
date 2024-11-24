async function loadContent() {
    const links = document.querySelectorAll('a');

    // configuration parameters
    const classesToRemove = ['slide-left', 'slide-right', 'slide-up', 'slide-down', 'scale-up', 'scale-down'];

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }



    // on page load ...

    const profile = document.querySelector('#pro-profile');

    setTimeout(() => {
        profile.classList.remove(...classesToRemove);
    }, 2000);

    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
}

window.addEventListener('DOMContentLoaded', loadContent);