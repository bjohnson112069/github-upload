function loader() {
   const loader = document.querySelector('.loader');
   const loaderItem = document.querySelectorAll('.loader__item');
   
   function getScrollAmount() {
      const title = document.querySelector('.gs_anim3');
      const container = document.querySelector('.title')
      const titleWidth = title.scrollWidth;
      return -1 * (titleWidth - container.offsetWidth);
   }

   // Lenis Smooth Scroll
   const lenis = new Lenis({
      duration: 1.2
   });

   function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
   };

   requestAnimationFrame(raf);

   // Inetegration Lenis on GSAP ScrollTrigger
   lenis.on('scroll', ScrollTrigger.update);

   gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
   });

   gsap.ticker.lagSmoothing(0);


   const tl = gsap.timeline();

   gsap.set(loaderItem, {
         transformOrigin: "100% 100%",
         scaleX: 1
   }),

      tl.to(loaderItem, .5, {
         scaleX: 0,
         transformOrigin: "0% 0%",
         stagger: 0.02,
         ease: "power3.out"
      })

      tl.to('.gs_anim1', 1, {
         x: 0,
         opacity: 1,
         stagger: 0.1,
         ease: "power3.out"
      }, "-=.6")

      tl.to('.gs_anim2', .8, {
         clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
         stagger: 0.2
      }, "-=.8")

      tl.to('.gs_anim2 img', .8, {
         scale: 1,
         stagger: 0.2
      }, "-=.8")


      tl.to('.gs_anim3', {
         scrollTrigger: {
            trigger: 'header',
            start: "top top",
            end: () => `+=${getScrollAmount() * -1}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            // markers: true
         },
         x: getScrollAmount,
         duration: 3,
         ease: "none",
      })

      let jobInfoItems = document.querySelectorAll('.job__info-item ');
      jobInfoItems.forEach((item, index) => {
         item.style.zIndex = jobInfoItems.length - index;
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
         markers: true
      });
}

window.addEventListener('DOMContentLoaded', () => {
   setTimeout(() => {
      loader();
   }, 1000);
});