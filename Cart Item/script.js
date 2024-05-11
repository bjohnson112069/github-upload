
function loadContent() {
    const links = document.querySelectorAll('a');
    const thumbs = document.querySelectorAll('.img__thumb');
    const classesToRemove = ['slide-left', 'slide-right', 'slide-up', 'slide-down', 'scale-up', 'scale-down'];
    const IMAGES = [
        "./images/6538905_sd.png",
        "./images/6538905cv11d.png",
        "./images/6538905cv13d.png",
        "./images/6538905cv14d.png"
    ];

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function displayThumbnail() {
        const preview = document.querySelector('.previews');
        const idx = this.dataset.image;

        preview.style.left = `${ -1 * ((idx -1) * 100) }%`;

    }


    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    thumbs.forEach(thumb => thumb.addEventListener('click', displayThumbnail));

    
}

document.addEventListener('DOMContentLoaded', loadContent);