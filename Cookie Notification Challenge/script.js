const closeButtons = document.querySelectorAll(".btn");

function handleButtonClick() {
          let modal = (this.matches(".accept") || this.matches(".decline")) ? 
                    document.querySelector(".modal-bottom") : 
                    this.parentNode;
          modal.style.display = "none";
}

closeButtons.forEach(button => button.addEventListener("click", handleButtonClick));

