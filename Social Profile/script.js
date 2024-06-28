
function loadContent() {
    const links = document.querySelectorAll('a');
    const buttons = document.querySelectorAll('#follow');

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function handleButtonClick() {

        this.textContent = this.matches('.following') ? 'Follow' : 'Following';

        this.classList.toggle('following');
    }

    // On page load... 

    // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
    buttons.forEach(button => button.addEventListener('click', handleButtonClick));
}

window.addEventListener('DOMContentLoaded', loadContent);