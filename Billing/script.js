function loadContent() {
    const links = document.querySelectorAll('a');
    const nav = document.querySelector('nav');
    const navButtons = nav.querySelectorAll('button');

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    // handle Nav Button Click Event
    function handleNavButtonClick() {
        navButtons.forEach(button => {
            const navItem = button.parentElement;
            button === this ? navItem.classList.add('active') : navItem.classList.remove('active')
        });
    }

    // on page load ...


    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    navButtons.forEach(button => button.addEventListener('click', handleNavButtonClick));
}

window.addEventListener('DOMContentLoaded', loadContent);