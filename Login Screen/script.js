const container = document.querySelector(".content-container");
const form = document.querySelector(".panel-two");
const linkedIn = document.querySelector(".btn-linkedin");
const success = document.querySelector(".success");

// Function to validate the email
function isValidEmail(inputText)
{
          // Regex to check valid Email Address
          const regex = /[^\s@]+@[^\s@]+\.[^\s@]+/gi;

          return regex.test(inputText.value);
}

// Function to validate the password
function isValidPassword(inputText)
{
          return inputText.value != "";
}
function handleSubmitEvent(e) {
          e.preventDefault();
          
          let error = this.email.previousElementSibling.querySelector(".error");

          const validEmail = isValidEmail(this.email);
          error.textContent = "invalid email";
          error.classList.toggle("active", !validEmail);
          
          const validPassword = isValidPassword(this.password);
          error = this.password.previousElementSibling.querySelector(".error");
          error.textContent = "invalid password";
          error.classList.toggle("active", !validPassword);

          if (validEmail && validPassword) {
                    this.reset();
                    container.style.display = "none";
                    success.style.display = "block";
          }
}

function handleCloseEvent() {
          container.style.display = "none";
          setTimeout( () => {
                    container.style.display = "grid";
          }, 1500);
}

form.addEventListener("submit", handleSubmitEvent);
linkedIn.addEventListener("click", handleCloseEvent);
