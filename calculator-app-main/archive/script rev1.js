const htmlElement = document.documentElement;
const radioButtons = document.querySelectorAll(".radio");
const slider = document.querySelector(".slider");

function handleClickEvent() {
          // console.log(this.value, "was clicked...");

          htmlElement.style.setProperty("--clr-main--bg", `var(--theme-${this.value}-main--bg)`);
          htmlElement.style.setProperty("--clr-toggle--bg", `var(--theme-${this.value}-toggle--bg)`);
          htmlElement.style.setProperty("--clr-keypad--bg", `var(--theme-${this.value}-keypad--bg)`);
          htmlElement.style.setProperty("--clr-screen--bg", `var(--theme-${this.value}-screen--bg)`);

          htmlElement.style.setProperty("--clr-key--input--bg", `var(--theme-${this.value}-key--input--bg)`);
          htmlElement.style.setProperty("--clr-key--input--shadow", `var(--theme-${this.value}-key--input--shadow)`);
          htmlElement.style.setProperty("--clr-key--input--hover", `var(--theme-${this.value}-key--input--hover)`);
          htmlElement.style.setProperty("--clr-key--control--bg", `var(--theme-${this.value}-key--control--bg)`);
          htmlElement.style.setProperty("--clr-key--control--shadow", `var(--theme-${this.value}-key--control--shadow)`);
          htmlElement.style.setProperty("--clr-key--control--hover", `var(--theme-${this.value}-key--control--hover)`);
          htmlElement.style.setProperty("--clr-key--action--bg", `var(--theme-${this.value}-key--action--bg)`);
          htmlElement.style.setProperty("--clr-key--action--shadow", `var(--theme-${this.value}-key--action--shadow)`);
          htmlElement.style.setProperty("--clr-key--action--hover", `var(--theme-${this.value}-key--action--hover)`);

          htmlElement.style.setProperty("--clr-screen--text", `var(--theme-${this.value}-screen--text)`);
          htmlElement.style.setProperty("--clr-key--control--text", `var(--theme-${this.value}-key--control--text)`);
          htmlElement.style.setProperty("--clr-key--action--text", `var(--theme-${this.value}-key--action--text)`);
          htmlElement.style.setProperty("--clr-label--text", `var(--theme-${this.value}-label--text)`);
          htmlElement.style.setProperty("--clr-key--input--text", `var(--theme-${this.value}-key--input--text)`);
}
radioButtons.forEach(button => button.addEventListener("click", handleClickEvent));
slider.addEventListener("change", handleClickEvent);

let operands = [];
let buffer = "";
let total = 0;

function displayValueOnScreen(value) {
          const screen = document.querySelector(".screen");
          screen.textContent = value;
          
}


function handleButtonClick() {
          // name: input, operator, control, total
          switch (this.name) {
                    // input: 0 - 9, .
                    case "input": {
                              // add the value (string) to the buffer
                              buffer += this.dataset.value;
                              // update contents of screen
                              displayValueOnScreen(buffer);
                              break;
                    }
                    // symbol: + - * /
                    case "operator": {
                              if (buffer === "") buffer="0";
                              // take contents of buffer and store as an operand
                              operands.push(parseFloat(buffer));
                              
                              // store operator in array
                              operands.push(this.dataset.value);
                              
                              // clear the buffer but do not reinitialize; wait for more input; do not display
                              buffer = "";
                              break;
                    }
                    // control: RESET, DEL
                    case "control": {
                              switch (this.dataset.value) {
                                        case "reset":
                                                  // reinitialize buffer, total, and operands array
                                                  buffer = "";
                                                  total = 0;
                                                  operands = [];

                                                  // display total
                                                  displayValueOnScreen(total);
                                                  break;
                                        case "del":
                                                  // conver string to array
                                                  const arr = buffer.split("");

                                                  // remove last element in the array
                                                  arr.pop();

                                                  // convert array to string; if buffer is empty set to "0"
                                                  buffer = (arr.length != 0) ? arr.join("") : "0";

                                                  // display buffer
                                                  displayValueOnScreen(buffer);
                                                  break;
                                        default:
                                                  console.error("Control value not found ...");
                                                  break;
                              
                              }
                              break;
                    }
                    // total: =
                    case "total": {
                              let error = false;
                              // take contents of buffer and store as an operand
                              (buffer === "") ? operands.push(parseFloat("0")) : operands.push(parseFloat(buffer));

                              // array length should be 3 (operand, operator, operand)
                              if (operands.length < 3) return;

                              // opeator: + - * /
                              switch (operands[1]) {
                                        case "+":
                                                  total = operands[0] + operands[2];
                                                  break;
                                        case "-":
                                                  total = operands[0] - operands[2];
                                                  break;
                                        case "*":
                                                  total = operands[0] * operands[2];
                                                  break;
                                        case "/":
                                                  if ( (operands[0] === 0 && operands[2] === 0) ||
                                                  (operands[2] === 0) ) {
                                                            error = true;
                                                            alert("cannot divide by zero or undefined result")
                                                  }

                                                  total = (error) ? 0 : operands[0] / operands[2];
                                                  // total = operands[0] / operands[2];
                                                  break;
                                        default:
                                                  console.error("Operator not defined ...");
                                                  break;
                              }

                              // display total
                              displayValueOnScreen(total.toString());

                              // reinitialize buffer to the total; next operator will push contents of buffer
                              buffer = total.toString();

                              // reinitialize the operands array
                              operands = [];
                    break;
                    }
                    // no match; error condition
                    default:
                              console.error("Name not found ...");
                              break;
          }

}

const buttons = document.querySelectorAll(".key");
buttons.forEach(button => button.addEventListener("click", handleButtonClick));

// On page load ...
displayValueOnScreen(total.toString());
