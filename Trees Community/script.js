async function loadContent() {
    const links = document.querySelectorAll('a');
    
    // configuration parameters
    const MAX_USERS = 4;
    let data = [];

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

    async function fetchData(endpt) {
        const response = await fetch(`${endpt}`, {
            headers: {
                Accept: 'application/json',
            },
        });
        const data = await response.json();
        return data;
    }

    function displayUsers(array) {
        console.log('displaying ...', array)
        const main = document.querySelector('main');

        main.innerHTML = array.map((item, i) => {
            return `<div class="member">
                        <img  class="thumbnail" src="${item.thumbnail}" alt="thumbnail image">
                        <h1 class="name">${item.name}</h1>
                        <div class="trees"><span class="count">${item.count}</span> Trees</div>
                    </div>`;
        }).join('');
    }

    // on page load ...
    // pull random data from API fetch
    const { results: randomUsers } = await fetchData(`https://randomuser.me/api/?nat=us&results=${MAX_USERS}`);

    // iterate through the results and generate a new data object
    randomUsers.map(item => {
        const obj = {
            "name": `${item.name.first} ${item.name.last}`,
            "thumbnail": item.picture.thumbnail,
            "count": randomNum(20, 100)
        }
        data.push(obj);
    });

    displayUsers(data);

    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
}

window.addEventListener('DOMContentLoaded', loadContent);