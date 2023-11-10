const htmlElement = document.documentElement;
const list = document.querySelector("ul");
const listItems = list.querySelectorAll("a");
const card = document.querySelector(".card");
const image = card.querySelector("img");

const images = {
          about: "jonas-stolle-6rhdGmD6wfw-unsplash.jpg",
          experience: "marc-rafanell-lopez-kGpOdvkvCzY-unsplash.jpg",
          skills: "alvaro-reyes-qWwpHwip31M-unsplash.jpg",
          projects: "branko-stancevic-GI1hwOGqGtE-unsplash.jpg",
          hobbies: "hunters-race-MYbhN8KaaEc-unsplash.jpg"
}

let flip = false;

function updateImage(e) {
          image.src = `./images/${images[this.textContent]}`;
          card.classList.toggle("active");
          const degrees = 15;
          card.style.transform = `rotate(${flip ? degrees : -1 * degrees}deg)`;

          if (e.type === "mouseenter") flip = !flip;
}

listItems.forEach(item => item.addEventListener("mouseenter", updateImage));
listItems.forEach(item => item.addEventListener("mouseleave", updateImage));

const textWrapper = document.querySelector(".text-wrapper");
const colorChanger = document.querySelector(".change-color");
const letterContainer = document.querySelector(".letter-container");
const lettersSpan = colorChanger.querySelectorAll("span");
const lettersH1 = letterContainer.querySelectorAll("h1");

function handleIntersect(items) {
          // console.log(items);
          items.forEach(item => {
                    // console.log(item.target);
                    item.isIntersecting ? item.target.classList.add("intersecting") : item.target.classList.remove("intersecting");
          })
}



const options = {
          root: colorChanger,
          // rootMargin: ,
          // threshold: 1
};
const observer = new IntersectionObserver(handleIntersect, options);
lettersSpan.forEach(letter => observer.observe(letter));
lettersH1.forEach(letter => observer.observe(letter));


function changePixelColor(items) {
          items.forEach(item => {
                    console.log(canvas.width, canvas.height);
                    if (item.isIntersecting) {
                    } else {

                    }
          })
}

const changePixels = document.querySelector(".change-pixels");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');
const headingLetters = changePixels.querySelectorAll("span");
const newOptions = {
          root: changePixels,
          // rootMargin: ,
          // threshold: 1
};
const watch = new IntersectionObserver(changePixelColor, newOptions);
headingLetters.forEach(letter => watch.observe(letter));