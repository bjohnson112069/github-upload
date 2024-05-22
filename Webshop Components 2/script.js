
function loadContent() {
    const links = document.querySelectorAll('a');
    const buttons = document.querySelectorAll('.menu-btn');
    const items = document.querySelectorAll('.menu-item');
    const rangeInput = document.querySelectorAll('.range-input input');
    const value = document.querySelectorAll('.price');
    const progress = document.querySelector('.slider .progress');
    const priceGap = 50;

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function handleMenuButton() {
        this.classList.toggle('expanded');
    }

    function handleMenuSelection() {
        const button = this.closest('.menu-btn');
        const selection = button.querySelector('.menu-selection');

        selection.textContent = this.textContent;
    }

    function handleSliderEvents() {
        const minVal = parseInt(rangeInput[0].value);
        const maxVal = parseInt(rangeInput[1].value);

        if((maxVal - minVal) < priceGap){
            if (this.matches('.range-min')) {
                rangeInput[0].value = maxVal - priceGap;
            } else {
                rangeInput[1].value = minVal + priceGap;
            }
        }else{
            // price ranges starts at 50, ends at 350; substract 50 from min/max to calculate an accurate percentate.
            const offsetLeft = `${((minVal - 50) / (rangeInput[0].max - 50)) * 100}%`;
            const offsetRight = `${100 - ((maxVal - 50) / (rangeInput[1].max - 50)) * 100}%`;

            progress.style.left = offsetLeft;
            progress.style.right = offsetRight;

            value[0].textContent = `$${minVal}`;
            value[1].textContent = `$${maxVal}`;
            value[0].style.left = offsetLeft;
            value[1].style.right = offsetRight;
        }
    }
    
    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    buttons.forEach(button => button.addEventListener('click', handleMenuButton));
    items.forEach(item => item.addEventListener('click', handleMenuSelection));
    rangeInput.forEach(input => input.addEventListener('input', handleSliderEvents));
}

document.addEventListener('DOMContentLoaded', loadContent);