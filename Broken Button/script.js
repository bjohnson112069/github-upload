const panels = document.querySelectorAll(".panel");
let previousPanel;

function handleClickEvent (e) {

          if (previousPanel !== undefined) previousPanel.classList.toggle("open");
          this.classList.toggle("open");
          previousPanel = this;
}

function handleTransitionEvent(e) {
          if (e.propertyName.includes("flex")) {
                    const overlay = this.querySelector(".overlay");
                    overlay.classList.toggle("open-active");
          }
}

panels.forEach(panel => panel.addEventListener("click", handleClickEvent));
panels.forEach(panel => panel.addEventListener("transitionend", handleTransitionEvent));