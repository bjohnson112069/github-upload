function loadContent() {
    const links = document.querySelectorAll('a');
    const article = document.querySelector('article');
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const createObject = document.querySelector('#create-object');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    
    // configuration parameters
    const OBJECTS = [
        {
            'type': 'person',
            'icon': 'fa-user'
        },
        {
            'type': 'book',
            'icon': 'fa-book'
        },
        {
            'type': 'exercise',
            'icon': 'fa-dumbbell'
        },
        {
            'type': 'income',
            'icon': 'fa-arrow-up-wide-short'
        },
        {
            'type': 'expense',
            'icon': 'fa-arrow-down-short-wide'
        },
    ];

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function randomNum(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
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
        const choice = button.querySelector('.dropdown-choice');
        
        // update the button value and text
        button.value = this.dataset.type;
        choice.textContent = this.textContent;
        choice.innerHTML = this.innerHTML;
        toggleDropdown(dropdown);
    }

    function createMenuObject() {
        // hide the empty/first list item
        const empty = document.querySelector('.dropdown-item[data-type="empty"]')
        empty.classList.add('visually-hidden');

        // select the list
        // create a random object and insert into the list
        const list = this.closest('.dropdown-list');
        const obj = OBJECTS[randomNum(0, OBJECTS.length - 1)];
        const item = document.createElement('li');

        item.classList.add('dropdown-item');
        item.setAttribute('data-type', `${obj.type}`);
        item.setAttribute('tabindex', '0');
        item.innerHTML = `<i class="fa-solid ${obj.icon}"></i>
            <span>${capitalizeFirstLetter(obj.type)}</span>`;
        list.insertAdjacentElement('afterbegin', item);

        // Event Listeners
        item.addEventListener('click', handleDropdownLinkClick);
    }

    // on page load ...


    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    dropdownBtn.addEventListener('click', handleDropdownButtonClick);
    createObject.addEventListener('click', createMenuObject);

    // close all menus if clicked outside
    article.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            const dropdowns = document.querySelectorAll('.dropdown');
            dropdowns.forEach((dropdown => {
                dropdown.classList.remove('opened');
            }))
        }
    })

}

window.addEventListener('DOMContentLoaded', loadContent);