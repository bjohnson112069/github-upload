
async function loadContent() {
    const button = document.querySelector('#next-advice');
    const MAX = 200;
    
    // Utility: generate random number between min and max (base 10)
    function randomNum(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    async function fetchAdvice(endpt) {
        const response = await fetch(`${endpt}`, {
            headers: {
                Accept: 'application/json',
            },
        });
        const data = await response.json();
        return data;
    }

    function generateSlide(obj, slide) {
        slide.innerHTML = `<h1>advice #<span class="id">${obj.id}</span></h1>
        <blockquote>
            <p class="content">${obj.advice}</p>
        </blockquote>
        <svg class="divider-icon">
            <use xlink:href="#pattern-divider-desktop"></use>
        </svg>`;
    }

    function displayCurrentSlide() {
        const slider = document.querySelector('.slides');
        const current = document.querySelector('.slide.current');

        slider.style.left = `${-1 * current.offsetLeft}px`;
    }

    async function handleButtonClick() {
        const next = document.querySelector('.slide:not(.current)');
        const current = document.querySelector('.slide.current');

        // fetch a random (1 - 200) advice object from the API
        const data = await fetchAdvice(`https://api.adviceslip.com/advice/${randomNum(1, MAX)}`);

        // generate the content for the next slide
        generateSlide(data.slip, next);

        // make it current
        next.classList.toggle('current');

        // remove state from the old slide
        current.classList.toggle('current');

        // display the next (now current) slide
        displayCurrentSlide();    
    }

    // On page load... 

    // fetch a random (1 - 200) advice object from the API
    const result = await fetchAdvice(`https://api.adviceslip.com/advice/${randomNum(1, MAX)}`);

    // select the current slid
    // generate the slide content (current by default)
    // display the current slide
    const current = document.querySelector('.slide.current');
    generateSlide(result.slip, current);
    displayCurrentSlide();

    // Event Listeners
    button.addEventListener('click', handleButtonClick);
}

window.addEventListener('DOMContentLoaded', loadContent);