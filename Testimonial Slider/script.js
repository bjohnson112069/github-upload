
function loadContent() {
    const links = document.querySelectorAll('a');
    const dots = document.querySelectorAll('.dot');

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function moveToSlide(value) {
        const testimonials = document.querySelector('.testimonials');
        const testimonial = document.querySelector(`.testimonial[data-value="${value}"]`);
        
        testimonials.style.left = `${-1 * testimonial.offsetLeft}px`;
    }

    function handleButtonClick() {

        const dots = document.querySelectorAll('.dot');
        
        moveToSlide(this.value);

        dots.forEach(dot => dot === this ? dot.classList.add('selected') : dot.classList.remove('selected'));

    }

    function handleResizeEvent() {
        const value = 1;

        moveToSlide(value);

        dots.forEach(dot => parseInt(dot.value) === value ? dot.classList.add('selected') : dot.classList.remove('selected'));

    }

    
    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    dots.forEach(dot => dot.addEventListener('click', handleButtonClick));
    window.addEventListener('resize', handleResizeEvent);
}

document.addEventListener('DOMContentLoaded', loadContent);