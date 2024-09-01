
async function loadContent() {
    const links = document.querySelectorAll('.nav-link');

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    async function createSlider(slider) {
        if (!(slider instanceof Element)) {
            throw new Error('No slider passed in');
        }
        // create a data object
        let data = {};
    
        // create some variables for working with the slider
        let current;
    
        // select the elements needed for the slider
        const slides = slider.querySelector('.slides');
        const prevButton = slider.querySelector('.goToPrev');
        const nextButton = slider.querySelector('.goToNext');
        const viewAll = document.querySelector("#view-more");
        const collections = document.querySelectorAll('.collection');
        
        async function fetchData(endpt) {
            const response = await fetch(`${endpt}`, {
                headers: {
                    Accept: 'application/json',
                },
            });
            const data = await response.json();
            return data;
        }

        function formatDateTime(string) {
            return string.slice(0, string.length-1).replace('T', ', ');
        }
        
        function createSlides(object) {
            const slides = document.querySelector('.slides');
            let slideCount = 0;
            
            slides.innerHTML = Object.entries(object).map(([key, array], index) => {
                return array.map((item, i) => {
                    slideCount = (index * 10) + i + 1;
                    return `<div class="slide" data-slide="${slideCount}">
                    <img class="slide-image" src="${item.url}" alt="${item.alt}" title="Image by ${item.name} from Pexels ${item.portfolio}">
                    <div>
                    <h1 class="slide-title">${item.title}</h1>
                    <span class="slide-date">${formatDateTime(item.date)}</span>
                    </div>
                    </div>`;
                }).join('');
            }).join('');

            // update the custom properity defining the number of grid elements
            slides.style.setProperty('--num-slides', slideCount);
        }
    
        function startSlider() {
            // select the current slide or first slide (if current not set)
            current = slider.querySelector('.current') || slides.firstElementChild;
        }
    
        function applyClasses() {
            current.classList.add('current');
        }
    
        function move(direction) {
    
            // remove the current state from the previous slide
            current.classList.remove('current');
    
            // if the direction is 'back' ...
            //     current slide = previous sibling or first child
            // else ('forward')
            //     current slide = next sibling or last child
            current = (direction === 'back') ? 
                (current.previousElementSibling || slides.firstElementChild) : 
                (current.nextElementSibling || slides.lastElementChild);
    
            // apply classes to the current slide
            applyClasses();
    
            // scroll to the left edge of the slides container to the offset of the current slide
            const distance = `${-1 * current.offsetLeft}px`;
            slides.style.left = distance;
        }

        function initialize() {
            const items = slider.querySelectorAll('.slide');

            // remove 'current' class from the slide so first slide is choosen
            items.forEach(item => item.classList.remove('current'));
                
            // initialize the slider state & classes (first slide)
            startSlider();
            applyClasses();

            // scroll to the left edge of the slides container to the offset of the current slide
            const distance = `${-1 * current.offsetLeft}px`;
            slides.style.left = distance;

            // set the vertical scroll to the top of the window
            slides.scrollTop = '0';
        }
    
        function handleViewAllEvent() {
            const arrows = slider.querySelectorAll('.arrow');

            // value = false (default, View Less); value = true (View More)

            // capture the current state of the button value as a boolean (true/false)
            let viewMore = this.value === "true";

            // toggle the state
            viewMore = !viewMore;
            
            // toggle the state of the button
            this.value = viewMore;

            // set a class to reconfigure the grid element
            slides.classList.toggle("all", viewMore);

            // hide the arrow buttons whenever View All is clicked
            // arrows.forEach(arrow => arrow.classList.toggle("active"));
            arrows.forEach(arrow => arrow.classList.toggle("visually-hidden", viewMore));
    
            // toggle the text content of the View More button
            this.textContent = (viewMore) ? "View Less" : "View More";

            // intialize the slider
            initialize();
        }

        function handleCollectionClick() {
            // set the active state for the collection that was clicked
            collections.forEach(collection => collection === this ? 
                collection.classList.add('active') : collection.classList.remove('active'));

            // use entire data object if 'all' is selected
            if (this.value === 'all') {
                createSlides(data);
            } else {
                // filter for the key that matches the selected collection
                // Object.entries() returns an array
                const result = Object.entries(data).filter(([key, array]) => {
                    return key === this.value;
                });
        
                // convert the resulting array back into an object
                const object = Object.fromEntries(result);

                // create the slides from the filtered results
                createSlides(object);
            }

            // intialize the slider
            initialize();
        }

        // On function call ... 

        const pexelCollections = ["photography", "fashion", "sculpture"];

        // iterate through the collections array
        for await (const collection of pexelCollections) {
            let obj = { [collection]: [] };
            Object.assign(data, obj);
        
            // pull collection of photos from pexels (default count is 10)
            const pexels = await fetchData(`https://api.unsplash.com/search/collections?client_id=V6lGcWUZPlaa2U6A7-b9gR3vUXI_wXot0SgCjj4tDMw&query=${collection}`);
            pexels.results.map((item, index) => {
                obj = {
                    "url": item.cover_photo.urls.small,
                    "alt": item.cover_photo.alt_description,
                    "title": `${collection}`,
                    "date": item.published_at,
                    "name": item.user.name,
                    "portfolio": item.user.links.self
                }
                data[collection].push(obj);
            })
        }

        
        // create the slides from the data pulled from pexels
        createSlides(data);

        // when this slider is created, initialize state, classes, etc.
        initialize();
    
        // Event listeners
        prevButton.addEventListener('click', () => move('back'));
        nextButton.addEventListener('click', () => move('forward'));
        viewAll.addEventListener("click", handleViewAllEvent);
        window.addEventListener('resize', initialize);
        collections.forEach(collection => collection.addEventListener('click', handleCollectionClick));
    }

    // On page load... 

    // create slider from the elements above
    createSlider(document.querySelector('.carousel'));

    // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));

}

window.addEventListener('DOMContentLoaded', loadContent);