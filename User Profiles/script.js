async function loadContent() {
    const links = document.querySelectorAll('a');
    const classesToRemove = ['slide-left', 'slide-right', 'slide-up', 'slide-down', 'scale-up', 'scale-down'];
    const MAX_USERS = 6;

    // create a data array 
    let data = [];

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

    async function fetchData(endpt) {
        const response = await fetch(`${endpt}`, {
            headers: {
                Accept: 'application/json',
            },
        });
        const data = await response.json();
        return data;
    }

    function renderUserProfiles(array) {
        const profiles = document.querySelector('.profiles');

        profiles.innerHTML = array.map(item => {
            return `<div class="profile slide ${classesToRemove[randomNum(0, 3)]}">
                <button type="button" id="options">
                    <i class="fa-solid fa-ellipsis"></i>
                </button>
                <div class="user">
                    <img src="${item.thumbnail}" alt="avatar image" class="avatar">
                    <h1 class="user-name">${item.name}</h1>
                </div>
                <div class="metrics">
                    <div class="metric">
                        <h2 class="value" id="project-value">${item.projects}</h2>
                        <span>Projects</span>
                    </div>
                    <div class="metric">
                        <h2 class="value" id="prototype-value">${item.prototypes}</h2>
                        <span>Prototypes</span>
                    </div>
                </div>
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
            "projects": randomNum(1, 100),
            "prototypes": randomNum(1, 100)
        }
        data.push(obj);
    });

    renderUserProfiles(data);

    
    const profiles = document.querySelectorAll('.profile');

    profiles.forEach((profile, i) => {
        setTimeout(() => {
            profile.classList.remove(...classesToRemove);
        }, (i + 1)*200);
        
    });


    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
}

window.addEventListener('DOMContentLoaded', loadContent);