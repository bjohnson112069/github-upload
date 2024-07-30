
function loadContent() {
    const links = document.querySelectorAll('.nav-link');
    const members = document.querySelector('.members');
    const view = document.querySelector('#view-all');
    const search = document.querySelector('#search');
    const exit = document.querySelector('#exit');
    const invite = document.querySelector('#invite');
    let users;
    const MAX_USERS = 27;
    
    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function filterByText() {
        const searchTerm = this.value.trim().toLowerCase();

        const results = users.filter(user => {
            const inFirst = user.name.first.toLowerCase().includes(searchTerm);
            const inLast = user.name.first.toLowerCase().includes(searchTerm);
            const inEmail = user.email.toLowerCase().includes(searchTerm);
            return inFirst || inLast || inEmail;
        });

        // displayu the list of reviews
        displayMembers(results);
    }
    
    function displayMembers(array) {

        document.querySelector('#member-count').textContent = `(${array.length})`;

        members.innerHTML = array.map((item, index) => {
            return `<div class="member" title="${item.name.first.concat(' ', item.name.last)}" data-id="${item.id.value}">
                <img  src="${item.picture.medium}" alt="avatar">
            </div>`;
        }).join('');
    }

    function handleViewAllEvent() {
        const footer = document.querySelector('footer');
        const label = footer.querySelector('#view-label');
        const count = document.querySelector('#member-count');

        footer.classList.toggle('expanded');

        if (footer.matches('.expanded')) {
            label.textContent = 'View Less'
            count.classList.add('hidden');
        } else {
            label.textContent = 'View All';
            count.classList.remove('hidden');
        }
    }

    // Function to handle event delegation on the members container
    function hnadleMemberClickEvent(e) {
        // if the target is not a .member then exit
        if (!e.target.matches('.member')) return;

        const card = document.querySelector('#profile-card');
        const results = users.filter(user => {
            return user.id.value === e.target.dataset.id;
        });

        if (results.length === 1) {
            const avatar = card.querySelector('.avatar');
            const first = card.querySelector('#first-name');
            const last = card.querySelector('#last-name');
            const age = card.querySelector('#age');
            const email = card.querySelector('#email');
            const location = card.querySelector('#location');

            avatar.src = results[0].picture.large;
            first.textContent = results[0].name.first;
            last.textContent = results[0].name.last;
            age.textContent = `(${results[0].dob.age})`;
            email.textContent = results[0].email;
            location.textContent = `${results[0].location.city}, ${results[0].location.state}, ${results[0].location.country}`;

            card.classList.remove('slide-up');
        }
    }

    function handleExitClick() {
        const card = document.querySelector('#profile-card');

        card.classList.add('slide-up');
    }

    function handleInviteClick() {
        alert('Invitation sent!')
        handleExitClick();
    }

    // On page load... 
    fetch(`https://randomuser.me/api/?nat=us&results=${MAX_USERS}`, {
        headers: {
            Accept: 'application/json',
        },
    }).then(function (response) {
        // the API call was successful
        return response.json();
    }).then(function (data) {
        // this is the JSON data from our response; store in globally scoped variasble
        users = data.results;
        displayMembers(users);
    }).catch(function (error) {
        // if there's an error, log it
        console.log(error);
    });

    // Event Listeners
    links.forEach(link => link.addEventListener ('click', handleNavLinkEvent));
    view.addEventListener('click', handleViewAllEvent);
    search.addEventListener('input', filterByText);
    members.addEventListener('click', hnadleMemberClickEvent);
    exit.addEventListener('click', handleExitClick);
    invite.addEventListener('click', handleInviteClick);
}

window.addEventListener('DOMContentLoaded', loadContent);