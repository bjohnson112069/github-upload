
function loadContent() {
    const links = document.querySelectorAll('.nav-link');
    const dropBtns = document.querySelectorAll('.dropdown-btn')
    const form = document.querySelector('#edit-account');
    const cancel = document.querySelector('#cancel');
    const exit = document.querySelector('#exit');
    const YEARS = {
        start: 2024,
        end: 1924
    };
    const MONTHS = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ]
    const DAYS = {
        start: 1,
        end: 31
    }
    
    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function createDropdownItem(value) {
        const str = value.charAt(0).toUpperCase() + value.slice(1);
        return `<button type="button" class="btn dropdown-item" value="${str}">${str}</button>`;
    }

    function generateDropdownMenuContent() {
        let dropdown, list, HTML;

        // generate Month dropdown menu options
        dropdown = document.querySelector('#dropdown-month');
        list = dropdown.querySelector('.dropdown-list');
        list.innerHTML = MONTHS.map(month => createDropdownItem(month)).join('');

        // generate Days dropdown menu options
        dropdown = document.querySelector('#dropdown-day');
        list = dropdown.querySelector('.dropdown-list');
        HTML = '';
        for (let i = DAYS.start; i <= DAYS.end; i++) {
            HTML += createDropdownItem(`${i}`);
        }
        list.innerHTML = HTML;

        // generate Years dropdown menu options
        dropdown = document.querySelector('#dropdown-year');
        list = dropdown.querySelector('.dropdown-list');
        HTML = '';
        for (let i = YEARS.start; i >= YEARS.end; i--) {
            HTML += createDropdownItem(`${i}`);
        }
        list.innerHTML = HTML;
        
        // Event Listeners
        const itemBtns = document.querySelectorAll('.dropdown-item');
        itemBtns.forEach(item => item.addEventListener('click', handleMenuItemClick));
    }

    function toggleDropdown(dropdown) {
        dropdown.classList.toggle('opened');
    }

    function handleMenuButtonClick() {

        dropBtns.forEach(btn => {
            const dropdown = btn.closest('.dropdown');

            dropdown === this.closest('.dropdown') ?
                dropdown.classList.toggle('opened') : 
                dropdown.classList.remove('opened');
            });
    }

    function handleMenuItemClick() {
        const dropdown = this.closest('.dropdown');
        const choice = dropdown.querySelector('#dropdown-choice');
        
        choice.textContent = this.textContent;
        toggleDropdown(dropdown);
    }

    function resetDropdownButtons() {
        const choices = ['Month', 'Day', 'Year'];

        dropBtns.forEach((button, index) => {
            button.querySelector('#dropdown-choice').textContent = choices[index];
        })
    }

    function handleFormSubmission(e) {
        e.preventDefault();
        const scaler = document.querySelector('.scale');

        form.reset();
        resetDropdownButtons();

        scaler.classList.add('scale-down');
        setTimeout(() => {
            scaler.classList.remove('scale-down');
        }, 3000);
    }

    // On page load... 
    generateDropdownMenuContent();

    // Event Listeners
    links.forEach(link => link.addEventListener ('click', handleNavLinkEvent));
    dropBtns.forEach(button => button.addEventListener('click', handleMenuButtonClick));
    // itemBtns.forEach(item => item.addEventListener('click', handleMenuItemClick));
    form.addEventListener('submit', handleFormSubmission);
    cancel.addEventListener('click', handleFormSubmission);
    exit.addEventListener('click', handleFormSubmission);
}

window.addEventListener('DOMContentLoaded', loadContent);