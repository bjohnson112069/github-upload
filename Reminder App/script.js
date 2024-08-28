
async function loadContent() {
    const links = document.querySelectorAll('.nav-link');
    const accordion = document.querySelector('.accordion');
    const search = document.querySelector('#search');

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
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

    function filterByListName(name) {
        // iterate through the object using array methods 
        const result =  Object.entries(data).filter(([key, value], index) => {
            return value.list_name === name.toUpperCase();
        });

        return result[0];
    }

    function countOpenItems(array) {
        let count = 0;

        // iterate through the list object using array methods
        Object.entries(array).map(([key, value], index) => {
            // if the value is an array generate an accordion panel
            if (Array.isArray(value)) {
                const results = value.filter(item => {
                    return !item.completed;
                });
                count = count + results.length;
            }
        });
        return count;
    }

    function displayLists() {
        const listsContainer = document.querySelector('.lists');
    
        // iterate through the list object using array methods
        listsContainer.innerHTML = Object.entries(data).map(([listName, array], index) => {
            const count = countOpenItems(array);

            return `<li class="list ${array.list_name.toUpperCase() === 'SHOPPING LIST' ? 'active' : ''}" data-name="${array.list_name.toUpperCase()}">
                <span class="list-name">${array.list_name.toUpperCase()}</span>
                <span class="open-item-count">${count}</span>
            </li>`;
        }).join('');

        // Event Listeners
        const lists = document.querySelectorAll('.list');
        lists.forEach(list => list.addEventListener ('click', handleListClick));
    }

    function displayListItems(list) {
        // remove/clear all child elements
        accordion.innerHTML = '';

        // iterate through the list object using array methods
        Object.entries(list).map(([key, value], index) => {
            let displayCount = 0;
            // if the value is an array generate an accordion panel
            if (Array.isArray(value)) {
                const panel = document.createElement('div');
                panel.classList.add('panel');
                panel.innerHTML = `
                    <input type="radio" name="accordion" class="visually-hidden" id="panel-${index}" ${index === 1 ? 'checked' : ''}>
                    <label for="panel-${index}">
                        <div>
                            <span>${key.toUpperCase()}</span>
                            <p>( <span class="display-count">${displayCount}</span> )</p>
                        </div>
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                    </label>`;

                // generate the panel content container
                const content = document.createElement('div');
                content.classList.add('panel-content');

                // generate the list container
                const items = document.createElement('ul');
                items.classList.add('items');
                items.setAttribute('data-name', `${key.toLowerCase()}`);

                // generate the list items
                items.innerHTML = value.map((item, i) => {
                    if (!item.filtered) {
                        displayCount++;
                        return `<li class="item">
                            <input type="checkbox" class="visually-hidden" id="${item.id}" name="groceries" value="${item.id}" ${item.completed ? 'checked' : ''}>
                            <label class="item-name" for="${item.id}">${item.item_name}</label>
                        </li>`;
                    }
                }).join('');

                content.appendChild(items);
                panel.appendChild(content);
                accordion.appendChild(panel);

                // update the displayed items counter
                const count = panel.querySelector('.display-count')
                count.textContent = displayCount;
            } 
        });
    }

    function handleListItemClick(e) {
        // if the element clicked is not a list item input then return
        if (!e.target.matches('input[type="checkbox"]')) return;

        const list = accordion.dataset.name;
        const items = e.target.closest('.items').dataset.name;
        const id = Number(e.target.value);

        // find the item that was clicked in the data
        const item = data[list][items].find(item => item.id === id);
        
        // toggle the completed state for the item
        item.completed = !item.completed;

        const count = countOpenItems(data[list]);
        
        const parentList = document.querySelector(`.list[data-name="${data[list].list_name.toUpperCase()}"]`);
        const itemCount = parentList.querySelector('.open-item-count');
        itemCount.textContent = count;
    }

    function handleListClick() {
        const lists = document.querySelectorAll('.list');
        // make the selected list active
        lists.forEach(list => {
            list === this ? list.classList.add('active') : list.classList.remove('active');
        })

        // find the active list
        const result = filterByListName(this.dataset.name);

        // update the data attribute of the accordion with the active list key name
        accordion.setAttribute('data-name', `${result[0]}`);

        // display the list items
        displayListItems(result[1]);
    }

    function filterByText() {
        const searchTerm = this.value.trim().toLowerCase();

        // apply 'active' class to the search filter as a visual indicator it is applied
        searchTerm === '' ? this.classList.remove('active') : this.classList.add('active');
        
        // iterate through the list object using array methods
        Object.entries(data).forEach(([listName, array], index) => {
            // iterate through the list object using array methods
            Object.entries(array).map(([key, value], i) => {
                // if the value is an array then iterate through all items
                if (Array.isArray(value)) {
                    value.forEach(item => {
                        item.filtered = searchTerm === '' ? 
                            false : !item.item_name.toLowerCase().includes(searchTerm);
                    })
                }
            });

        });

        // select the active list
        const active = document.querySelector('.list.active');

        // find the active list
        const result = filterByListName(active.dataset.name);

        // update the data attribute of the accordion with the active list key name
        accordion.setAttribute('data-name', `${result[0]}`);

        // display the list items
        displayListItems(result[1]);
    }

    // On page load... 

    // fetch data from local JSON file
    const data = await fetchData(`https://raw.githubusercontent.com/bjohnson112069/web-images/main/Reminder%20App/data.json`);

    // display the lists
    displayLists();

    // select the active list
    const active = document.querySelector('.list.active');

    // find the active list
    const result = filterByListName(active.dataset.name);

    // update the data attribute of the accordion with the active list key name
    accordion.setAttribute('data-name', `${result[0]}`);

    // display the list items
    displayListItems(result[1]);

    // clear/reset the search input
    search.value='';

    // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));

    // event delgation.  contents of the accordion contianer is dynamic but the container itself is not
    accordion.addEventListener('click', handleListItemClick);
    search.addEventListener('input', filterByText);
}

window.addEventListener('DOMContentLoaded', loadContent);