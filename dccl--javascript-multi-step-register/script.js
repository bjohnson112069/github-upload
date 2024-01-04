const form1 = document.querySelector("#form-1");
const form2 = document.querySelector("#form-2");
const form3 = document.querySelector("#form-3");
const buttons = document.querySelectorAll("button[type=button");
const submit = document.querySelector("button[type=submit]");
let user = {
          name: "",
          email: "",
          topics: []
};


// Function to validate Name input
function isName(name) {  
          // Regular Expression (Note: accepts all upper & lower case characters)
          const regexp = /^[a-z ,.'-]+$/i;
            
          // Converting the email to lowercase 
          return regexp.test(String(name).toLowerCase()); 
} 

// Function to valide Email input
function isEmail(email) {  
          // Regular Expression (Note: accepts second @ symbol 
          // before the @gmail.com and accepts everything else) 
          var regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
            
          // Converting the email to lowercase 
          return regexp.test(String(email).toLowerCase()); 
} 

// Function to update the screen to the step number passed as a parameter
function moveToStep(step) {

          // bounds check
          if (step < 1 || step > 3) return;

          // "left" position for each form on each step [step number][form(1-3) position]
          const positions = [
                    ["0%", "100%", "200%"],
                    ["-100%", "0%", "100%"],
                    ["-200%", "-100%", "0%"],
          ];

          // select all forms on the page
          const forms = Array.from(document.querySelectorAll("form"));

          // iterate through each form and set the "left" position on each form
          forms.forEach(form => {
                    // remove active class from all forms
                    form.classList.remove("active");
                    const index = forms.indexOf(form);
                    form.style.left = positions[step - 1][index];
          })

          // make the target (step) form active/visible
          document.querySelector(`[data-step="${step}"]`).classList.add("active");

          // iterate through all circles in the progress bar
          const bar = document.querySelector(".progress-bar");
          const circles = bar.querySelectorAll(".circle");
          circles.forEach(circle => {
                    // clear all classes
                    circle.classList.remove("active");
                    circle.classList.remove("complete");

                    // store the number of the circle
                    const circleNum = parseInt(circle.dataset.number);

                    // mark all previous steps as "complete"; mark current step as "active"
                    if (circleNum < step) circle.classList.add("complete");
                    else if (circleNum === step) circle.classList.add("active");
          })
          // update the psuedo elemnt using the title attribute
          bar.title = `Step ${step} of 3`;
}

// Function to to handle error conditions from <input> element passed as a parameter
function handleInputError(input, error) {
          // ensure parameters are passed in
          if (input === undefined || error === undefined) return;

          // select the ".input-error" sibling
          const errorMsg = input.nextElementSibling;

          if (error) {
                    errorMsg.classList.add("active");
          
                    // put the focus on the offending <input>
                    input.focus();
          } else errorMsg.classList.remove("active");
}

// function to summarize the data on form 3
function summarizeData() {
          const name = form3.querySelector(".user-name");
          const email = form3.querySelector(".user-email");
          const topics = form3.querySelector(".topic-box");

          // update the textContent of the element to display the name
          name.textContent = user.name;

          // update the textContent of the element to display the email                    
          email.textContent = user.email;

          // select the <ul> list element in the ".topics-box"
          let ul = topics.querySelector("ul");
          
          // if the <ul> does not exist then create it; otherwise clear all children (innerHTML = "")
          if (ul === null) {
                    ul = document.createElement('ul');
          } else ul.innerHTML = "";

          // iterate over array of topics and return a listitem (li) for each one; append the children in the <ul> element
          ul.innerHTML = user.topics.map((topic) => {
                    return `<li>${topic}</li>`;
          }).join('');

          // append the <ul> element (and it's new children) to the ".topics-box"
          topics.appendChild(ul);
}

function handleButtonClick(e) {
          // from the <button> that was clicked, store the form's data attribute indicating it's step number
          const currentStep = this.form.dataset.step;
          
          // from the <button> that was clicked, store the data attribute indicating which step number to jump to
          const targetStep = parseInt(this.dataset.toStep);

          // we need a variable to store the state of the form validation
          let formValidated = false;

          // select the <li> topics
          const topics = document.querySelectorAll("input[type=checkbox]");

          // validate form 1 input values when transition from step 1 to step 2
          if (currentStep === "1" && targetStep === 2) {
                    const name = document.querySelector("#name");
                    const email = document.querySelector("#email");

                    // clear any errors
                    handleInputError(name, false);
                    handleInputError(email, false);

                    // validate the input value
                    if (!isName(name.value)) {
                              // throw an error message on the screen
                              handleInputError(name, true);
                              return;
                    }

                    // validate the input value
                    if (!isEmail(email.value)) {
                              // throw an error message on the screen
                              handleInputError(email, true);
                              return;
                    }

                    // store the user information
                    user.name = name.value;
                    user.email = email.value;
          } 

          // all field validated or not further validation required
          formValidated = true;

          
          // store the topics when transitioning from step 1 to step 2
          if (currentStep === "2" && targetStep === 3) {
                    // initialize the topics array
                    user.topics = [];

                    // iterate through each topic, select the <input> and store the value in the array
                    topics.forEach(topic => {
                              topic.checked ? user.topics.push(topic.value) : "";
                    })

                    // Proceed with Summarizing the data on Step 3 
                    summarizeData();

          }


          // TODO: add form validation prior to moving to next step
          // TODO: throw error if form validation fails
          if (formValidated) {
                    moveToStep(targetStep);
          }
}

// function to handle key events on non-button elements for specific steps in the <form>.  Note: Enter on <button> elements trigger a click event so no need to handle this scenario
function handleKeyEvent(e) {
          // if the key is not an "Enter" AND not a "<space>" OR a <button> then exit
          if ((e.key != "Enter" && e.key != " ") || e.target.matches("button")) return; 

          const step = e.target.form.dataset.step;

          // if the Enter key is pressed (for a non-button element) invoke the click() method on the <button> to proceed to the next step
          if (e.key === "Enter") {
                    // select the (next) button on the active step
                    const button = e.target.form.querySelector(".next");
                    
                    // Trigger the button element with a click
                    button.click();          
          }

          // if the <space> key is pressed on Step 2, invoke the click() method on the <label> to select the appropriate <input> checkbox.  By design the <input> element is hidden (visibility:none) which makes it non-clickable via the mouse or the <space> key.
          if (step === "2" & e.key === " ") {
                    e.target.click();
          }
}

function handleSubmit(e) {
          // on form reset, set the Step Number to the initial, default value (e.g. 1)
          const stepNum = 1;
          // select the form
          const form = document.querySelector(`#form-${stepNum}`);

          // throw an alert to confirm form submission
          alert("Form Submitted");

          // reset the form
          form.reset();

          // move the step number (e.g. 1)
          moveToStep(stepNum);
}

buttons.forEach(button => button.addEventListener("click", handleButtonClick));
form1.addEventListener("keydown", handleKeyEvent);
form2.addEventListener("keydown", handleKeyEvent);
form3.addEventListener("submit", handleSubmit);
