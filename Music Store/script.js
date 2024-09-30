async function loadContent() {
    const links = document.querySelectorAll('a');

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    // fetch data from the specifieed endpoint
    async function fetchData(endpt) {
        const response = await fetch(`${endpt}`, {
            headers: {
                Accept: 'application/json',
            },
        });
        const data = await response.json();
        return data;
    }

    function generateRatings(rating) {
        const MAX_RATING = 5;
        let HTML = '';

        for (let i = 1; i <= MAX_RATING; i++) {
            HTML += `<i class="rating ${i <= Math.floor(rating) ? 'fa-solid' : 'fa-regular'} fa-star"></i>`
        }
        return HTML;
    }

    function displayAlbums(albums) {
        // iterate through the list object using array methods
        Object.entries(albums).map(([key, value], index) => {
            // select the grid container hosting the album data
            const grid = document.querySelector(`.${key}`);

            // if the value is an array generate the child elements
            if (Array.isArray(value)) {
                grid.innerHTML = value.map(item => `<button class="album ${key === 'top' ? 'landscape' : 'portrait'}" value="${item.album}">
                    <div class="album-cover">
                        <img src="${item.cover}" alt="album cover">
                    </div>
                    <div class="album-info">
                        <div class="rating-bl">
                            <div class="ratings">
                                ${generateRatings(item.rating)}
                            </div>
                            <span class="price">$${item.price}</span>
                        </div>
                        <span class="album-name">${item.album}</span>
                        <p class="album-description ${key === 'top' ? '' : 'hidden'}">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam sed ducimus sunt saepe, reiciendis fugiat a nobis maxime et dolor dolore ut enim ipsa aliquid, placeat, necessitatibus doloribus velit repudiandae</p>
                    </div>
                </button>`).join('');
            }
        });

    }

    // on page load ...

    // fetch the data from the specified endpoint and store in a data object
    const data = await fetchData(`./data.json`);

    displayAlbums(data);

    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
}

window.addEventListener('DOMContentLoaded', loadContent);