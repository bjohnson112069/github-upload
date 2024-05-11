
function loadContent() {
    const links = document.querySelectorAll('a');
    const prevButton = document.querySelector('.goToPrev');
    const nextButton = document.querySelector('.goToNext');
    const circles = document.querySelectorAll('.circle');
    const mediaQuery = window.matchMedia('(max-width: 670px)')
    let offsetLeft = 0;
    let max = 0;

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function moveToTestimonial(position) {
        const testimonials = document.querySelector('.testimonials');

        testimonials.style.left = position;
    }

    function moveIndicator(number) {
        const circles = document.querySelectorAll('.circle');
        const target = document.querySelector(`.circle[data-number="${number}"]`);

        circles.forEach(circle => circle === target ? circle.classList.add('active') :
            circle.classList.remove('active'));
    }

    function move(e, direction) {
        const GAP = 24;

        if (e.currentTarget.matches('.circle')) {
            offsetLeft = parseInt(e.currentTarget.dataset.number);
        } else if (direction === 'back') {
            offsetLeft = offsetLeft <= 0 ? max : offsetLeft - 1;
        } else {
            offsetLeft = offsetLeft >= max ? 0 : offsetLeft + 1;
        }

        // move the testimonial into view
        moveToTestimonial(`calc( -1 * (${offsetLeft} * (100% + ${GAP}px)) )`);
        moveIndicator(offsetLeft);

    }
    function handleMediaQuery(e) {
        
        // Check if the media query is true
        if (e.matches) {
            max = 5;
        } else {
            max = 2;
        }
        
        // Reinitialize the slider (left) position
        moveToTestimonial('0');
        moveIndicator('0');
        offsetLeft = 0;
    }

    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    prevButton.addEventListener('click', (e) => move(e, 'back'));
    nextButton.addEventListener('click', (e) => move(e, 'forward'));
    circles.forEach(circle => circle.addEventListener('click', (e) => move(e, '')));
    mediaQuery.addListener(handleMediaQuery);

    // Media Query
    handleMediaQuery(mediaQuery);
}

document.addEventListener('DOMContentLoaded', loadContent);