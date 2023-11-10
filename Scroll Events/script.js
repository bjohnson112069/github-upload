
const htmlElement = document.documentElement;
const sections = document.querySelectorAll("section");
const sliders = document.querySelectorAll(".slide-in")


let previousY = 0;
const scrollRangeMin = 0;
const scrollRangeMax = 100;
let scrollRange = scrollRangeMin;

function debounce(func, wait = 20, immediate = true) {
     var timeout;
     return function() {
       var context = this, args = arguments;
       var later = function() {
         timeout = null;
         if (!immediate) func.apply(context, args);
       };
       var callNow = immediate && !timeout;
       clearTimeout(timeout);
       timeout = setTimeout(later, wait);
       if (callNow) func.apply(context, args);
     };
};

function setScrollVar(e) {
     // console.log(e);
     // console.log(`scrollX:${window.scrollX}, scrollY:${window.scrollY}, scrollMaxX:${window.scrollMaxX}, scrollMaxY:${window.scrollMaxY}`);
     // console.log(`innerHeight:${window.innerHeight}, innerWidth:${window.innerWidth}`);
     let currentY = window.scrollY;

     sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.clientHeight;
          const sliders = section.querySelectorAll(".slide-in"); 
          let action = "";

          if (currentY + 1 >= sectionTop && currentY +1 <= sectionBottom) {
               sliders.forEach(slider => slider.classList.add("appear"));
          } else {
               sliders.forEach(slider => slider.classList.remove("appear"));
          }

          // const slideInAt = sectionTop + (section.clientHeight / 2);
          const slideInAt = sectionTop + (section.clientHeight / 3);
          // console.log(`currentY: ${currentY}, sectionTop:${sectionTop}, sectionBottom:${sectionBottom}, slideInAt:${slideInAt}`);
          // if (currentY + 1 >= sectionTop && currentY +1 <= slideInAt) {
          if (currentY >= sectionTop && currentY <= slideInAt) {
                    const scrollPercentage = (currentY - sectionTop) / (slideInAt - sectionTop) * 100;
               // console.log(scrollPercentage)
               
               sliders.forEach(slider => {
                    if (slider.classList.contains("slide-right")) {
                         slider.style.setProperty("transform",`translateX(${100 - scrollPercentage}%)`);
                    } 
                    if (slider.classList.contains("slide-left")) {
                         slider.style.setProperty("transform",`translateX(${-100 + scrollPercentage}%)`);
                    }
               })

          }
     })
     

     // scrollRange += distanceScrolled;
     // scrollRange = Math.min(scrollRangeMax, scrollRange);
     // scrollRange = Math.max(scrollRangeMin, scrollRange);
     // console.log(`scrollRange: ${scrollRange}`);
     // htmlElement.style.setProperty("--horiz-scroll", `${scrollRange}%`);

     previousY = currentY;

}

function handlIntersect(entries, observer) {
     
     entries.forEach(entry => {
          // toggle class based on currnet value of visibility/intersection
          entry.target.classList.toggle("appear", entry.isIntersecting);
          const sliders = entry.target.querySelectorAll(".slide-in");
          sliders.forEach(slider => slider.classList.toggle("appear", entry.isIntersecting));
          
          if(entry.isIntersecting) scrollRange = scrollRangeMin;
     })


}

const options = {
     // root: htmlElement,
     rootMargin: "0px 0px 0px 0px", // top, right, bottom, left
     // threshold: 1
};
const observer = new IntersectionObserver(handlIntersect, options);

// sections.forEach(section => observer.observe(section));
window.addEventListener("scroll", debounce(setScrollVar));
window.addEventListener("resize", setScrollVar);

// on page load
// setScrollVar();