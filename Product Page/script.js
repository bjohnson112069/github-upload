
function loadContent() {
    const links = document.querySelectorAll('.nav-link');
    const form = document.querySelector('form');
    let itemCount = 0;
    
    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function applyColorFilter(input) {
        const wrapper = input.closest('.input-wrapper');
        const name = document.querySelector('.color-name');
        const image = document.querySelector('.product-img');

        const hue = Number(wrapper.dataset.hue);
        const saturation = Number(wrapper.dataset.saturation);
        const brightness = Number(wrapper.dataset.brightness);
        const colorName = wrapper.dataset.colorName;
        name.textContent = colorName;

        image.style.setProperty('filter', 
            `hue-rotate(${hue}deg) saturate(${saturation}%) brightness(${brightness}%)`);
    }

    function handleInputChanges(e) {
        if (e.target.name === 'color') {
            applyColorFilter(e.target);
        }
    }

    function handleFormSubmission(e) {
        e.preventDefault();
        const count = document.querySelector('.item-count');
        const button = count.parentElement;

        itemCount++;
        count.textContent = itemCount;
        itemCount === 1 ? button.classList.remove('slide-up') : '';
    }

    // On page load... 
    const defaultColor = document.querySelector(`input[name="color"]:checked`);
    applyColorFilter(defaultColor);

    // Event Listeners
    links.forEach(link => link.addEventListener ('click', handleNavLinkEvent));
    form.addEventListener('input', handleInputChanges);
    form.addEventListener('submit', handleFormSubmission);
}

window.addEventListener('DOMContentLoaded', loadContent);