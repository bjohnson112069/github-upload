const menu = document.querySelector(".icon-menu");
const nav = document.querySelector(".nav-box");
const form = document.querySelector(".subscribe-form");
const subscribed = form.querySelector("span");

function handleMenuClickEvent(e) {

          // capture current visibility state of the menu button
          const visibility = e.target.dataset.opened;

          // convert string to boolean value
          let visible = (visibility === "true");

          // toggle the statu of visibility on the menu button
          e.currentTarget.dataset.opened = !visible;

          // toggle the statu of visibility on the nav box container
          nav.classList.toggle("opened", !visible);

}

function handleSubmitEvent(e) {
          e.preventDefault();
          subscribed.classList.add("active");
          setTimeout(() => subscribed.classList.remove("active"), 3000)
          this.reset();
}

// when someone cliks the hambruger button
menu.addEventListener("click", handleMenuClickEvent);

// when someone click the subscribe button
form.addEventListener("submit", handleSubmitEvent);