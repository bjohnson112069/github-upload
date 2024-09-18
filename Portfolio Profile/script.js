
async function loadContent() {
    const links = document.querySelectorAll('.nav-link');
    const photos = document.querySelectorAll('.photo');
    const NUM_PHOTOS = 8;

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }
        
    async function fetchData(endpt) {
        const response = await fetch(`${endpt}`, {
            headers: {
                Accept: 'application/json',
            },
        });
        const data = await response.json();
        return data;
    }

    // On page load... 
    // pull collection of photos from unsplash (default count is 10)
    const unsplash = await fetchData(`https://api.unsplash.com/photos/random?client_id=V6lGcWUZPlaa2U6A7-b9gR3vUXI_wXot0SgCjj4tDMw&count=${NUM_PHOTOS}`);

    unsplash.map((photo, i) => {
        const image = document.createElement('img');
        image.src = photo.urls.small;
        image.alt = "gallery image";
        image.id = photo.id;
        photos[i].appendChild(image);
    });


    // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));

}

window.addEventListener('DOMContentLoaded', loadContent);