const slider = document.querySelector(".slides");
const slides = slider.querySelectorAll(".slide");
const boxes = document.querySelectorAll(".box");
const links = document.querySelectorAll(".nav-link");

let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
          isDown = true;
          slider.classList.add('active');
          startX = e.pageX - slider.offsetLeft;
          scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
          isDown = false;
          slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
          isDown = false;
          slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
          if (!isDown) return;  // stop the fn from running
          e.preventDefault();
          const x = e.pageX - slider.offsetLeft;
          const walk = (x - startX) * 3;
          slider.scrollLeft = scrollLeft - walk;
});


function handleIntersect(items) {
          let activeSlide;

          items.forEach(item => {
                    if (item.isIntersecting) {
                              item.target.classList.add("intersecting");
                              activeSlide = item.target.dataset.value;
                    } else {
                              item.target.classList.remove("intersecting");
                    }
                    // item.isIntersecting ? item.target.classList.add("intersecting") : item.target.classList.remove("intersecting");
          })

          boxes.forEach(box => {
                    box.dataset.value === activeSlide ? box.classList.add("active") : box.classList.remove("active");
          })
}



const options = {
          root: slider,
          rootMargin: "0px 0px 0px 0px",
          threshold: "1.0"
};
const observer = new IntersectionObserver(handleIntersect, options);
slides.forEach(slide => observer.observe(slide));


function handleNavClick() {
          links.forEach(link => {
                    link === this ? link.classList.add("active") : link.classList.remove("active");
          })
}

links.forEach(link => link.addEventListener("click", handleNavClick));