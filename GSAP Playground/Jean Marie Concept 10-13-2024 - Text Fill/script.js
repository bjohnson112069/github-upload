function loadContent() {

    // Untility: generate random number between min and max
    function randomNum(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }


    // on page load ...
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(Flip);

    const hero = document.querySelector('.hero');
    const container = document.querySelector('.name-container');
    const logo = document.querySelector('.logo');
    const name = document.querySelector('.name-bl');

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.hero',
            start: 'bottom bottom',
            end: 'bottom top',
            scrub: 1,
            pin: true,
            // markers: true,
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
                    opacity: 1,
                    duration: 1,
                    ease: 'power1.out'
                });
                state = Flip.getState('.name-bl');
                hero.appendChild(name);
                Flip.from(state, {
                    duration: 1,
                    ease: 'power1.out'
                });
            },
        }
    });

        tl.fromTo('.hero', {
            backgroundColor: 'hsl(0, 0%, 6%)'
        }, {
            backgroundColor: 'hsl(300, 100%, 25%)'
        }),
        tl.fromTo('.logo', {
            width: '700',
            opacity: 0.3,
        }, 
        {
            width: 50,
            opacity: 1,
        }),
        tl.fromTo('.name', {
            color: 'transparent',
            fontSize: '7rem',
        },
        {
            color: 'hsl(0, 0%, 99%)',
            fontSize: '2rem',
        }),
        tl.fromTo('.title', {
            fontSize: '4rem',
        },
        {
            fontSize: '1rem',
        })

    const welcome = document.querySelector('.welcome')
    const reveal = welcome.querySelector('.reveal');
    const text = SplitType.create(reveal, {types: 'chars, words'});
    tl.to(text.chars, {
        color: 'hsl(0, 0%, 99%)',
        duration: .05,
        stagger: 0.05,
        scrollTrigger: {
            trigger: welcome,
            start: "top center",
            end: "top top",
            scrub: 1,
            // markers: {
            //     startColor: 'orange',
            //     endColor: 'orange',
            // }
        }
    });

    const tlServices = gsap.timeline({
        scrollTrigger: {
            trigger: '.services',
            start: 'top top',
            // end: 'bottom bottom',
            end: '+=5000',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            markers: {
                startColor: 'pink',
                endColor: 'pink',
            },
        }
    });

    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        tlServices.add([
            gsap.fromTo(card, {
                x: `${index % 2 === 0 ? '100vw' : '-100vw'}`,
            }, {
                x: '0',
            }),
    
        ]);

        const num = randomNum(-15, 15);
        tlServices.add([
            gsap.fromTo(card, {
                rotate: '0deg',
            }, {
                // rotate: `${index % 2 === 0 ? `${num}deg` : `${-num}deg`}`
                rotate: `${num}deg`
            }),
    
        ]);   
    });

    // Event Listeners

}

window.addEventListener('DOMContentLoaded', loadContent);