
function loadContent() {
    const links = document.querySelectorAll('a');
    const dropBtns = document.querySelectorAll('.dropdown-btn')
    const dropLinks = document.querySelectorAll('.dropdown-link');
    const form = document.querySelector('.search-bar');

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function toggleDropdown(dropdown) {
        dropdown.classList.toggle('opened');
    }

    function handleMenuButtonClick() {
        const dropdown = this.closest('.dropdown');
        toggleDropdown(dropdown);
    }

    function handleMenuLinkClick() {
        const dropdown = this.closest('.dropdown');
        const choice = dropdown.querySelector('#dropdown-choice');
        
        choice.textContent = this.textContent;
        toggleDropdown(dropdown);
    }

    function handleFormSubmission(e) {
        e.preventDefault();

        const scaler = document.querySelector('.scale');
        scaler.classList.add('scale-down');
        setTimeout(() => {
            scaler.classList.remove('scale-down');
        }, 3000);
    }

    // On page load... 

    
    // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
    dropBtns.forEach(button => button.addEventListener('click', handleMenuButtonClick));
    dropLinks.forEach(link => link.addEventListener('click', handleMenuLinkClick));
    form.addEventListener('submit', handleFormSubmission);
}

window.addEventListener('DOMContentLoaded', loadContent);