
async function loadContent() {
    const links = document.querySelectorAll('a');
    const search = document.querySelector('.searchbar');
    const MAX_USERS = 10;
    
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

    function updateHoverText(e) {
        switch (e.type) {
            case 'mouseenter':
                e.target.textContent = 'Unfollow';
                break;
            case 'mouseleave':
                e.target.textContent = 'Following';
                break;
        }
    }

    function handleButtonClick() {
        if (this.matches('.followed')) {
            this.classList.remove('followed')
            this.textContent = 'Follow';
            this.removeEventListener('mouseenter', updateHoverText);
            this.removeEventListener('mouseleave', updateHoverText);
        } else {
            this.classList.add('followed');
            this.textContent = 'Following';
            this.addEventListener('mouseenter', updateHoverText);
            this.addEventListener('mouseleave', updateHoverText);
        }
    }
    
    function displayFriends(array) {
        // 1) iterate through each item in the array and generate an HTML string 
        // containing the user name, age, and avatar thumbnail
        // 2) join all the strings
        // 3) create the <li> elements by updating the innerHTML of the list <ul> element
        const list = document.querySelector('.friends-list');

        list.innerHTML = array.map(item => `<li class="friend-item">
                <div class="img-wrapper">
                    <img src=${item.picture.thumbnail}>
                </div>
                <p data-friend-name class="friend-name">${item.name.first} ${item.name.last}</p>
                <button data-follow-btn class="follow-btn" aria-label="Follow user">Follow</button>
            </li>`
        ).join('');

        
        // Event Listeners for follow buttons
        const buttons = list.querySelectorAll('.follow-btn');
        buttons.forEach(button => button.addEventListener('click', handleButtonClick));
    }

    function searchByName(e, array) {
        e.preventDefault();

        const term = e.target.value.toLowerCase();

        // filter the friends array based on the input value in the search form
        const results = array.filter(friend => {
            const inFirst = friend.name.first.toLowerCase().includes(term);
            const inLast = friend.name.last.toLowerCase().includes(term);
            return (inFirst || inLast);
        });

        // display the friends list using the filtered reesults
        displayFriends(results);
    }

    // On page load...
    
    // fetch data from RandomUser API and store the results in a data array
    const data = await fetchData();

    // display the list of friends
    displayFriends(data.results);

    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    search.addEventListener('input', (e) => searchByName(e, data.results));
}

document.addEventListener('DOMContentLoaded', loadContent);