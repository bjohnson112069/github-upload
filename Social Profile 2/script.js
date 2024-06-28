
function loadContent() {
    const links = document.querySelectorAll('a');
    const tabs = document.querySelectorAll('.tab');
    const modal = document.querySelector('.modal');
    const exit = modal.querySelector('#modal-close');

    const data = [
        {
            type: 'photo',
            src: 'https://picsum.photos/200?random=1'
        },
        {
            type: 'photo',
            src: 'https://picsum.photos/200?random=2'
        },
        {
            type: 'photo',
            src: 'https://picsum.photos/200?random=3'
        },
        {
            type: 'photo',
            src: 'https://picsum.photos/200?random=4'
        },
        {
            type: 'photo',
            src: 'https://picsum.photos/200?random=5'
        },
        {
            type: 'photo',
            src: 'https://picsum.photos/200?random=6'
        },
        {
            type: 'video',
            src: 'https://picsum.photos/200?random=7'
        },
        {
            type: 'video',
            src: 'https://picsum.photos/200?random=8'
        },
        {
            type: 'video',
            src: 'https://picsum.photos/200?random=9'
        },
        {
            type: 'video',
            src: 'https://picsum.photos/200?random=10'
        },
    ]

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function filterThumbnails(type) {

        const results = data.filter(item => (item.type === type) || (type === 'all') );

        displayThumbnails(results);
    }

    function toggleModal() {
        modal.classList.toggle('active');
    }

    function handleImageClick() {
        const largeThumb = modal.querySelector('img');
        const thumb = this.querySelector('img');

        largeThumb.src = thumb.src;
        toggleModal();
    }

    function displayThumbnails(array) {
        const thumbnails = document.querySelector('.thumbnails');

        thumbnails.innerHTML = array.map((item, i) => {
            return `<div class="thumbnail">
                <img src="${item.src}" alt="user image">
            </div>`;
        }).join('');

        // Event Listeners
        const images = document.querySelectorAll('.thumbnail');

        images.forEach(image => image.addEventListener('click', handleImageClick));
    }

    function handleTabClick() {
        tabs.forEach(tab => tab === this ? 
                tab.classList.add('active') : 
                tab.classList.remove('active'))

        filterThumbnails(this.value);
    }

    // On page load... 
    filterThumbnails('photo');

    // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
    tabs.forEach(tab => tab.addEventListener('click', handleTabClick));
    exit.addEventListener('click', toggleModal);
}

window.addEventListener('DOMContentLoaded', loadContent);