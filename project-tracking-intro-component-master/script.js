function loadContent() {
    const links = document.querySelectorAll('a');
    const header = document.querySelector('header');
    const menu = document.querySelector('.menu-button')

    // function to handle the Menu Button Click Event
    function handleMenuButtonClick() {
        header.classList.toggle('expanded');
    }

    // on page load ...

    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    menu.addEventListener('click', handleMenuButtonClick);
}

window.addEventListener('DOMContentLoaded', loadContent);