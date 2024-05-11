
async function loadContent() {
    const links = document.querySelectorAll('a');
    const menu = document.querySelector('.menu');
    const sliders = document.querySelectorAll('.slide');
    const faders = document.querySelectorAll('.fade');

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function toggleMenu() {
        const nav = document.querySelector('nav');
        const html = document.documentElement;

        if (this.matches('.open')) {
            this.classList.remove('open');
            nav.classList.remove('expanded');
            html.classList.remove("disable-scrolling");
        } else {
            this.classList.add('open');
            nav.classList.add('expanded');
            html.classList.add("disable-scrolling");

        }

    }
    
    function handleIntersect(items) {
        items.forEach(item => {
            // toggle class based on current value of visibility/intersection
            item.target.classList.toggle("appear", item.isIntersecting);
        })
    }

    // On page load...



    // Event Listeners
    const options = {
        root: null, // it is the viewport
        threshold: 0, // 0 - 1 scale; 0=initial part of element; 1 = all of the element
        rootMargin: "0px 0px -100px 0px" // similar to margin (in quotes) in CSS (e.g. origin)
    };
    const observer = new IntersectionObserver(handleIntersect, options);
    sliders.forEach(slider => observer.observe(slider));

    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    menu.addEventListener('click', toggleMenu);
}

window.addEventListener('DOMContentLoaded', loadContent);