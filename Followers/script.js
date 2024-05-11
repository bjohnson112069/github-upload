
function loadContent() {
    const links = document.querySelectorAll('a');
    const search = document.querySelector('#search');
    const DATA = [
        {
            name: 'Jason Graham',
            img: 'https://github.com/bjohnson112069/web-images/raw/main/Testimonials%201/pexels-andrea-piacquadio-874158.webp',
            id: 1713046794582,
            followed: false,
        },
        {
            name: 'Ophelia Gaddy',
            img: 'https://github.com/bjohnson112069/web-images/raw/main/Testimonials%201/pexels-andrea-piacquadio-733872.webp',
            id: 1713046794583,
            followed: true,
        },
        {
            name: 'Joseph Shepherd',
            img: 'https://github.com/bjohnson112069/web-images/raw/main/Testimonials%201/pexels-justin-shaifer-1222271.webp',
            id: 1713046794584,
            followed: false,
        },
        {
            name: 'Lillian Whitmire',
            img: 'https://github.com/bjohnson112069/web-images/raw/main/Testimonials%201/pexels-andrea-piacquadio-712513.webp',
            id: 1713046794585,
            followed: false,
        },
        {
            name: 'Alice L. Tinker',
            img: 'https://github.com/bjohnson112069/web-images/raw/main/Testimonials%201/pexels-anderson-guerra-1197132.webp',
            id: 1713046794586,
            followed: false,
        },
        {
            name: 'Alex R. Powell',
            img: 'https://github.com/bjohnson112069/web-images/raw/main/Testimonials%201/pexels-daniel-xavier-1121796.webp',
            id: 1713046794587,
            followed: false,
        },
    ];

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function searchByName(e, array) {
        e.preventDefault();

        // filter the friends array based on the input value in the search form
        const results = array.filter(friend => friend.name.toLowerCase().includes(e.target.value));

        // display the friends list using the filtered reesults
        displayFriends(results);
    }

    function toggleFollow(e, array) {
        const id = e.target.dataset.id;

        // iterate through the array, if the ID matches then toggle the followed state
        array.map(friend => 
            friend.id === parseInt(id) ? friend.followed = !friend.followed : '');

        // display the list of friends
        displayFriends(array);
    }

    function displayFriends(array) {
        const friends = document.querySelector('.friends');

        friends.innerHTML = array.map(friend => {
                return `<li class="friend">
                    <img class="friend-img" src=${friend.img} alt="image of male">
                    <span class="friend-name">${friend.name}</span>
                    <button class="btn" data-followed="${friend.followed}" data-id="${friend.id}">${friend.followed ? 'Unfollow' : 'Follow'}</button>
                </li>`;
        }).join('');

        // Event listeners
        const buttons = document.querySelectorAll('.btn[data-followed]')
        buttons.forEach(button => button.addEventListener('click', (e) => toggleFollow(e, DATA)));
    }

    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    search.addEventListener('input', (e) => searchByName(e, DATA));

    // On page load ...
    displayFriends(DATA);
}

document.addEventListener('DOMContentLoaded', loadContent);