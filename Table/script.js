
async function loadContent() {
    const links = document.querySelectorAll('a');
    const search = document.querySelector('#search');
    const headers = document.querySelectorAll('input[type="checkbox"]');
    const select = document.querySelector('#entries');
    const pageList = document.querySelector('.pages');
    const next = document.querySelector('button[value="next"]');
    const prev = document.querySelector('button[value="prev"]');
    const MAX_USERS = 16;
    let paginationLimit = 8;
    let pageCount = 1;
    let currentPage;

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }
    
    // Utility: generate random date between from and to
    function generateRandomDate(from, to) {
        return new Date(
            from.getTime() +
            Math.random() * (to.getTime() - from.getTime()),
        );
    }

    // API: https://randomuser.me/api/
    async function fetchData(endpt) {
        const response = await fetch(endpt, {
            headers: {
                Accept: 'application/json',
                'X-Api-Key': 'LAhuLfRRdUOXcVur/LiBug==WcbjIu7bgls8FWbL'
            },
        });
        const data = await response.json();
        return data;
    }

    function updateNumEntries(e, array) {
        paginationLimit = (e.target.value === 'All') ? MAX_USERS : parseInt(e.target.value);

        // clear the search filter
        search.value='';

        // get the number of pages
        getPaginationNumbers(data);
        
        // display the list of users
        displayUsers(data, 1);

    }

    const disableButton = (button) => {
        button.classList.add("disabled");
        button.setAttribute("disabled", true);
    }

    const enableButton = (button) => {
        button.classList.remove("disabled");
        button.removeAttribute("disabled");
    }

    function handlePageButton() {
        if (currentPage === 1) {
            disableButton(prev);
        } else {
            enableButton(prev);
        }

        if (pageCount === currentPage) {
            disableButton(next);
        } else {
            enableButton(next);
        }
    }

    function handleActivePage() {
        const pages = document.querySelectorAll('.page');

        // iterate through all the pages
        // if the page is the currentPage then make it active
        pages.forEach(page => {
            const pageIndex = parseInt(page.dataset.index);
            pageIndex === currentPage ? 
                page.classList.add('active') : 
                page.classList.remove('active');
        });
    }

    function getPaginationNumbers(array) {
        pageCount = Math.ceil(array.length / paginationLimit);

        // iterate through the number of pages
        // generate HTML strings
        // update the innerHTML of the list element
        let html = '';
        for (let i = 1; i <= pageCount; i++) {
            html += `<button class="page" data-index="${i}" aria-label="Page ${i}">${i}</button>`;
        }
        pageList.innerHTML = html;

        // iterate through the page numbers
        // make the first page active
        // add event listeners for clicks
        const pages = document.querySelectorAll('.page');

        pages.forEach(page => {
            const pageIndex = parseInt(page.dataset.index);

            if (pageIndex) {
                page.addEventListener('click', () => displayUsers(data, pageIndex));
            }
        })
    }

    function sortByType(e, array) {
        // uncheck all checkboxes excpet for the one clicked
        // keep the current state of the clicked checkbox
        headers.forEach(header => {
            header.checked = (header === e.target) ? header.checked : false;
        });

        // store the value of the clicked checkbox in a variable
        // use the variable as the object key
        const key = e.target.value;

        const results = array.sort((a, b) => {
            if (a[key] > b[key]) {
                return 1;
            }
            if (a[key] < b[key]) {
                return -1;
            }
            return 0;
        });
        
        // display the list of users
        displayUsers(results, 1);
    }

    function filterByText(e, array) {
        const searchTerm = e.target.value.trim().toLowerCase();

        const results = array.filter(user => {
            const inFirst = user.first.toLowerCase().includes(searchTerm);
            const inLast = user.last.toLowerCase().includes(searchTerm);
            const inEmail = user.email.toLowerCase().includes(searchTerm);
            return inFirst || inLast || inEmail;
        });

        // get the number of pages
        getPaginationNumbers(results);

        // display the list of users
        displayUsers(results, 1);
    }

    function displayUsers(array, pageNum) {

        // 1) iterate through each item in the array and generate an HTML string 
        // containing the user information
        // 2) join all the strings
        // 3) create the <li> elements by updating the innerHTML of the list <ul> element
        const list = document.querySelector('.list');
        const prevRange = (pageNum - 1) * paginationLimit;
        const currRange = pageNum * paginationLimit;

        currentPage = pageNum;

        handleActivePage();
        handlePageButton();

        list.innerHTML = array
            .map((item, index ) => {
                if (index >= prevRange && index < currRange) {
                    return `<li class="item user">
                        <span class="first">${item.first}</span>
                        <span class="last">${item.last}</span>
                        <span class="email">${item.email}</span>
                        <span class="date">
                            ${(item.date.getMonth() + 1) < 10 ? '0' : ''}${item.date.getMonth() + 1}-
                            ${item.date.getDate() < 10 ? '0' : ''}${item.date.getDate()}-
                            ${item.date.getFullYear()}</span>
                        <button class="btn-workplace" value="workplace">Go to workplace</button>
                    </li>`;
                }
            })
            .join('');
    }
    
    // On page load...

    // 1) fetch data from RandomUser API
    // 2) create a new data object
    // 3) generate data for the new data object
    // 4) return a new array
    const users = await fetchData(`https://randomuser.me/api/?nat=us&results=${MAX_USERS}`);
    const data = users.results.map((user, i) => {
        return {
            first: user.name.first,
            last: user.name.last,
            email: user.email,
            date: generateRandomDate(new Date(2000, 3, 20), new Date()),
        }
    })

    // get the number of pages
    getPaginationNumbers(data);

    // display the list of users
    displayUsers(data, 1);

    
    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    search.addEventListener('input', (e) => filterByText(e, data));
    headers.forEach(header => header.addEventListener('click', (e) => sortByType(e, data)));
    select.addEventListener('change', (e) => updateNumEntries(e, data));
    prev.addEventListener('click', (e) => {
        displayUsers(data, (currentPage - 1));
    });
    next.addEventListener('click', (e) => {
        displayUsers(data, (currentPage + 1));
    });

}

window.addEventListener('DOMContentLoaded', loadContent);