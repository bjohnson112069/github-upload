
async function loadContent() {
    const links = document.querySelectorAll('a');
    const view = document.querySelector('#view-all')
    const MAX_USERS = 24;

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
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

    function toggleView(e, el) {

        if (el.matches('.list-view')) {
            el.classList.remove('list-view');
            e.target.textContent = 'View All';
        } else {
            el.classList.add('list-view');
            e.target.textContent = 'View Less';
        }
    }
    
    // On page load...
    // 1) fetch data from RandomUser API and store the results in a data array
    // 2) iterate through each item in the array and generate an HTML string 
    // containing the user name, age, and avatar thumbnail
    // 3) join all the strings
    // 4) create the <li> elements by updating the innerHTML of the list <ul> element
    const data = await fetchData();
    const list = document.querySelector('.birthdays');

    list.innerHTML = data.results.map(item => `<li class="birthday">
        <img  class="avatar" src="${item.picture.thumbnail}" alt="avatar image">
        <span class="name">${item.name.first} ${item.name.last}</span>
        <span class="age"><span class="value">${item.dob.age}</span> years</span>
    </li>`
    ).join('');

    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    view.addEventListener('click', (e) => toggleView(e, list));
}

window.addEventListener('DOMContentLoaded', loadContent);