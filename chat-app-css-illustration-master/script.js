function loadContent() {
    // Configuration parameters
    const tl = gsap.timeline();

    function runAnimation() {
        tl.to('.chat-app', {
            y: 0,
        })
        tl.from('.hero-text > h1', {
            y: -50,
            opacity: 0
        })
        tl.from('.hero-text > p', {
            y: 50,
            opacity : 0
        })
        tl.to('.message', {
            x: 0,
            stagger: 0.3
        });    
    }

    // On page load... 

    runAnimation();


    // Event Listeners
    window.addEventListener('resize', () => {
        tl.restart();
    })
}

window.addEventListener('DOMContentLoaded', loadContent);