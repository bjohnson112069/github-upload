function loadContent() {
    const links = document.querySelectorAll('.nav-link');
    const heart = document.querySelector('.icon-heart');

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function handleHeartClick() {
        this.classList.toggle('active');
    }

    // on page load ...

    // Event Listeners
    links.forEach(link => link.addEventListener('click', handleNavLinkClick));
    heart.addEventListener('click', handleHeartClick);
}

window.addEventListener('DOMContentLoaded', loadContent);