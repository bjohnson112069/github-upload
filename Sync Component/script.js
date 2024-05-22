
function loadContent() {
    const links = document.querySelectorAll('a');
    const button = document.querySelector('.dropdown-btn');
    const dropdown = this.querySelector('.dropdown');
    const items = dropdown.querySelectorAll('.dropdown-item');


    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function handleSelectionClick() {
        const code = button.querySelector('.country-code');
        code.textContent = this.textContent;
    }

    function handleButtonClick() {
        dropdown.classList.toggle('active');
    }
    
    
    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    button.addEventListener('click', handleButtonClick);
    items.forEach(item => item.addEventListener('click', handleSelectionClick));
}

document.addEventListener('DOMContentLoaded', loadContent);