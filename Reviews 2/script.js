
async function loadContent() {
    const links = document.querySelectorAll('a');
    const filters = document.querySelectorAll('input[name="filter"]')
    const search = document.querySelector('#search');
    let data = {};
    const MAX_USERS = 14;
    const MAX_CHARS = 200;
    const MAX_RATING = 5;
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
                let reviewContent = '';

                // truncate the lorem paragraph to MAX_CHARS
                if (item.review.length > MAX_CHARS) {
                    reviewContent = item.review.slice(0, MAX_CHARS - 1);
                    reviewContent = reviewContent + '.';
                } else reviewContent = item.review;

                const review = document.createElement('div');
                review.classList.add('review');
                review.setAttribute('data-tags', `${item.tags.join(',')}`);
                review.style.setProperty('--review-bg-color', `${item.color}${80}`)

                const icon = document.createElement('i');
                icon.classList.add('fa-solid', 'fa-quote-left')
                review.appendChild(icon);

                const p = document.createElement('p');
                p.classList.add('text-content');
                p.textContent = reviewContent;
                review.appendChild(p);

                const userBlock = document.createElement('div');
                userBlock.classList.add('user-bl');

                const img = document.createElement('img');
                img.classList.add('avatar');
                img.src = item.avatar;
                img.alt = 'avatar image';
                userBlock.appendChild(img);

                const span = document.createElement('span');
                span.classList.add('name');
                span.textContent = item.name;
                userBlock.appendChild(span);

                const stars = document.createElement('div');
                stars.classList.add('stars');
                stars.setAttribute('data-rating', item.rating);

                for (let x = 0; x < MAX_RATING; x++) {
                    const star = document.createElement('i');
                    star.classList.add('fa-solid', 'fa-star', `${x < item.rating ? 'selected' : 'not-selected'}`);
                    stars.appendChild(star);
                }

                userBlock.appendChild(stars);

                review.appendChild(userBlock);

                const date = document.createElement('span');
                date.classList.add('date');
                date.textContent = `${MONTHS[item.date.getMonth()]} ${item.date.getDate()}, ${item.date.getFullYear()}`;
                review.appendChild(date);

                const button = document.createElement('button');
                button.classList.add('btn');
                button.setAttribute('id', 'share');

                const upload = document.createElement('i');
                upload.classList.add('fa-solid', 'fa-arrow-up-from-bracket');
                button.appendChild(upload);

                const label = document.createElement('span');
                label.textContent = 'Share';
                button.appendChild(label);
                
                review.appendChild(button);

                return review.outerHTML;
            })
            .join('');

        // set custom variable for bg color on review class
        // review.style.setAttribute('--review-bg-color', 'red');
            
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

    // fetch data from two (2) APIs: loremipsum and randomuser ...
    Promise.all([
        fetch(`https://api.api-ninjas.com/v1/loremipsum?paragraphs=${MAX_USERS}`, {
            headers: {
                Accept: 'application/json',
                'X-Api-Key': 'LAhuLfRRdUOXcVur/LiBug==WcbjIu7bgls8FWbL'
            },
        }),
        fetch(`https://randomuser.me/api/?nat=us&results=${MAX_USERS}`, {
            headers: {
                Accept: 'application/json',
            },
        })
    ]).then(function (responses) {
        // Get a JSON objecti from each of the responses
        return Promise.all((responses.map(function (response) {
            return response.json();
        })));
    }).then(function (array) {
        // Work with both data sets here ...

        // store the lorem results in a new array
        const lorem = array[0].text.split('\n');

        // remove the last empty string from the split()
        lorem.pop(lorem.length - 1);

        // store the random user data in a new array
        const users = array[1].results;

        // 1) create a new data object to store results from both API calls
        // 2) generate data for the new data object
        // 3) return a new array
        data = users.map((user, i) => {
            return {
                name: `${user.name.first} ${user.name.last}`,
                avatar: user.picture.thumbnail,
                color: generateHexColor(),
                rating: randomNum(1, 5),
                review: lorem[i],
                date: generateRandomDate(new Date(2000, 3, 20), new Date()),
                tags: generateRandomTags(randomNum(1, 4))
            }
        })

        // display the list of reviews
        displayReviews(data);
    }).catch(function (error) {
        // if there's an error, log it
        console.log(error);
    });

    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    filters.forEach(filter => filter.addEventListener('click', filterByTag));
    search.addEventListener('input', filterByText);

}

window.addEventListener('DOMContentLoaded', loadContent);