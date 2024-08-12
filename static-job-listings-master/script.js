
async function loadContent() {
    const links = document.querySelectorAll('a');
    const clearFiltersSection = document.querySelector('.section-clear-filters');
    const clearAll = document.querySelector('.clear-all');
    
    async function fetchAdvice(endpt) {
        const response = await fetch(`${endpt}`, {
            headers: {
                Accept: 'application/json',
            },
        });
        const data = await response.json();
        return data;
    }

    function filterData() {
        // select all the active filters and convert to an array for access to array methods
        const filters = Array.from(document.querySelectorAll('.clear-filter'));

        // filter the data
        // select (e.g. true) the record/object that matches ALL filter criteria
        const results = data.filter(job => {

            // use the .reduce() method to iterate through all the active filters
            // use the accumulator parameter to increment the number of matches for each active filter
            // return the accumulator/number of matches
            const numMatches = filters.reduce((match, filter, index) => {
                const filterKey = filter.dataset.key;
                const filterValue = filter.value;

                // iterate through all object entries (keys/values)
                // compare the key/value pairs of the object to the key/value pairs of the filter(s)
                Object.entries(job).forEach(([key, value]) => {
                    if (Array.isArray(value)) {
                        match = (key === filterKey) && (value.indexOf(filterValue) != -1) ? match + 1 : match;
                    } else {
                        match = (key === filterKey) && (value === filterValue) ? match + 1 : match;
                    }
                });

                return match;
            }, 0);

            // need to send a binary (true/false) back to the .filter() method for selection
            // if the number of matches equals the number ofilters then true else false
            return numMatches === filters.length;
        });

        // display the list of reviews
        displayData(results);
    }

    function handleClearAllFilters () {
        const clearFilters = document.querySelectorAll('.clear-filter');
        clearFilters.forEach(filter => {
            filter.removeEventListener('click', handleClearFilter)
            filter.remove();
        });
        clearFiltersSection.classList.remove('expanded');

        displayData(data);
    }

    function handleClearFilter() {
        this.removeEventListener('click', handleClearFilter)
        this.remove();

        const clearFilters = document.querySelectorAll('.clear-filter');
        if (clearFilters.length === 0) {
            clearFiltersSection.classList.remove('expanded');
        }

        filterData();
    }

    function handleApplyFilter() {
        const filters = document.querySelector('.section-clear-filters .filters');
        const filterExists = filters.querySelectorAll(`.clear-filter[data-key="${this.dataset.key}"][value="${this.value}"]`);

        // expand the section to show the filter tablets
        clearFiltersSection.classList.add('expanded');

        // if the filter tablet does not exist create it
        if (filterExists.length === 0) {
            const filter = generateFilterTablet('clear-filter', this.dataset.key, this.value);
            filters.appendChild(filter);    
        }

        // Event Listeners
        const clearFilters = document.querySelectorAll('.clear-filter');
        clearFilters.forEach(filter => filter.addEventListener('click', handleClearFilter));
    
        filterData();
    }

    function generateFilterTablet(className, key, value) {
        const filter = document.createElement('button');
        filter.setAttribute('type', 'button');
        filter.classList.add('filter', `${className}` );
        filter.setAttribute('data-key', `${key}`);
        filter.setAttribute('value', `${value}`);
        
        if (className === 'apply-filter') {
            filter.innerHTML = `<span>${value}</span>`;
        }

        if (className === 'clear-filter') {
            filter.innerHTML = `<span>${value}</span>
                <div>
                    <svg class="icon"><use xlink:href="#xmark-solid"></use></svg>
                </div>`;
        }
        return filter;
    }

    function displayData(array) {
        const jobs = document.querySelector('.jobs');

        // iterate through the data object and create the HTML elements for the jobs
        jobs.innerHTML = array.map(item => {
            // create the job container and the first 2 sections (logo, details)
            const job = document.createElement('div');
            job.classList.add('job');
            job.setAttribute('data-id', `${item.id}`);
            job.innerHTML = `<section class="logo">
                        <img src="${item.logo}" alt="logo image">
                </section>
                <section class="section-details">
                    <div class="details">
                        <div class="title">
                            <span class="company">${item.company}</span>
                            <span class="${item.new ? "new" : "visually-hidden"}">new!</span>
                            <span class="${item.featured ? "featured" : "visually-hidden"}">featured</span>
                        </div>
                        <span class="position">${item.position}</span>
                        <div class="tags">
                            <span class="tag posted-at">${item.postedAt}</span>
                            <span class="tag separator" aria-label="circle separator"></span>
                            <span class="tag contract">${item.contract}</span>
                            <span class="tag separator" aria-label="circle separator"></span>
                            <span class="tag location">${item.location}</span>
                        </div>
                    </div>
                </section>`;

            // create the last section (filters)
            const section = document.createElement('section');
            section.classList.add('section-apply-filters');

            // create the filters container
            const filters = document.createElement('div');
            filters.classList.add('filters');

            let filter;
            // create Role filter(s)
            filter = generateFilterTablet('apply-filter', 'role', item.role);
            filters.appendChild(filter); // append to parent (filters) container

            // create Level filter(s)
            filter = generateFilterTablet('apply-filter', 'level', item.level);
            filters.appendChild(filter); // append to parent (filters) container

            // create languages filter(s)
            item.languages.forEach(language => {
                filter = generateFilterTablet('apply-filter', 'languages', language);
                filters.appendChild(filter); // append to parent (filters) container    
            });

            // create tools filter(s)
            item.tools.forEach(tool => {
                filter = generateFilterTablet('apply-filter', 'tools', tool);
                filters.appendChild(filter); // append to parent (filters) container    
            });

            // append the filters container to the section container
            section.appendChild(filters);

            // append the section container to the job container
            job.appendChild(section);

            // return the outerHTML of the job container
            return job.outerHTML;
        }).join('');

        // Event Listeners
        const applyFilters = document.querySelectorAll('.apply-filter');
        applyFilters.forEach(filter => filter.addEventListener('click', handleApplyFilter));
    }

   // On page load... 
    // fetch a random (1 - 200) advice object from the API
    const data = await fetchAdvice(`./data.json`);

    displayData(data);

    
    // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
    clearAll.addEventListener('click', handleClearAllFilters);
}

window.addEventListener('DOMContentLoaded', loadContent);