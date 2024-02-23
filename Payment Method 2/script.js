const payments = document.querySelectorAll(".payment");
const form = document.querySelector("form");
const submit = form.querySelector("#continue");

function handleCCMouseClick(e) {
          payments.forEach(payment => payment === e.currentTarget ? payment.classList.add("active") : payment.classList.remove("active"));
          e.currentTarget.querySelector("input").checked = true;
}


function handleFormSubmission(event) {
          event.preventDefault();
          // validate();
          form.reportValidity();

          if (form.checkValidity() === false) {
            console.log('Invalid data found');
            // Handle invalid form data.
          } else {
            // On a production site do form submission.
            submit.textContent = 'Making payment...';
            submit.disabled = 'true';
            setTimeout(() => {
                    alert('Made payment!');
                    submit.textContent = 'continue';
                    form.reset();
          }, 500);
          }
}

payments.forEach(payment => payment.addEventListener("click", handleCCMouseClick));
form.addEventListener('submit', handleFormSubmission);  