const credentials = document.querySelectorAll(".credential");
const forms = document.querySelectorAll("form");
const buttons = document.querySelectorAll("button");

function handleInputChangeEvent(e) {
          // Select the placeholder
          const placeholder = this.nextElementSibling;

          // if the input value is not empty then apply the active state to the placeholder
          placeholder.classList.toggle("active", this.value != "" );
          
}

function moveToStep(num) {
          const forms = Array.from(document.querySelectorAll("form"));
          const POSITIONS = [
                    ["0%", "100%"],
                    ["-100%", "0%"]
          ];

          forms.forEach(form => {
                    const index = forms.indexOf(form);
                    form.style.left = POSITIONS[num - 1][index];
          })
}

function resetForms() {
          forms.forEach(form => form.reset())
          moveToStep("1");
}

function handleFormButtonEvents(e) {
          let step;
          const notification = document.querySelector(".notification");
          const message = document.querySelector(".message");
          const login = document.querySelector("#chk");

          if (this.matches("button[type=submit]")) {
                    // console.log("SUBMIT BUTTON CLICKED ...")

                    // validate();
                    this.form.reportValidity();

                    if (this.form.checkValidity() && this.matches("[data-to-step]")) {
                              step = e.target.dataset.toStep;
                              moveToStep(step);
                    }
                    if (this.form.checkValidity() && this.matches("[data-to-login]")) {
                              this.dataset.toLogin = true;
                              message.textContent = "Thank you for signing up with us!";
                              notification.classList.add("active");
                              setTimeout(() => {
                                        notification.classList.remove("active")
                                        resetForms();
                              }, 2500);
                    }
                    if (this.form.checkValidity() && this.matches("[data-login-success]")) {
                              this.dataset.loginSuccess = true;
                              message.textContent = "";
                              const image = document.createElement("img");
                              image.src = "https://github.com/bjohnson112069/web-images/blob/main/User%20Authentication/rick-astly-rick-rolled.gif?raw=true"
                              image.alt = "Rick Rolled";
                              message.appendChild(image)
                              notification.classList.add("active");
                              setTimeout(() => {
                                        notification.classList.remove("active");
                                        login.checked = false;
                                        resetForms();
                              }, 2500);
                    }                    
          }

          if(this.matches(".prev")) {
                    // console.log("PREVIOUS BUTTON CLICKED ...")
                    step = e.target.dataset.toStep;
                    moveToStep(step);
          }

}

function handleFormSubmission(e) {
          e.preventDefault();
}

// Event Listeners ...
credentials.forEach(credential => credential.addEventListener("keyup", handleInputChangeEvent));
buttons.forEach(button => button.addEventListener("click", handleFormButtonEvents));
forms.forEach(form => form.addEventListener("submit", handleFormSubmission));

// On page load ...
resetForms();