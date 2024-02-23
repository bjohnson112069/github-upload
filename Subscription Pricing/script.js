const options = document.querySelectorAll(".option");
const form = document.querySelector(".card");
const buttons = form.querySelectorAll("button");

function handleRadioEvent(e) {
          const input = e.currentTarget.querySelector("input");

          options.forEach(option => {
                    option === e.currentTarget ? option.classList.add("active") : option.classList.remove("active");
          })
          input.checked=true;
}

function handleButtonClick() {

          buttons.forEach(button => {
                    button === this ? button.classList.add("active") : button.classList.remove("active");
          })
}

options.forEach(option => option.addEventListener("click", handleRadioEvent));
buttons.forEach(button => button.addEventListener("click", handleButtonClick));