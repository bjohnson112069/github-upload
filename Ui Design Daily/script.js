
async function loadContent() {
    const links = document.querySelectorAll('.nav-link');
    const menu = document.querySelector('#mobile-menu-button');
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownLinks = document.querySelectorAll('.dropdown-link');
    const filters = document.querySelectorAll('.filter');
    const search = document.querySelector('#search');

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function handleMenuButtonClick() {
        const header = document.querySelector('header');
        const htmlElement = document.documentElement;
        
        header.classList.toggle('expanded');
        htmlElement.classList.toggle("disable-scrolling");
    }

    function handleNavLinkClick() {
        navLinks.forEach(link => link === this ? link.classList.add('active') : link.classList.remove('active'));
    }

    function toggleDropdown(dropdown) {
        dropdown.classList.toggle('opened');
    }

    function handleDropdownButtonClick() {
        const dropdown = this.closest('.dropdown');
        toggleDropdown(dropdown);
    }

    function handleDropdownLinkClick() {
        const dropdown = this.closest('.dropdown');
        const choice = dropdown.querySelector('#dropdown-choice');
        
        choice.textContent = this.textContent;
        toggleDropdown(dropdown);
    }

    function filterByFormat(term) {
        const searchTerm = term.trim().toLowerCase();
        
        const results = data.filter(item => {
            return item.format.toLowerCase().includes(searchTerm);
        });
        
        displayThumbnails(results);
    }

    function filterByTag(term) {
        const searchTerm = term.trim().toLowerCase();
        
        const results = term === 'all' ? data : data.filter(item => {
            return item.tags.filter(tag => tag.toLowerCase().includes(searchTerm)).length;
        });
        
        displayThumbnails(results);
    }

    function handleFilterClick() {
        const parent = this.closest('.filters');
        const filters = parent.querySelectorAll('.filter');

        filters.forEach(filter => filter === this ? filter.classList.add('active') : filter.classList.remove('active'));

        parent.matches('#format-filters') ? filterByFormat(this.value) : filterByTag(this.value);
    }

    async function fetchData(endpt) {
        const response = await fetch(`${endpt}`, {
            headers: {
                Accept: 'application/json',
            },
        });
        const data = await response.json();
        return data;
    }

    function displayThumbnails(array) {
        const thumbnails = document.querySelector('.thumbnails');

        thumbnails.innerHTML = array.map((item, index) => {
            return `<div class="thumbnail">
                <img src="${item.thumbnail}" alt="thumbnail image">
                <div class="overlay">
                    <div class="icon">
                        <img class="sprite" src="${item.sprite}" alt="${item.format} icon">
                    </div>
                    <div class="publisher">
                        <h1 class="title">${item.title}</h1>
                        <div class="user">
                            <img src="${item.avatar}" alt="avatar image">
                            <p>by <span class="name">${item.name}</span></p>
                        </div>
                        <div class="stats">
                            <div class="stat">
                                <i class="fa-solid fa-code"></i>
                                <span class="stat-value">${item.code}</span>
                            </div>
                            <div class="stat">
                                <i class="fa-solid fa-code-fork"></i>
                                <span class="stat-value">${item.fork}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        }).join('');
    }

    function filterByText() {
        const searchTerm = this.value.trim().toLowerCase();

        const results = data.filter(item => {
            const inName = item.name.toLowerCase().includes(searchTerm);
            const inTitle = item.title.toLowerCase().includes(searchTerm);
            return inName || inTitle;
        });

        displayThumbnails(results);
    }

    // on page load ...
    
    // fetch data from local JSON file
    const data = await fetchData(`https://raw.githubusercontent.com/bjohnson112069/web-images/main/Ui%20Design%20Daily/data.json`);

    displayThumbnails(data);

    // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
    menu.addEventListener('click', handleMenuButtonClick);
    navLinks.forEach(link => link.addEventListener('click', handleNavLinkClick));
    dropdownBtn.addEventListener('click', handleDropdownButtonClick);
    dropdownLinks.forEach(link => link.addEventListener('click', handleDropdownLinkClick));
    filters.forEach(filter => filter.addEventListener('click', handleFilterClick));
    search.addEventListener('input', filterByText);
}

window.addEventListener('DOMContentLoaded', loadContent);