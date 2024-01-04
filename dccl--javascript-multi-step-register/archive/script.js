


let stepNumber = 1;
let user = {
          name: "",
          email: "",
          topics: []
};

function isName(name) {  
          // Regular Expression (Note: accepts all upper & lower case characters)
          const regexp = /^[a-z ,.'-]+$/i;
            
          // Converting the email to lowercase 
          return regexp.test(String(name).toLowerCase()); 
} 

function isEmail(email) {  
          // Regular Expression (Note: accepts second @ symbol 
          // before the @gmail.com and accepts everything else) 
          var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
            
          // Converting the email to lowercase 
          return regexp.test(String(email).toLowerCase()); 
} 

function handleClickEvent(e) {
          if (stepNumber < 1 || stepNumber > 3) return;

          const button = parseInt(this.dataset.value);
          
          
          let validated = false;
          
          // if the button value is "1":
                    // validate the input
                    // store the user information
                    // make the current slide inactive
                    // make the next slide active
          if (button === 1) {
                    const name = form.querySelector("#name");
                    const email = form.querySelector("#email")

                    // validate the input value
                    if (!isName(name.value)) {
                              // throw an error message on the screen
                              throwError(name);
                              // add an error class to bring focus to the appropriate input
                              name.classList.add("error");
                              return;
                    } else name.classList.remove("error");

                    // validate the input value
                    if (!isEmail(email.value)) {
                              // throw an error message on the screen
                              throwError(email);
                              // add an error class to bring focus to the appropriate input
                              email.classList.add("error");
                              return;
                    } else email.classList.remove("error");

                    // all input validated
                    validated = true;

                    // store the user information
                    user.name = name.value;
                    user.email = email.value;
          } 

          // if the button value is "2":
                    // no input validation is required
                    // store the topics selected
                    // make the current slide inactive
                    // make the next slide active
                    // update the next slide with a summary of user information (name, email, topics)
          if (stepNumber === 2) {
                    // all input is valide
                    validated = true;

                    // create an arrary from a nodelist
                    const items = Array.from(form.querySelectorAll(".item-input"));

                    // select the <ul> element
                    const topics = document.querySelector(".topic-info");

                    // iterate through each item/topic, store the value, and add the <li> element
                    items.forEach(item => {
                              // create a <blank> <li> element
                              let li = document.createElement('li');
                              if (item.checked) {
                                        // store the topics selected/checked
                                        user.topics.push(item.value);

                                        // add the value to the <li> textContent
                                        li.textContent = item.value;

                                        // append the <li> to the parent <ul> element
                                        topics.appendChild(li);
                              }
                    })

                    // update the textContent of the element to display the name
                    const displayName = form.querySelector(".display-name");
                    displayName.textContent = user.name;

                    // update the textContent of the element to display the email                    
                    const displayEmail = form.querySelector(".display-email");
                    displayEmail.textContent = user.email;
          }


          // if the input is valid:
                    // make the current slide inactive
                    // make the next slide active
          if (validated) {
                    // remove the 'active' class from the prevous slide & tab
                    let step = document.querySelector(`.step[data-value="${stepNumber}"]`);
                    step.classList.remove("active");
                    let tab = document.querySelector(`.tab[data-value="${stepNumber}"]`);
                    tab.classList.remove("active");
                    // add a 'complete' class to keep the tab highlighted
                    tab.classList.add("complete");
          
                    // increment the current step
                    stepNumber++;
          
                    // add the 'active' class from the current slide & tab
                    step = document.querySelector(`.step[data-value="${stepNumber}"]`);
                    step.classList.add("active");
                    tab = document.querySelector(`.tab[data-value="${stepNumber}"]`);
                    tab.classList.add("active");
                    
                    // update the step number in the tab pseudo element (which uses the title attribute)
                    const tabs = document.querySelector(".tabs");
                    tabs.title = `Step ${stepNumber} of 3`;

                    if (stepNumber === 3) {
                              // Enable the <form> submit button
                              submit.disabled=false;

                              // setting the focus immediately after enabling the button cause the form to submit
                              // before redning occured.  Added short delay to allow for rendering then applying
                              // the focus...
                              setTimeout(() => {
                                        submit.focus();
                              }, 100)
                    }
          }
}

function handleSubmitEvent(e) {
          // reinitialize the state of the <form> submit button on reset
          submit.disabled=true;
          alert("Form Submitted")
}

function throwError(input) {
          // display the error message
          alert("The information you entered is invalid");

          // apply focus to the appropriate <input>
          input.focus();
}

// function to handle key events on non-button elements for specific steps in the <form>.  Note: Enter on <button> elements trigger a click event so no need to handle this scenario
function handleKeyEvent(e) {
          // if the key is not an "Enter" AND not a "<space>" OR a <button> then exit
          if ((e.key != "Enter" && e.key != " ") || e.target.matches(".btn")) return; 

console.log ("it got here...")
          // if the Enter key is pressed (for a non-button element) invoke the click() method on the <button> to proceed to the next step
          if (e.key === "Enter") {
                    // select the button on the active step
                    const activeStep = document.querySelector(`.step[data-value="${stepNumber}"]`);
                    const button = activeStep.querySelector(".btn");
                    
                    // Trigger the button element with a click
                    button.click();          
          }

          // if the <space> key is pressed on Step 2, invoke the click() method on the <label> to select the appropriate <input> checkbox.  By design the <input> element is hidden (display:none) which makes it non-clickable via the mouse or the <space> key.
          if (stepNumber === 2 & e.key === " ") {
                    e.target.click();
          }
}

const buttons = document.querySelectorAll("button[type=button]");
buttons.forEach(button => button.addEventListener("click", handleClickEvent));

const form = document.querySelector(".steps");
form.addEventListener("submit", handleSubmitEvent);
form.addEventListener("keydown", handleKeyEvent);


// on page load ...
const submit = form.querySelector(`button[data-value="3"]`)

// disable the form submit button (enabled on final step of form)
submit.disabled=true;