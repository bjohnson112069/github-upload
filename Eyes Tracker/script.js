const htmlElement = document.documentElement;
const container = document.querySelector(".container");
const eyes = document.querySelectorAll(".eye");


function moveEyes(e) {

          const { offsetWidth: width, offsetHeight: height } = this;
          let { offsetX: x, offsetY: y } = e;
          const walk = 75;

          console.log("X", e.offsetX, "Y", e.offsetY, "offsetW", e.target.offsetWidth, "offsetH", e.target.offsetHeight);
          console.log("offsetLeft", e.target.offsetLeft, "offsetTop", e.target.offsetTop);
          console.log(e.target.clientLeft, e.target.clientTop);
          if (this !== e.target) {
                    x += e.target.offsetLeft;
                    y += e.target.offsetTop;
          }

          // walk is 100% [range is between -50 and +50] then converted to pixels (-50px to +50px based on % of cursor move)
          const xWalk = Math.round((x / width * walk) - (walk / 2));
          const yWalk = Math.round((y / height * walk) - (walk / 2));
          
          // console.log(xWalk, yWalk)
          htmlElement.style.setProperty("--x", `${xWalk}px`);
          htmlElement.style.setProperty("--y", `${yWalk}px`);
}

container.addEventListener("mousemove", moveEyes)