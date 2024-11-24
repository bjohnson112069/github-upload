function loadContent() {


    // on page load ...
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(Flip);

    const hero = document.querySelector('.hero .content-container');
    const container = document.querySelector('.name-container');
    const logo = document.querySelector('.logo');
    const name = document.querySelector('.name-bl');



    gsap.to(name, {
        // y: '40vh',
        scale: 1,
        scrollTrigger: {
            trigger: '.hero',
            start: "bottom bottom",
            end: 'bottom center',
            scrub: 1,
            markers: true,
            onEnter: () => {
                console.log('on enter')
            },
            onLeave: () => {
                console.log('on leave')
                let state = Flip.getState('.logo');
                container.appendChild(logo);
                Flip.from(state, {
                    duration: 1,
                    ease: 'power1.out'
                });
                state = Flip.getState('.name-bl');
                container.appendChild(name);
                Flip.from(state, {
                    duration: 1,
                    ease: 'power1.out'
                });
            },
            onEnterBack: () => {
                console.log('enter back')
                let state = Flip.getState('.logo');
                hero.appendChild(logo);
                Flip.from(state, {
                    duration: 1,
                    // ease: 'power1.out'
                });
                state = Flip.getState('.name-bl');
                hero.appendChild(name);
                Flip.from(state, {
                    duration: 1,
                    ease: 'power1.out'
                });
            },
            onLeaveBack: () => {
                console.log('leave back')
            },
        }
    })


    // Event Listeners

}

window.addEventListener('DOMContentLoaded', loadContent);