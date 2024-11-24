async function loadContent() {
    const links = document.querySelectorAll('a');
    const arrows = document.querySelectorAll('.arrow');

    
    // configuration parameters
    const MAX_USERS = 10;
    let activeSlide = 0;
    const USER_TITLE = ['Illustrator', '3D Artist', 'UX Designer', 'UI Designer', 'UX/UI Designer', 'Product Designer', 'Product Manager', 'Product Owner', 'Developer', 'UX Manager'];
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
        const slider = document.querySelector('.creators');

        slider.innerHTML = array.map((item, i) => {
            return `<div class="creator ${i === activeSlide ? 'active' : ''}">
                        <img src="${item.thumbnail}" alt="avatar image" class="avatar">
                        <h2 class="name">${item.name}</h2>
                        <span class="title">${item.title}</span>
                        <button type="button" class="btn" id="view-content" value="3">View content</button>
                    </div>`;
        }).join('');
    }

    function handleArrowButtonClick() {
        const slider = document.querySelector('.creators');
        const creators = document.querySelectorAll('.creator');

        if (this.matches('#prev')) {
            activeSlide = (activeSlide <= 0) ? (MAX_USERS  - 1) : activeSlide - 1;
        } else {
            activeSlide = (activeSlide >= MAX_USERS  - 1) ? 0 : activeSlide + 1;
        }
        creators.forEach(creator => {
            creator === creators[activeSlide] ? creator.classList.add('active') : creator.classList.remove('active');
        })
        slider.style.left = `${(creators[activeSlide].offsetLeft) * -1}px`;
    }

    // on page load ...
    // pull random data from API fetch
    const { results: randomUsers } = await fetchData(`https://randomuser.me/api/?nat=us&results=${MAX_USERS}`);

    // iterate through the results and generate a new data object
    randomUsers.map(item => {
        const obj = {
            "name": `${item.name.first} ${item.name.last}`,
            "thumbnail": item.picture.thumbnail,
            "title": USER_TITLE[randomNum(1, MAX_USERS)]
        }
        data.push(obj);
    });

    displayUsers(data);

    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    arrows.forEach(arrow => arrow.addEventListener('click', handleArrowButtonClick));
}

window.addEventListener('DOMContentLoaded', loadContent);