const links = document.querySelectorAll("a");
const dropdwn = document.querySelector(".profile-name");
const controls = document.querySelector(".controls");
const buttons = controls.querySelectorAll("button");

function handleDropDownClick() {
    this.classList.toggle("active");
}

function handleButtonClick() {
    buttons.forEach(button => button === this ? 
        button.classList.add("active") : button.classList.remove("active") );
}

buttons.forEach(button => button.addEventListener("click", handleButtonClick));
dropdwn.addEventListener("click", handleDropDownClick);
links.forEach(link => link.addEventListener("click", (e) => e.preventDefault()));
