async function loadContent() {
    const links = document.querySelectorAll('a');
    
    // configuration parameters
    const MAX_USERS = 3;
    const TITLES = ['UX Designer', 'UI Designer', 'Web Developer'];

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
        const list = document.querySelector('.followers');

        list.innerHTML = array.map((item, i) => {
            return `<li class="follower">
                <div class="avatar">
                    <img src="${item.thumbnail}" alt="avatar image">
                    <div class="status""></div>
                </div>
                <h1 class="name">${item.name}</h1>
                <span class="title">${item.title}</span>
                <div class="actions">
                    <button class="btn" id="message" value="message">
                        <i class="fa-regular fa-comment"></i>
                        <span>Message</span>
                    </button>
                    <button class="btn" id="follow" value="follow">
                        <i class="fa-solid fa-plus"></i>
                        <span>Follow</span>
                    </button>
                </div>
            </li>`;
        }).join('');
    }

    // on page load ...
    // pull random data from API fetch
    const { results: randomUsers } = await fetchData(`https://randomuser.me/api/?nat=us&results=${MAX_USERS}`);

    // iterate through the results and generate a new data object
    randomUsers.map((item, idx) => {
        const obj = {
            "name": `${item.name.first} ${item.name.last}`,
            "thumbnail": item.picture.large,
            "title": TITLES[idx]
        }
        data.push(obj);
    });

    // displayUsers(data);

    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
}

window.addEventListener('DOMContentLoaded', loadContent);