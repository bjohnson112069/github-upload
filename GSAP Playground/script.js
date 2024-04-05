const links = document.querySelectorAll('a');
const tl = gsap.timeline(
          {
                    onComplete: () => tl.reverse(),
                    defaults: {
                              duration: 1, 
                              opacity: 0, 
                              onComplete: () => console.log("the tween is complete")
                    }
          });

tl.from("h1", {
          y: -100
})
.from("p", {
          y: 100
}, "-=0.5")
.from(".reference", {
          duration: 2, 
          x: "100",
          stagger: 0.2,
          ease: "elastic(1, 0.3)"
})


// on page load ...
links.forEach(link => link.addEventListener("click", (e) => e.preventDefault()));
