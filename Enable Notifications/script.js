const xmarks = document.querySelectorAll(".fa-xmark");

function handleCloseModalClick() {
    console.log(this, this.parentElement);

    if (this.parentElement.matches("#message-box-one")) {
        this.parentElement.classList.add("slide-right")
        setTimeout(() => {
            this.parentElement.classList.remove("slide-right")
        }, 3000);
    }

    if (this.parentElement.matches("#message-box-two")) {
        this.parentElement.classList.add("rotate-25")
        setTimeout(() => {
            this.parentElement.classList.remove("rotate-25")
        }, 3000);
    }
}

xmarks.forEach(x => x.addEventListener("click", handleCloseModalClick));


// on page load, waite 1sec then remove initial animation effects
window.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll(".slide");
    const classesToRemove = ['slide-left', 'slide-right', 'slide-up', 'slide-down', 'scale-up', 'scale-down'];

    setTimeout(() => {
              elements.forEach(element => element.classList.remove(...classesToRemove))
    }, 1000);
});