
function loadContent() {
    const links = document.querySelectorAll('a');
    const prevButton = document.querySelector('#goToPrev');
    const nextButton = document.querySelector('#goToNext');
    let count = 1;

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function moveToPhotoGroup(number) {
        const displayCount = 3;
        const photos = document.querySelector('.photos');
        const colWidth = photos.firstElementChild.offsetWidth;

        photos.style.left = `${-1 * number * displayCount * colWidth}px`;

    }
    
    function move(e, direction) {
        direction === 'forward' ? count++ : count--;
        count = count < 0 ? 0 : count;
        count = count > 2 ? 2 : count;

        moveToPhotoGroup(count);
    }

    // On page load... 
    // fetch data from unsplash API
    fetch(`https://api.unsplash.com/photos/random?client_id=V6lGcWUZPlaa2U6A7-b9gR3vUXI_wXot0SgCjj4tDMw&count=18`).then(function (response) {
        // the API call was successful
        return response.json();
    }).then(function (data) {
        // this is the JSON data from our response

        if (data.length === 0) return;

        const photoCount = document.querySelector('#photo-count');
        photoCount.textContent = data.length;

        const photos = document.querySelector('.photos');
        photos.innerHTML = data.map((item, index) => {
            let colSpan;

            if (index < 9) {
                colSpan = 2;
            } else if (index < 15) {
                colSpan = 3;
            } else {
                colSpan = 6;
            }
            return `<img src="${item.urls.small}" alt="${item.alt_description}" class="photo span-${colSpan}">`;
        }).join('');

        // display the first group of photos
        moveToPhotoGroup(count);
    }).catch(function (error) {
        // there was an error
        console.warn(error);
    });

    // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
    prevButton.addEventListener('click', (e) => move(e, 'back'));
    nextButton.addEventListener('click', (e) => move(e, 'forward'));
}

window.addEventListener('DOMContentLoaded', loadContent);