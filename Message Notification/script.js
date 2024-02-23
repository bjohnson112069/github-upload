const messages = document.querySelectorAll(".message");
const counts = document.querySelectorAll(".count");
const container = document.querySelector(".messages");
const bell = document.querySelector(".icon-notification");

let isDisplayed = false;

function handleNotificationEvent() {
          isDisplayed =!isDisplayed;
          container.classList.toggle("active", isDisplayed);
          bell.classList.toggle("active", isDisplayed);
}

// update on page load ...
counts.forEach(count => count.textContent = messages.length );


bell.addEventListener("click", handleNotificationEvent);