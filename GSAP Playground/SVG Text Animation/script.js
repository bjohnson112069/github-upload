function loadContent() {

    // configuration parameters


    // on page load ...
    const tl = gsap.timeline()
    .from('.circle', { 
        duration: 1.5, 
        scale: 0,
        stagger: 0.3
    })
    .from('text', {
        ease: 'power1.out',
        y: '-100vh',
        stagger: 0.2
    })


    // Event Listeners
}

window.addEventListener('DOMContentLoaded', loadContent);