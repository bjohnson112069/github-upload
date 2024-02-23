const container = document.querySelector(".content-container");
const eyes = document.querySelector(".eyes");
const links = document.querySelectorAll(".nav-link");
const panels = document.querySelectorAll(".panel");
const toggle = document.querySelector(".toggle");

function moveEyes(e) {

          const { offsetWidth: width, offsetHeight: height } = this;
          let { offsetX: x, offsetY: y } = e;
          const walk = 10;

          if (this !== e.target) {
                    // important position:relative modifies ofsetLeft/Top
                    x += e.target.offsetLeft;
                    y += e.target.offsetTop;
          }

          // walk is 100% [range is between -50 and +50] then converted to pixels (-50px to +50px based on % of cursor move)
          const xWalk = Math.round((x / width * walk) - (walk / 2));
          const yWalk = Math.round((y / height * walk) - (walk / 2));
          
          eyes.style.setProperty("--x", `${xWalk}px`);
          eyes.style.setProperty("--y", `${yWalk}px`);
}

function handleNavClick() {
          links.forEach(link => link === this ? link.classList.add("active") : link.classList.remove("active"));

          panels.forEach(panel => panel.matches(`.panel-${this.dataset.value}`) ? 
                    panel.classList.add("active") :
                    panel.classList.remove("active"))
}

function handleToggleEvent(e) {
          this.checked ? eyes.classList.add("active") : eyes.classList.remove("active");
          document.querySelector(".panel-four").classList.remove("active");
          document.querySelector("li[data-value=four]").classList.remove("active");
}

container.addEventListener("mousemove", moveEyes);
links.forEach(link => link.addEventListener("click", handleNavClick));
toggle.addEventListener("click", handleToggleEvent);