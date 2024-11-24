function loadContent() {


    // on page load ...
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline();

    const hero = document.querySelector('.hero');
    const heroImage = hero.querySelector('.hero-image');
    tl.to(heroImage, {
        backgroundSize: '100%',
        scrollTrigger: {
            trigger: hero,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            // markers: true
        }
    });

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
            markers: true
        }
    })



    // const totalSections = 5;
    // const sections = document.querySelectorAll('section');
    // const highlights = document.querySelectorAll('.highlight');

    // sections.forEach((section, index) => {
    //     const isLast = index === sections.length - 1;

    //     // Animate panel
    //     tl.from(section, {
    //         ease: 'none',
    //         // startAt: { filter: 'brightness(100%) blur(0px)' },
    //         // filter: isLast ? 'none' : 'brightness(50%) blur(10px)',
    //         scale: index === 0 ? 1 : 0,
    //         borderRadius: 40,
    //         scrollTrigger: {
    //             trigger: section,
    //             start: "top bottom",
    //             end: "bottom center",
    //             scrub: 1,
    //             markers: true,
    //             // onUpdate: (self) => console.log("onUpdate", self),
    //             // onEnter: () => console.log("onEnter"),
    //             // onLeave: () => console.log("onLeave"),
    //             // onEnterBack: () => console.log("onEnterBack"),
    //             // onLeaveBack: () => console.log("onLeaveBack"),
    //         }
    //     });
 
    // });



    // Event Listeners
}

window.addEventListener('DOMContentLoaded', loadContent);