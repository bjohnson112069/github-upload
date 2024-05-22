
async function loadContent() {
    const links = document.querySelectorAll('a');
    const view = document.querySelector('#view-all');
    const menu = document.querySelector('.menu-btn');
    const items = document.querySelectorAll('.menu-item');
    const MAX_USERS = 10;
    const MIN_USERS = 3;
    let viewAll = false;
    let viewCount = MIN_USERS;
    const TITLES = [
        'Service Designer',
        'Brand Designer',
        'Product Designer',
        'Graphic Designer',
        'Animation Designer',
        'Creative Director',
        'Art Director',
        'UX Designer',
        'UI Designer',
        'Web Designer'
    ]

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }
    
    // Untility: generate random number between min and max
    function randomNum(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    
    // API: https://randomuser.me/api/
    async function fetchData() {
        const response = await fetch(`https://randomuser.me/api/?nat=us&results=${MAX_USERS}`, {
            headers: {
                Accept: 'application/json',
            },
        });
        const data = await response.json();
        return data;
    }

    function toggleView(e, data) {

        viewAll = !viewAll;
        viewCount = viewAll ? MAX_USERS : MIN_USERS;
        view.textContent = viewAll ? 'View Less' : 'View All';
        displayUsers(data);
    }

    function handleUserClick() {
        const userAavatar = this.querySelector('.avatar');
        const userName = this.querySelector('.name');
        const container = document.querySelector('#menu-container');
        const menuAvatar = menu.querySelector('.menu-avatar');
        const menuLabel = menu.querySelector('.menu-label');
        
        menuAvatar.src = userAavatar.src;
        menuLabel.textContent = userName.textContent;
        container.classList.remove('slide-right');
        
    }

    function displayUsers() {
        const list = document.querySelector('.users');

        // 1) check the current view status and generate the appropriate number of elements
        // 2) iterate through each item in the array and generate an HTML string 
        // containing the user name, title, and avatar thumbnail
        // 3) join all the strings
        // 4) create the <li> elements by updating the innerHTML of the list <ul> element
        list.innerHTML = data.results.map((item, i) => {
            if (i < viewCount) {
                return `<li class="user">
                    <img  class="avatar" src="${item.picture.thumbnail}" alt="avatar image">
                    <span class="name">${item.name.first} ${item.name.last}</span>
                    <span class="title">${TITLES[i]}</span>
                </li>`;
            }    
        }
        ).join('');

        const users = list.querySelectorAll('.user');
        users.forEach(user => user.addEventListener('click', handleUserClick));
    }
    
    function handleMenuButton() {
        this.classList.toggle('expanded');
    }

    function handleMenuSelection() {
        const button = this.closest('.menu-btn');
        const selection = button.querySelector('.menu-selection');

        // selection.textContent = this.textContent;
    }
    
    // On page load...
    
    // fetch data from RandomUser API and store the results in a data array
    const data = await fetchData();

    // display the data
    displayUsers(data);

    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    view.addEventListener('click', (e) => toggleView(e, data));
    menu.addEventListener('click', handleMenuButton);
    items.forEach(item => item.addEventListener('click', handleMenuSelection));
}

document.addEventListener('DOMContentLoaded', loadContent);