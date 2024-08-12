
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

    function displayData(array) {
        
        const jobs = document.querySelector('.jobs');

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
                        <span class="company">${item.company}</span>
                        <span class="${item.new ? "new" : "visually-hidden"}">new!</span>
                        <span class="${item.featured ? "featured" : "visually-hidden"}">featured</span>
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
            // create Roles filter
            filter = document.createElement('div');
            filter.classList.add('filter', 'roles' );
            filter.innerHTML = `<button type="button" class="apply-filter" value="${item.role}" data-role="${item.role}">
                <span>${item.role}</span>
            </button>`;
            filters.appendChild(filter); // append to parent (filters) container

            // create Levels filter
            filter = document.createElement('div');
            filter.classList.add('filter', 'levels' );
            filter.innerHTML = `<button type="button" class="apply-filter" value="${item.level}" data-level="${item.level}">
                <span>${item.level}</span>
            </button>`;
            filters.appendChild(filter); // append to parent (filters) container

            // create languages filter
            filter = document.createElement('div');
            filter.classList.add('filter', 'languages' );
            filter.innerHTML = item.languages.map(language => {
                return `<button type="button" class="apply-filter" value="${language}" data-language="${language}">
                    <span>${language}</span>
                </button>`;

            }).join('');
            filters.appendChild(filter); // append to parent (filters) container

            // create tools filter
            filter = document.createElement('div');
            filter.classList.add('filter', 'tools' );
            filter.innerHTML = item.tools.map(tool => {
                return `<button type="button" class="apply-filter" value="${tool}" data-tool="${tool}">
                    <span>${tool}</span>
                </button>`;

            }).join('');
            filters.appendChild(filter); // append to parent (filters) container

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

    
    function filterByTablet() {

        const filters = document.querySelectorAll('.clear-filter:not(.visually-hidden)');
        console.log(filters)
        const results = data.filter(job => {
            let inRole = false;
            let inLevel = false;
            let inLanguages = false;
            let inTools = false;
            filters.forEach(filter => {
                inRole = filter.matches(`[value="${job.role}"]`) ? true : inRole;
                inLevel = filter.matches(`[value="${job.level}"]`) ? true : inLevel;

                job.languages.forEach(language => {
                    inLanguages = filter.matches(`[value="${language}"]`) ? true : inLanguages;
                });

                job.tools.forEach(tool => {
                    inTools = filter.matches(`[value="${tool}"]`) ? true : inTools;
                });
            });
            // console.log('role:', inRole, 'level:', inLevel, 'languages:', inLanguages, 'tools:', inTools)

            return inRole || inLevel || inLanguages || inTools;
        });

        // display the list of reviews
        displayData(results);
    }
    
    function handleClearAllFilters () {
        clearFilters.forEach(filter => filter.classList.add('visually-hidden'));
        clearFiltersSection.classList.remove('expanded');

        filterByTablet();
    }

    function handleClearFilter() {
        this.classList.add('visually-hidden');

        filterByTablet();
    }

    function handleApplyFilter() {
        const list = Array.from(document.querySelectorAll('.clear-filter'));

        // find button element in the list that matches what was clicked
        // const result = list.filter(el => {
        //     return this.value === el.value;
        // });

        // if (result.length > 1) console.log('Error: multiple filters found');
        
        // result[0].classList.remove('visually-hidden');
        const tablet = document.querySelector(`[value="${this.value}"]`);
        tablet.classList.remove('visually-hidden');
        console.log(tablet)
        clearFiltersSection.classList.add('expanded');

        filterByTablet();
    }


   // On page load... 
    // fetch a random (1 - 200) advice object from the API
    const data = await fetchAdvice(`./data.json`);

    displayData(data);

    const clearFilters = document.querySelectorAll('.clear-filter');
    
   // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
    clearFilters.forEach(filter => filter.addEventListener('click', handleClearFilter));
    clearAll.addEventListener('click', handleClearAllFilters);
}

window.addEventListener('DOMContentLoaded', loadContent);