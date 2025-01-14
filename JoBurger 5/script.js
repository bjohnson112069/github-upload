
function loadContent() {
    const links = document.querySelectorAll('a');
    const menu = document.querySelector('.menu');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sliders = document.querySelectorAll('.slide');
    const form = document.querySelector('form');
    const options = {
        root: null, // it is the viewport
        threshold: 0, // 0 - 1 scale; 0=initial part of element; 1 = all of the element
        rootMargin: "0px 0px -100px 0px" // similar to margin (in quotes) in CSS (e.g. origin)
    };
    const reviews = [
        {
            name: "Alan Montgomery",
            image: "https://github.com/bjohnson112069/web-images/blob/main/JoBurger%205/58.png?raw=true",
            content: "Lorem ipsum sollicitudin nibh sit amet commodo. Purus sit amet luctus venenatis lectus. Dolor sit amet consectetur adipiscing elit ut aliquam purus. In metus vulputate eu scelerisque felis imperdiet proin ferment"
        },
        {
            name: "Shawn Neal",
            image: "https://github.com/bjohnson112069/web-images/blob/main/JoBurger%205/49.png?raw=true",
            content:  "Lorem ipsum praesent semper feugiat nibh sed pulvinar proin. Ipsum dolor sit amet consectetur adipiscing elit pellentesque. Urna molestie at elementum eu facilisis sed odio morbi quis. Adipiscing commodo elit at "
        },
        {
            name: "Victoria Hicks",
            image: "https://github.com/bjohnson112069/web-images/blob/main/JoBurger%205/26.png?raw=true",
            content: "Lorem ipsum consectetur a erat nam at lectus. Amet justo donec enim diam vulputate ut pharetra. Scelerisque felis imperdiet proin fermentum leo vel orci porta non. Et ligula ullamcorper malesuada proin libero nun"
        },
        {
            name: "Nina Thomas",
            image: "https://github.com/bjohnson112069/web-images/blob/main/JoBurger%205/62.png?raw=true",
            content: "Lorem ipsum viverra aliquet eget sit amet tellus. Adipiscing at in tellus integer feugiat scelerisque. Fringilla urna porttitor rhoncus dolor purus non enim praesent. Mauris ultrices eros in cursus. Dolor purus n"
        },
        {
            name: "Jessie James",
            image: "https://github.com/bjohnson112069/web-images/blob/main/JoBurger%205/4.png?raw=true",
            content: "Lorem ipsum ut eu sem integer vitae justo eget magna. Praesent tristique magna sit amet purus. Quis auctor elit sed vulputate mi. Morbi tristique senectus et netus et malesuada fames ac turpis. Aliquam sem"
        },
        {
            name: "Louella Warren",
            image: "https://github.com/bjohnson112069/web-images/blob/main/JoBurger%205/59.png?raw=true",
            content: "Lorem ipsum eget felis eget nunc lobortis mattis aliquam faucibus purus. Ipsum dolor sit amet consectetur adipiscing elit. Purus in mollis nunc sed id semper. Imperdiet sed euismod nisi porta lorem mollis aliquam"
        },
        {
            name: "Howard Stone",
            image: "https://github.com/bjohnson112069/web-images/blob/main/JoBurger%205/51.png?raw=true",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis ut diam quam nulla. Varius vel pharetra vel turpis nunc eget lorem dolor sed. Egest"
        },
        {
            name: "Marlene Price",
            image: "https://github.com/bjohnson112069/web-images/blob/main/JoBurger%205/52.png?raw=true",
            content: "Lorem ipsum id eu nisl nunc mi ipsum faucibus vitae aliquet nec. Consequat id porta nibh venenatis cras sed felis eget velit. Bibendum at varius vel pharetra vel turpis nunc eget lorem. Et tortor consequat id por"
        },
        {
            name: "Yolanda Webb",
            image: "https://github.com/bjohnson112069/web-images/blob/main/JoBurger%205/38.png?raw=true",
            content: "Lorem ipsum ut eu sem integer vitae justo eget magna. Praesent tristique magna sit amet purus. Quis auctor elit sed vulputate mi. Morbi tristique senectus et netus et malesuada fames ac turpis. Aliquam sem"
        },
    ];

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    
    function toggleMenuIcon(e) {
        if (e.propertyName !== 'transform') return

        const menu = document.querySelector('.menu');

        this.matches('.expanded') ? 
            menu.classList.add('open') : 
            menu.classList.remove('open');
    }

    

    function toggleMenu(menu) {
        const html = document.documentElement;

        if (menu.matches('.open')) {
            nav.classList.remove('expanded');
            html.classList.remove("disable-scrolling");
        } else {
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

    function displayReviews() {
        const list = document.querySelector('.testimonials');

        list.innerHTML = reviews.map(review => `<figure class="testimonial fade">
            <figcaption class="testimonial-caption">
                <p class="testimonial-content">${review.content}</p>
                <span class="testimonial-name">${review.name}</span>
            </figcaption>
            <img class="testimonial-img" src="${review.image}" alt="image of a customer">
        </figure>`)
        .join('');

        // Event Listeners
        const faders = document.querySelectorAll('.fade');
        const observer = new IntersectionObserver(handleIntersect, options);
        faders.forEach(fader => observer.observe(fader));

    }

    function goToSection(e) {
        const section = document.querySelector(`#${this.dataset.section}`);
        if (!section) return;

        const menu = document.querySelector('.menu');

        // check if the menu is visible (offsetParent not <null>)
        // toggle the menu if it is visible
        if (menu.offsetParent !== null) {
            toggleMenu(menu);
        }

        // scroll the targeted section into view
        section.scrollIntoView(true);
    }

    
    function handleFormSubmission(e) {
        // prevent the form from submitting
        e.preventDefault();

        const input = form.querySelector('.input-wrapper');
        const confirmation = form.querySelector('.confirmation');

        input.classList.add('slide-out');
        confirmation.classList.add('active');

        setTimeout(() => {
            this.reset();
            input.classList.remove('slide-out');
            confirmation.classList.remove('active');
            this.submit.focus();
        }, 4000);
    }

    // On page load...
    displayReviews();

    // Event Listeners
    const observer = new IntersectionObserver(handleIntersect, options);
    sliders.forEach(slider => observer.observe(slider));
    form.addEventListener('submit', handleFormSubmission);
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    navLinks.forEach(link => link.addEventListener('click', goToSection));
    menu.addEventListener('click', (e) => toggleMenu(e.currentTarget));
    nav.addEventListener('transitionend', toggleMenuIcon);
}

window.addEventListener('DOMContentLoaded', loadContent);