function loadContent() {
    const services = document.querySelectorAll('.service');
    const next = document.querySelector('#next');
    const prev =  document.querySelector('#prev');
    const arrows = document.querySelectorAll('.arrows button');
    const thumbnails = document.querySelectorAll('.thumbnail');

    // configuration parameters
    let countItem = services.length;
    let activeSlide = 0;

    function showSlider() {
        // remove old active slide
        oldActiveSlide = document.querySelector('.service.active');
        oldActiveSlide.classList.remove('active');

        // remove old animation
        gsap.to(oldActiveSlide, {opacity: 0, zIndex: -1})

        // remove old active thumbnail
        oldActiveThumbnail = document.querySelector('.thumbnail.active');
        oldActiveThumbnail.classList.remove('active');

        // active new slide using activeService as index
        services[activeSlide].classList.add('active');

        // play the new/active animation
        const tlService = gsap.timeline( {defaults: {paused: false, ease:'back'}} )
        tlService.fromTo(services[activeSlide], 
            {opacity: 0, zIndex: -1},
            {duration: 0.8, ease: 'linear', opacity: 1, zIndex: 10})
            .fromTo(services[activeSlide].querySelector('.content h2'), 
            {x:80, opacity: 0},
            {duration: 1, x:0, opacity: 1})
            .fromTo(services[activeSlide].querySelector('.content h3'), 
            {x:-80, opacity: 0},
            {duration: 1, x:0, opacity: 1})
            .fromTo(services[activeSlide].querySelector('.content p'), 
            {y:30, opacity: 0}, 
            {y:0, opacity: 1}, '-=0.2')
            
        // active new thumbnail using activeService as index
        thumbnails[activeSlide].classList.add('active');


        // clear the auto refresh timer then reset the interval timer
        clearInterval(refreshInterval);
        refreshInterval = setInterval(() => {
            next.click();
        }, 10000);
    }

    function handleArrowButtonClick() {
        if (this.matches('#prev')) {
            activeSlide = (activeSlide <= 0) ? (countItem - 1) : activeSlide - 1;
        } else {
            activeSlide = (activeSlide >= countItem - 1) ? 0 : activeSlide + 1;
        }
        showSlider();
    }

    function handleThumbnailClick(thumbnail) {
        activeSlide = thumbnail;
        showSlider();

    }

    // on page load ...
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults( { duration: .3 });

    // const tlHero = gsap.timeline({
    //     scrollTrigger: {
    //         trigger: '#hero',
    //         start: '50% 50%',
    //         end: '+=2000',
    //         scrub: 1,
    //         markers: true
    //     }
    // })
    // .to('#hero', {height: 50, position: 'fixed'})
    // .to('.name', {fontSize: '2.5rem'})
    // .to('.title', {fontSize: '1rem'})

    let refreshInterval = setInterval(() => {
        next.click();
    }, 10000);
    showSlider();

    // Event Listeners
    thumbnails.forEach((thumbnail, index) => thumbnail.addEventListener('click', () => handleThumbnailClick(index)));
    arrows.forEach(arrow => {
        arrow.addEventListener('click', handleArrowButtonClick);

        // handle hover animation
        const tlArrows = gsap.timeline( { paused: true })
            .to(arrow, {
                background: 'hsl(0, 0%, 99%)',
                color: 'hsl(0, 0%, 6%)',
                transformOrigin: 'left center'
            })
            .to(arrow.querySelector('i'), {
                fontSize: '1.5rem'
            }, '<')
    
        arrow.addEventListener('mouseenter', () => tlArrows.play());
        arrow.addEventListener('mouseleave', () => tlArrows.reverse());
    });


}

window.addEventListener('DOMContentLoaded', loadContent);