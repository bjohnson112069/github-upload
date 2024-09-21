function loadContent() {
    const links = document.querySelectorAll('a');

    // on page load ...


    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
}

window.addEventListener('DOMContentLoaded', loadContent);