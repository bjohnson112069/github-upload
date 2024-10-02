async function loadContent() {
    const links = document.querySelectorAll('a');
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownLinks = document.querySelectorAll('.dropdown-link');
    const search = document.querySelector('#search');
    const searchResults = document.querySelector('.search-results');
    let language = 'EN';

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    // fetch data from the specifieed endpoint
    async function fetchData(endpt) {
        const response = await fetch(`${endpt}`, {
            headers: {
                Accept: 'application/json',
            },
        });
        const data = await response.json();
        return data;
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
        const button = dropdown.querySelector('.dropdown-btn');
        const choice = button.querySelector('#dropdown-choice');
        
        // update the button value and text
        // update the selected language variable
        button.value = this.textContent;
        choice.textContent = this.textContent;
        language = this.textContent;
        toggleDropdown(dropdown);

        // clear the search text
        // hide the results
        search.value = '';
        searchResults.classList.add('visually-hidden')
    }

    function filterByText() {
        const searchTerm = this.value.trim().toLowerCase();

        searchTerm === '' ? searchResults.classList.add('visually-hidden') : searchResults.classList.remove('visually-hidden');

        const key = language.toLowerCase();

        const results = data[key].filter(item => {
            const inName = item.name.toLowerCase().includes(searchTerm);
            const inDescription = item.description.toLowerCase().includes(searchTerm);
            return inName || inDescription;
        });

        displayResults(results);
    }

    function displayResults(array) {
        const results = document.querySelector('.results');

        if (array.length > 0) {
            results.innerHTML = array.map(item => `<li class="result">
                <div class="thumbnail">
                    <img src="${item.thumbnail}" alt="product image">
                </div>
                <div class="content">
                    <h1 class="name">${item.name}</h1>
                    <p class="description">${item.description}</p>
                </div>
            </li>`).join('');    
        } else {
            results.innerHTML = `<li class="result empty">
                <div class="content">
                    <h1 class="name">No Results Found</h1>
                    <p class="description visually-hidden">Fruit and tree</p>
                </div>
            </li>`
        }

    }

    // on page load ...

    // fetch the data from the specified endpoint and store in a data object
    const data = await fetchData(`./data.json`);

    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    dropdownBtn.addEventListener('click', handleDropdownButtonClick);
    dropdownLinks.forEach(link => link.addEventListener('click', handleDropdownLinkClick));
    search.addEventListener('input', filterByText);
}

window.addEventListener('DOMContentLoaded', loadContent);