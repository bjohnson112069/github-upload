
function loadContent() {
    const links = document.querySelectorAll('.nav-link');
    const cards = document.querySelectorAll('.card');

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function displayCards() {
        const current = Number(document.querySelector('.current').dataset.id - 1);
        let accumulator = current;

        cards.forEach((card, i) => {
            cards[accumulator].style.transform = `scale(${100 - (i * 5)}%) translateY(${-1 * (i * 25)}px)`;
            cards[accumulator].style.zIndex = `${cards.length - i}`;
            accumulator = accumulator === cards.length - 1 ? 0 : accumulator + 1;
        });
    }

    function handleCardClick(e) {
        const container = document.querySelector('.cards');
        let card, next;

        if (e.target.matches('#close-card')) {
            card = e.target.closest('.card');
            card.classList.remove('current');
            next = card.nextElementSibling || container.firstElementChild;
            next.classList.add('current');
        } else {
            card = document.querySelector('.current');
            card.classList.remove('current');
            this.classList.add('current');
        }
        displayCards();
    }

    // On page load... 
    displayCards();

    // Event Listeners
    links.forEach(link => link.addEventListener ('click', handleNavLinkClick));
    cards.forEach(card => card.addEventListener('click', handleCardClick));
}

window.addEventListener('DOMContentLoaded', loadContent);