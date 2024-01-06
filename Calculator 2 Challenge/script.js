// Add JavaScript code here
const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => button.addEventListener("click", () => {
          let value = button.firstChild.textContent;
          const screen = document.querySelector(".screen");

          if (button.matches(".operator") || button.matches(".total")) {
                    value = "Not Functional";
          }

          if (value === "AC") {
                    value = "0"; 
          }

          screen.textContent = value;
})
)
