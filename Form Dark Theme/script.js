// const followers = document.querySelector("#followers");
const classesToRemove = ['slide-left', 'slide-right', 'slide-up', 'slide-down', 'scale-up', 'scale-down'];

const chat = document.querySelector(".icon-chat");
const subscribe = document.querySelector("#subscribe-form");

function handleChatClick() {
    const isExpanded = this.getAttribute("aria-expanded") === "true";
    const form = document.querySelector("#chat-form");

    this.setAttribute("aria-expanded", `${!isExpanded}`);
    form.classList.toggle("active", !isExpanded);
}

function handleSubscribeEvent(e) {
    // stop form from resetting
    e.preventDefault();

    const button = document.querySelector(".after-submit");
    // apply a class to move the confirmation notification in place
    button.classList.add("done");

    // reset the form
    this.reset();
}

chat.addEventListener("click", handleChatClick);
subscribe.addEventListener("submit", handleSubscribeEvent)