const htmlElement = document.documentElement;
const slider = document.querySelector(".slider");

// handle slider change event
function handleChangeEvent() {
          // console.log(this.value, "was clicked...");

          // set custom properties in html root element

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
slider.addEventListener("change", handleChangeEvent);

// CITATION: https://www.freecodecamp.org/news/how-to-build-an-html-calculator-app-from-scratch-using-javascript-4454b8714b98/
// Need to refactor in the future ....

function calculate(n1, operator, n2) {
          const firstNum = parseFloat(n1);
          const secondNum = parseFloat(n2);
          if (operator === 'add') return firstNum + secondNum;
          if (operator === 'subtract') return firstNum - secondNum;
          if (operator === 'multiply') return firstNum * secondNum;
          if (operator === 'divide') return firstNum / secondNum;
}

let previousKeyType = "";
let firstValue = 0;
let operator = "";
let modValue = 0;

// handle button click event(s) thru event delegation
function handleButtonClickEvent(e) {
          // if the target is not a button then return
          if (!e.target.matches("button")) return;

          const key = e.target;
          const action = key.dataset.action;
          const keyContent = key.dataset.value;
          const displayedNum = display.textContent;

          // When a key is clicked, the operator key(s) should also release its pressed state.
          const operators = keys.querySelectorAll("[data-type=operator");
          operators.forEach(operator => operator.classList.remove("is-depressed"));

          // *** NUMBER KEY ***
          if (!action) {
                    // if the calculator shows 0 (the default number), the target number should replace zero
                    // If the previousKeyType is an operator, we want to replace the displayed number with clicked number.
                    // if a decimal key or a number key is clicked after the calculate key, the display should be replaced with 0. or the new number
                    if (displayedNum === "0" || previousKeyType === "operator" || previousKeyType === "calculate") {
                              display.textContent = keyContent;

                              // if a decimal key or a number key is clicked after the calculate key, the firstValue should be reinitialized
                              if (previousKeyType === "calculate") {
                                        firstValue = 0;
                              }
                    } else {
                              // If the calculator shows a non-zero number, the target number should be appended to the displayed number.
                              display.textContent = displayedNum + keyContent;

                    }
          }

          // *** OPERATOR KEY ***
          if (action === "add" || action === "subtract" || action === "multiply" || action === "divide") {
                    const secondValue = displayedNum;

                    // If the key sequence is a number, an operator, a number and another operator, in that order, the display should be updated to a calculated value.
                    // Note: use the calculate function when firstValue, operator and secondValue exist.  It's sufficient to check for firstValue and operator because secondValue always exists
                    // To prevent the calculator from performing a calculation on subsequent clicks on the operator key, we need to check if the previousKeyType is an operator. If it is, we don’t perform a calculation.
                    // After the operator key calculates a number, if a number is clicked, followed by another operator, the operator should continue with the calculation
                    // if operator key is clicked right after the equals key, the calculator should not calculate.
                    // if the delete key is clicked after calculate then do not calculate
                    if (firstValue && operator && previousKeyType !== "operator" && previousKeyType !== "calculate" && previousKeyType !== "delete") {
                              const calcValue = calculate(firstValue, operator, secondValue).toString();
                              display.textContent = calcValue;

                              // Update calculated value as firstValue
                              firstValue = calcValue;
                    } else {
                              // To get the first number, we need to store the calculator’s displayed value (as a global variable) before we wipe it clean when the operator button gets clicked.
                              // If there are no calculations, set firstValue as displayedNum
                              firstValue = displayedNum;
                    }

                    // visual indicator an operator key was clicked
                    key.classList.add("is-depressed");

                    // Update global variable to store the type of the previous key (e.g. operator)
                    previousKeyType = key.dataset.type;

                    
                    // To get the operator, store the value in a global variable
                    operator = action;

          }

          // *** DECIMAL KEY ***
          if (action === "decimal") {
                    // A decimal should appear on the display. If any number after hitting a decimal key, the number should be appended on the display as well.
                    // If a decimal key is clicked when the display already shows a decimal point, nothing should happen.
                    // debugger;
                    if (!displayedNum.includes(".") && previousKeyType === "number") {
                              display.textContent = displayedNum + keyContent;
                    } else if (previousKeyType === "operator" || previousKeyType === "calculate") {
                              // If the decimal key is clicked after hitting an operator key, the display should show 0.
                              // if a decimal key or a number key is clicked after the calculator key, the display should be replaced with 0. or the new number
                              display.textContent = "0.";

                              // if a decimal key or a number key is clicked after the calculate key, the firstValue should be reinitialized
                              if (previousKeyType === "calculate") {
                                 firstValue = 0;
                              }

                    }
          }

          // *** DELETE KEY ***
          if (action === "delete") {
                    // The DEL key clears the current entry. It keeps previous numbers in memory.
                    if (previousKeyType !== "calculate") {
                              display.textContent = 0;
                    }
          }

          // *** RESET KEY ***
          if (action === "clear") {
                    // The RESET key clears everything and resets the calculator to its initial state.
                    // To reset the calculator to its initial state, we need to clear all global variables we’ve set.
                    previousKeyType = "";
                    firstValue = 0;
                    operator = "";
                    modValue = 0;

                    // set the displayedNum on screen to initial value
                    display.textContent = 0;
          }

          // *** EQUAL KEY ***
          if (action === "calculate") {
                    let secondValue = displayedNum;
                    
                    // When the equals key is clicked, the calculator should calculate a result that depends on three values: 
                       // The first number entered into the calculator (global variable)
                       // The operator (global variable)
                       // The second number entered into the calculator
                    // After the calculation, the result should replace the displayed value.
                    // nothing should happen if the equals key is clicked before any operator keys.  The operator keys have not been clicked yet if firstValue is not set to a number. 
                    if (firstValue) {
                              // if the equal key is clicked after a calculation is completed, another calculation should be performed again.  
                              if (previousKeyType === 'calculate') {
                                        // Update firstValue to displayedNum
                                        firstValue = displayedNum;
                                        // Update secondValue to modValue attribute
                                        secondValue = modValue;
                              }
                              const calcValue = calculate(firstValue, operator, secondValue).toString();
                              display.textContent = calcValue;
                    }
                    // Set modValue global attribute to secondValue
                    modValue = secondValue;
          }

          // update the state of the previuos key with the pre-defined key type (ref. HTML)
          previousKeyType = key.dataset.type;
}


const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".keypad");
const display = document.querySelector(".screen");

// add event listener to the keypad as all keys are a child of this container; use event delegation to determine which button was clicked.
keys.addEventListener("click", handleButtonClickEvent);