const cards = document.querySelectorAll(".card__thumb");

cards.forEach(card => {
          card.addEventListener("click", handleCardClick);
})

const htmlElement = document.documentElement;
const outerModal = document.querySelector(".outer__modal")
const innerModal = document.querySelector(".inner__modal");
const expandedImage = innerModal.querySelector("img");

function handleCardClick(e) {
          let currentImage = e.target.src;
          outerModal.classList.toggle("active");
          expandedImage.src = currentImage;
          console.log(e.clientX, e.clientY);
          htmlElement.style.setProperty("--clientX", `${e.clientX}px`);
          htmlElement.style.setProperty("--clientY", `${e.clientY}px`);
}

function handleModalClick(e) {
          // currentTarget is listener (e.g. outer modal)
          // target is what generated the click event
          // if the target is the currentTarget (outer modal) then close the outer modal
          if (e.target === e.currentTarget) outerModal.classList.toggle("active");
}

outerModal.addEventListener("click", handleModalClick);

