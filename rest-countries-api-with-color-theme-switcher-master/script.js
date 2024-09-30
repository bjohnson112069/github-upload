async function loadContent() {
    const links = document.querySelectorAll('a');
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const search = document.querySelector('#search');
    const sections = document.querySelector('.sections');
    const home = document.querySelector('.countries-home');
    const detail = document.querySelector('.countries-detail');
    const back = document.querySelector('#back');

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
        const choice = dropdown.querySelector('#dropdown-choice');
        
        choice.textContent = this.textContent;
        toggleDropdown(dropdown);
    }

    function generateCountryItems(array) {
        const countries = document.querySelector('.countries');

        countries.innerHTML = array.map(item => `<li class="country" data-name="${item.name}">
            <div class="flag">
                <img src="${item.flags.svg}" alt="image of the country's flag">
            </div>
            <div class="stat-bl">
                <h2 class="name">${item.name}</h2>
                <div class="stat">
                    <span class="label">Population:</span>
                    <span class="value">${item.population ? item.population.toLocaleString() : ''}</span>
                </div>
                <div class="stat">
                    <span class="label">Region:</span>
                    <span class="value">${item.region ? item.region : ''}</span>
                </div>
                <div class="stat">
                    <span class="label">Capital:</span>
                    <span class="value">${item.capital ? item.capital : ''}</span>
                </div>    
            </div>
        </li>`).join('');
    }

    function searchByAlpha3Code(code) {
        const result = data.filter(item => item.alpha3Code === code);

        return result[0];
    }

    function handleCountryClick() {
        // scroll to the top
        window.scroll(0, 0);
        
        // move to the details section
        toggleCountryDetails();

        // store the name of the country that was clicked
        const country = this.dataset.name;

        // filter the data for the country that was clicked
        const results = data.filter(item => item.name === country);
        const obj = results[0];

        // generate the HFML for the border countries
        const borders = document.createElement('div');
        borders.className = 'stat';
        borders.id = 'borders';
        let label = document.createElement('span');
        label.className = 'label';
        label.textContent = 'Border Countries:';
        borders.appendChild(label);

        if ('borders' in obj) {
            obj.borders.map(item => {
                const value = document.createElement('span');
                value.className = 'value';
                value.textContent = searchByAlpha3Code(item).name;
                borders.appendChild(value);
            });    
        }

        // generate the HFML for the currencies
        const currencies = document.createElement('div');
        currencies.className = 'stat';
        label = document.createElement('span');
        label.className = 'label';
        label.textContent = 'Currencies:';
        currencies.appendChild(label);

        if ('currencies' in obj) {
            const value = document.createElement('span');
            value.className = 'value';

            value.textContent = obj.currencies.map(item => item.name).join(', ');    
            currencies.appendChild(value);
        }

        // generate the HFML for the languages
        const languages = document.createElement('div');
        languages.className = 'stat';
        label = document.createElement('span');
        label.className = 'label';
        label.textContent = 'Languages:';
        languages.appendChild(label);

        
        if ('languages' in obj) {
            const value = document.createElement('span');
            value.className = 'value';

            value.textContent = obj.languages.map(item => item.name).join(', ');    
            languages.appendChild(value);
        }

        // generate the HFML for the (2nd) stat block
        const block = document.createElement('div');
        block.className = 'stat-bl';
        // add top level domain information
        block.innerHTML = `<div class="stat">
            <span class="label">Top Level Domain:</span>
            <span class="value">${obj.topLevelDomain}</span>
        </div>`;
        // append currencies
        block.appendChild(currencies)
        // append languages
        block.appendChild(languages)

        // select the details container
        // generate the HTML for the country details
        const details = document.querySelector('.details');
        details.innerHTML = `<div class="flag">
                <img src="${obj.flags.svg}" alt="image of the country's flag">
            </div>
            <div class="detail">
                <h2 class="name">${obj.name}</h2>
                <div class="stats">
                    <div class="stat-bl">
                        <div class="stat">
                            <span class="label">Native Name:</span>
                            <span class="value">${obj.nativeName}</span>
                        </div>
                        <div class="stat">
                            <span class="label">Population:</span>
                            <span class="value">${obj.population.toLocaleString()}</span>
                        </div>
                        <div class="stat">
                            <span class="label">Region:</span>
                            <span class="value">${obj.region}</span>
                        </div>
                        <div class="stat">
                            <span class="label">Sub Region:</span>
                            <span class="value">${obj.subregion}</span>
                        </div>
                        <div class="stat">
                            <span class="label">Capital:</span>
                            <span class="value">${obj.capital}</span>
                        </div>    
                    </div>
                </div>
            </div>`;

        const stats = document.querySelector('.stats');
        stats.appendChild(block);

        const countryDdetail = document.querySelector('.detail');
        countryDdetail.appendChild(borders);
    }

    function toggleCountryDetails() {
        detail.classList.toggle('active');
    }

    function filterForDistinctRegions(array) {
        return [...new Set(data.map(item => item.region))]
    }

    function generateDropdownItems(array) {
        const list = document.querySelector('.dropdown-list');

        list.innerHTML = array.map(item => `<li class="dropdown-item btn">
            <a href="#" class="dropdown-link">${item}</a>
        </li>`).join('');
    }


    function filterByRegion(region) {
        // displayCountries(results);
    }

    function filterByText() {
        const searchTerm = this.value.trim().toLowerCase();

        const results = data.filter(item => {
            const inName = item.name.toLowerCase().includes(searchTerm);
            const inTitle = item.title.toLowerCase().includes(searchTerm);
            return inName || inTitle;
        });

        displayCountries(results);
    }

    function handleFilterClick() {
        const parent = this.closest('.filters');
        const filters = parent.querySelectorAll('.filter');

        filters.forEach(filter => filter === this ? filter.classList.add('active') : filter.classList.remove('active'));

        parent.matches('#format-filters') ? filterByFormat(this.value) : filterByTag(this.value);
    }

    // on page load ...

    // REST Countries API
    // using v2 as nativeName in v3 is not intuitive
    // fetch the data from the API and store in a data object
    // generate the HTML for the countries on the home page/section
    // register the event listeners for each country on the page/section
    const data = await fetchData(`https://restcountries.com/v2/all`);
    generateCountryItems(data);
    const countries = document.querySelectorAll('.country');
    countries.forEach(country => country.addEventListener('click', handleCountryClick));

    // filter for unique/distinct values for the regions
    // generate the HTML for the dropdown menu items
    // register event listeners for the dropdown menu items
    const regions = filterForDistinctRegions(data);
    generateDropdownItems(regions);
    const dropdownLinks = document.querySelectorAll('.dropdown-link');
    dropdownLinks.forEach(link => link.addEventListener('click', handleDropdownLinkClick));


    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    dropdownBtn.addEventListener('click', handleDropdownButtonClick);
    search.addEventListener('input', filterByText);
    back.addEventListener('click', toggleCountryDetails);

}

window.addEventListener('DOMContentLoaded', loadContent);