
function loadContent() {
    const form = document.querySelector('#signup-form');
    const dismiss = document.querySelector('#dismiss');

    // UTILITY FUNCTIONS
    function isRequired(value) {
        return value === '' ? false : true;
    }

    function isEmailValid (email) {
        const input = document.createElement('input');      
        input.type = 'email';
        input.required = true;
        input.value = email;

        return typeof input.checkValidity === 'function' ? input.checkValidity() : /\S+@\S+\.\S+/.test(email);
    }

    function showError(input, message) {
        // get the form-control element
        const formControl = input.closest('.form-control');

        // add the error class
        formControl.classList.add('error');

        // show the error message
        const error = formControl.querySelector('small');
        error.textContent = message;
        error.style.visibility = 'visible';
    };

    function showSuccess (input) {
        // get the form-field element
        const formControl = input.closest('.form-control');
    
        // remove the error class
        formControl.classList.remove('error');

        // hide the error message
        const error = formControl.querySelector('small');
        error.textContent = '';
        error.style.visibility = 'hidden';
    }

    function checkEmail(input) {
        let valid = false;
        const email = input.value.trim();
        if (!isRequired(email)) {
            showError(input, 'Email cannot be empty.');
        } else if (!isEmailValid(email)) {
            showError(input, 'Valid email required')
        } else {
            showSuccess(input);
            valid = true;
        }
        return valid;
    }

    // Function to handle event delegation on the form for all inputs
    function handleInputChanges(e) {
        switch (e.target.id) {
            case 'email':
                checkEmail(e.target);
                break;
        }
    }

    function handleDismissClick() {
            // display the newsletter signup form
            // hide the success notification
            const newsletter = document.querySelector('#newsletter');
            const notification = document.querySelector('#notification');

            newsletter.classList.remove('inactive');
            notification.classList.remove('active');
    }

    function handleFormSubmission(e) {
        // prevent the form from submitting
        e.preventDefault();

        const emailEl = form.email;

        // validate forms
        let isEmailValid = checkEmail(emailEl);

        let isFormValid = isEmailValid;

        // confirm form is valid
        if (isFormValid) {
            // hide the newsletter signup form
            // reset the newsletter signup form
            // display the success notification
            const newsletter = document.querySelector('#newsletter');
            const notification = document.querySelector('#notification');

            newsletter.classList.add('inactive');
            notification.classList.add('active');
            form.reset();
        }
    }

    // On page load... 

    // Event Listeners
    form.addEventListener('submit', handleFormSubmission);
    form.addEventListener('input', handleInputChanges);
    dismiss.addEventListener('click', handleDismissClick);
}

window.addEventListener('DOMContentLoaded', loadContent);