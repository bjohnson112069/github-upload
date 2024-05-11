
async function loadContent() {
    const links = document.querySelectorAll('a');
    const filters = document.querySelectorAll('input[name="filter"]')
    const search = document.querySelector('#search');
    const MAX_USERS = 14;
    const MAX_CHARS = 200;
    const TAGS = ['Experience', 'Quality', 'Design', 'Size', 'Features', 'Value', 'Replacement'];
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }
    
    // Utility: generate random number between min and max (base 10)
    function randomNum(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function generateRandomDate(from, to) {
        return new Date(
            from.getTime() +
            Math.random() * (to.getTime() - from.getTime()),
        );
    }

    function generateRandomTags(num) {
        const arr = [];

        for (let i = 0; i < num; i++) {
            arr.push( TAGS[ (randomNum(1, TAGS.length) - 1) ] );
        }
        
        return arr;
    }

    function generateHexColor() {
        // generate a random number between 0 and 255
        // convert to a hexadecimal (base 16) number
        // if the (hex) number is a single digit (0 - F), prepend a leading '0'
        let num = randomNum(0, 255).toString(16).toUpperCase();
        const r = `${num.length === 1 ? '0' : ''}${num}`;

        num = randomNum(0, 255).toString(16).toUpperCase();
        const g = `${num.length === 1 ? '0' : ''}${num}`;

        num = randomNum(0, 255).toString(16).toUpperCase();
        const b = `${num.length === 1 ? '0' : ''}${num}`;

        // return the concatentated values in a string
        return `#${r}${g}${b}`;
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

    function filterByTag(e) {

        // uncheck all checkboxes excpet for the one clicked
        // keep the current state of the clicked checkbox
        filters.forEach(filter => filter.checked = 
            (filter === this) ? this.checked : false);
        
        // if checked then filter on the search term else return all results
        const searchTerm = this.checked ? this.value.trim().toLowerCase() : '';
        
        const results = data.filter(user => {
            return user.tags.filter(tag => tag.toLowerCase().includes(searchTerm)).length;
        });
        
        // displayu the list of reviews
        displayReviews(results);

    }

    function filterByText() {
        const searchTerm = this.value.trim().toLowerCase();
        console.log('term:', searchTerm)

        const results = data.filter(user => {
            const inName = user.name.toLowerCase().includes(searchTerm);
            const inReview = user.review.toLowerCase().includes(searchTerm);
            return inName || inReview;
        });

        // displayu the list of reviews
        displayReviews(results);
    }

    function displayReviews(array) {
        // update the total number of results
        const total = document.querySelector('.total');
        total.textContent = array.length;

        // 1) iterate through each item in the array and generate an HTML string 
        // containing the the elements containing the review list item
        // 2) join all the strings
        // 3) create the <li> elements by updating the innerHTML of the list <ul> element
        const list = document.querySelector('.reviews');

        list.innerHTML = array
            .map(item => {

                const HTML = `<div class="review" data-tags="${item.tags.join(',')}">
                <div class="name-bl">
                    <span class="avatar" data-color="${item.color}">${item.name[0]}</span>
                    <span class="name">${item.name}</span>
                </div>
                <div class="stars" data-rating="${item.rating}">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                </div>
                <p class="text-content">${item.review}</p>
                <span class="date">${MONTHS[item.date.getMonth()]} ${item.date.getDate()}, ${item.date.getFullYear()}</span>
                <div class="share-bl">
                    <i class="fa-solid fa-arrow-up-from-bracket"></i>
                    <span>Share</span>
                </div>
            </div>`;

            return HTML;
            })
            .join('');
            
        // update the BG color of the avatars
        const avatars = document.querySelectorAll('.avatar');
        avatars.forEach(avatar => avatar.style.backgroundColor = avatar.dataset.color);

        // update the star ratings
        const ratings = document.querySelectorAll('.stars');
        ratings.forEach(rating => {
            const max = rating.dataset.rating;
            const stars = rating.querySelectorAll('.fa-star');

            stars.forEach((star, i) => (i < max) ? 
                star.classList.add('selected') : 
                star.classList.remove('selected'));        
        })
    }
    
    // On page load...
    // 1) fetch data from Loremipsum API
    // 2) store the object in an array
    const lorem = [];
    for (let i = 0; i < MAX_USERS; i++) {
        lorem.push(await fetchData(`https://api.api-ninjas.com/v1/loremipsum?paragraphs=1&max_length=${MAX_CHARS}`));
    }

    // 1) fetch data from RandomUser API
    // 2) create a new data object
    // 3) generate data for the new data object
    // 4) return a new array
    const users = await fetchData(`https://randomuser.me/api/?nat=us&results=${MAX_USERS}`);
    const data = users.results.map((user, i) => {
        return {
            name: `${user.name.first} ${user.name.last}`,
            color: generateHexColor(),
            rating: randomNum(1, 5),
            review: lorem[i].text,
            date: generateRandomDate(new Date(2000, 3, 20), new Date()),
            tags: generateRandomTags(randomNum(1, 4))
        }
    })

    // display the list of reviews
    displayReviews(data);
    
    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    filters.forEach(filter => filter.addEventListener('click', filterByTag));
    search.addEventListener('input', filterByText);

}

window.addEventListener('DOMContentLoaded', loadContent);