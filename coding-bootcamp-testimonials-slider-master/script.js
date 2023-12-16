const data = [
        {
                active: true,
                image: "./images/image-tanya.jpg",
                quote: "\" I’ve been interested in coding for a while but never taken the jump, until now. I couldn’t recommend this course enough. I’m now in the job of my dreams and so excited about the future. \"",
                name: "Tanya Sinclair",
                title: "UX Engineer"        
        },
        {
                active: false,
                image: "./images/image-john.jpg",
                quote: "\" If you want to lay the best foundation possible I’d recommend taking this course. The depth the instructors go into is incredible. I now feel so confident about starting up as a professional developer. \"",
                name: "John Tarkpor",
                title: "Junior Front-end Developer"
        },
        {
                active: false,
                image: "./images/image-random-1.jpg",
                quote: "\" Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, itaque reprehenderit! Eaque porro mollitia odit, repellendus voluptatibus, nam atque id, deleniti repudiandae reprehenderit nesciunt reiciendis asperiores vero fuga! Debitis, nihil!. \"",
                name: "Jane Doe",
                title: "UX Designer"        
        },
        {
                active: false,
                image: "./images/image-random-2.jpg",
                quote: "\" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae, officia ut nostrum sed et impedit perferendis, repudiandae fugit quis soluta asperiores. Porro, itaque. Consequuntur voluptatem inventore aliquid atque at quidem. \"",
                name: "John Doe",
                title: "Senior Front-end Developer"
        }
];

// default value is the first element in the data array; 
// Note: refactor in the future to query active status; consider local storage
let currentSlideIndex = 0;

function handleClickEvent() {

        // set old slide active status to false
        data[currentSlideIndex].active = false;
        switch(this.dataset.name) {
                case "prev": {
                        // decrement index or reset to the last data element of the array
                        currentSlideIndex = (currentSlideIndex <= 0) ? (data.length - 1) : currentSlideIndex - 1;
                        break;
                };
                case "next": {
                        // increment index or reset to the first data element of the array
                        currentSlideIndex = (currentSlideIndex < data.length - 1) ? currentSlideIndex + 1 : 0;
                        break;
                };
        }

        // set new slide active status to true
        data[currentSlideIndex].active = true;

        const person = document.querySelector(".fg-image");
        const testimonial = document.querySelector(".testimonial");

        // toggle active status (to force CSS transition)
        person.classList.toggle("active");
        testimonial.classList.toggle("active");

        // Wait for transition to end before toggles active status again                
        function handleTransitionEvent(e) {
                // display contents of the current/active slide
                displayCurrentSlide();
                person.classList.toggle("active");
                testimonial.classList.toggle("active");
                testimonial.removeEventListener("transitionend", handleTransitionEvent);
        }
        testimonial.addEventListener("transitionend", handleTransitionEvent);
}

const arrows = document.querySelectorAll(".arrow");
// add click event listeners for the arrow buttons
arrows.forEach(arrow => arrow.addEventListener("click", handleClickEvent));


function displayCurrentSlide() {
        
        // iterate thru the data array and update the contents based 'active' status
        data.forEach(datum => {
                // return/do not display if not currently active
                if (!datum.active) return;
                
                const quote = document.querySelector("blockquote");
                const name = document.querySelector(".name");
                const title = document.querySelector(".title");
                const person = document.querySelector(".fg-image");
                const testimonial = document.querySelector(".testimonial");

                quote.textContent = datum.quote;
                name.textContent = datum.name;
                title.textContent = datum.title;
                person.src = datum.image;
        })
}

// on page load ...
displayCurrentSlide();