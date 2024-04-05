function loader() {

   Splitting();
   // luxy.init();
   gsap.registerPlugin(ScrollTrigger);

   const tl = gsap.timeline();

   //  *** HEADER ***

   function createHeader() {

      tl.from('.header__name .char', 1, {
         opacity: 0,
         yPercent: 130,
         stagger: 0.06,
         ease: 'back.out'
      });

      tl.to('.header__img', 2, {
         clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
         scale: 1, 
         ease: 'expo.out'
      }, "-=1");

      tl.from('.header__marq', 2, {
         opacity: 0,
         yPercent: 100,
         ease: 'expo.out'
      }, "-=1.5");

      gsap.to('.header__name-parallax', {
         scrollTrigger: {
            trigger: '.header',
            start: 'top top',
            scrub: 1.9
         },
         yPercent: -150
      });

      gsap.to('.header .stroke', {
         scrollTrigger: {
            trigger: '.header',
            start: 'top top',
            scrub: 1.9
         },
         xPercent: 25
      });

      gsap.to('.header__title span', {
         y: (i, el) => {return (1 - parseFloat(el.dataset.speed))},
         scrollTrigger: {
            trigger: '.header',
            start: 'top top',
            end: 'bottom 50%',
            scrub: .9,
            // markers: true
         },
         opacity: 0,
      });

      gsap.to('.header__img', {
         scrollTrigger: {
            trigger: '.header',
            start: 'top top',
            scrub: 1.9
         },
         xPercent: -50,
      })

      gsap.to('.header__img img', {
         scrollTrigger: {
            trigger: '.header',
            start: 'top top',
            scrub: 1.9
         },
         scale: 1.3,
         opacity: 1
      })
      
      gsap.to('.header__marq-bl', {
         scrollTrigger: {
            trigger: '.header',
            start: 'top top',
            scrub: 1.9
         },
         xPercent: -50
      })
      
      gsap.to('.header__marq-star', {
         scrollTrigger: {
            trigger: '.header',
            start: 'top top',
            scrub: 1.9
         },
         rotate: -720
      })

   }

   createHeader();

   //  *** ABOUT ***

   function createAbout() {

      gsap.set('.about__img', {
         scale: 1,
         yPercent: 0
      });

      gsap.from('.about__img', {
         scrollTrigger: {
            trigger: '.about',
            start: 'top bottom',
            end: 'top 50%',
            scrub: 1.9,
         },
         yPercent: 30
      });

      gsap.from('.about__img img', {
         scrollTrigger: {
            trigger: '.about',
            start: 'top bottom',
            end: 'top 50%',
            scrub: 1.9,
         },
         scale: .2
      });

      gsap.set('.about__right', {
         yPercent: 0
      });
      
      gsap.from('.about__right', {
         scrollTrigger: {
            trigger: '.about',
            start: 'top bottom',
            end: '50% top',
            scrub: 1.9,
         },
         yPercent: 100
      });
   }

   createAbout();

   //  *** HISTORY  ***

   function createHistory() {
      let jobs = document.querySelectorAll('.job__info-item ');
      jobs.forEach((job, index) => {
         job.style.zIndex = jobs.length - index;
      })

      gsap.set('.job__info-item', {
         clipPath: function () {
            return 'inset(0px 0px 0px 0px)'
         }
      });

      const jobAnim = gsap.to('.job__info-item:not(:last-child)', {
         clipPath: function () {
            return 'inset(0px 0px 100% 0px)'
         },
         stagger: .5,
         ease: "none"
      });

      ScrollTrigger.create({
         trigger: '.work',
         start: 'top top',
         end: 'bottom bottom',
         animation: jobAnim,
         scrub: 1,
      });
      
   }

   createHistory();

   function createSkills() {

       gsap.fromTo('.skills__item-name', {
         x: (i, el) => {return (parseFloat(el.dataset.speed))},
      }, {
         x: 0,
         scrollTrigger: {
            trigger: '.skills__list',
            start: 'top bottom',
            scrub: 1.9,
            // markers: true
         }
      });

   }

   createSkills();

}

window.addEventListener('DOMContentLoaded', () => {
      loader();
});