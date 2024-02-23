const buttons = document.querySelectorAll(".download");
const subscribe = document.querySelector(".subscribe");
const positions = {
          10: [0, 100, 200, 300], 
          25: [-100, 0, 100, 200],
          50: [-200, -100, 0, 100],
          100: [-300, -200, -100, 0]
}
const colors = {
          10: "--clr-yellow",
          25: "--clr-green",
          50: "--clr-blue",
          100: "--clr-red"
}

function handleButtonClick(e) {
          const headers = document.querySelectorAll(".header");
          const prices = document.querySelectorAll(".price");
          const form = document.querySelector("form");

          for (let i = 0; i < headers.length; i++) {
                    headers[i].style.transform = `translate(${positions[this.value][i]}%)`;
                    prices[i].style.transform = `translate(${positions[this.value][i] * -1}%)`;
          }

          form.style.setProperty("--form-bg-color", `var(${colors[this.value]})`);
          buttons.forEach(button => button === this ? button.classList.add("active") : button.classList.remove("active"));

}

function handleSubscribeEvent(e) {
          e.preventDefault();

          subscribe.textContent = "SUBSCRIBED!!!"
          setTimeout(() => {
                    subscribe.textContent = "Subscribe"
          }, 2000);

}

buttons.forEach(button => button.addEventListener("click", handleButtonClick));
subscribe.addEventListener("click", handleSubscribeEvent);

// on page load, waite 1sec then remove initial animation effects
window.addEventListener('DOMContentLoaded', () => {
          const elements = document.querySelectorAll(".scale");
          const classesToRemove = ['slide-left', 'slide-right', 'slide-up', 'slide-down', 'scale-up', 'scale-down'];

          setTimeout(() => {
                    elements.forEach(element => element.classList.remove(...classesToRemove))
          }, 1000);
});