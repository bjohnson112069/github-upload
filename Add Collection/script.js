const arrows = document.querySelectorAll(".icon-more");
const inputs = document.querySelectorAll("input[name=collection]");
const collections = document.querySelector(".add-to-collection");
const modalClose = document.querySelector(".icon-close");
const save = document.querySelector(".submit");
const createNew = document.querySelector(".new-collection");

function handleMoreInfoEvent() {
          const more = this.nextElementSibling;

          more.classList.toggle("active");
          this.classList.toggle("active");
}

function handleSelectionEvent(e) {
          // if (!this.checked) return;
          
          inputs.forEach(input => {
                    const li = input.parentElement;
                    li.classList.toggle("selected", input.checked)
          })
}

function handleCloseEvent(e) {
          e.preventDefault();

          console.log("click")
          collections.classList.add("close");
          setTimeout(() => collections.classList.remove("close"), 3000);
}

function handleCreateNewEvent() {
          const boopOne = document.querySelector(".boop-1");
          const boopTwo = document.querySelector(".boop-2");

          boopOne.classList.add("active");
          setTimeout(() => {
                    boopOne.classList.remove("active");
                    boopTwo.classList.add("active");
                    setTimeout(() => boopTwo.classList.remove("active"), 1500);
          }, 1500);

}

arrows.forEach(arrow => arrow.addEventListener("click", handleMoreInfoEvent));
inputs.forEach(input => input.addEventListener("click", handleSelectionEvent));
modalClose.addEventListener("click", handleCloseEvent);
save.addEventListener("click", handleCloseEvent);
createNew.addEventListener("click", handleCreateNewEvent);
