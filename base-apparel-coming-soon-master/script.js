function loadContent() {
    const links = document.querySelectorAll('a');
    const form = document.querySelector('form');
    const emailEl = document.querySelector('#email');

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    // UTILITY FUNCTIONS
    function isRequired(value) {
        return value === '' ? false : true;
    }

    function isEmailValid (email) {
        const input = document.createElement('input');      
        input.type = 'email';
        // input.required = true;
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
        // error.style.visibility = 'visible';
    }

    function showSuccess (input) {
        // get the form-field element
        const formControl = input.closest('.form-control');
    
        // remove the error class
        formControl.classList.remove('error');
    
        // hide the error message
        const error = formControl.querySelector('small');
        error.textContent = '';
    }

    function checkEmail() {
        let valid = false;
        const email = emailEl.value.trim();

        if (!isRequired(email)) {
            showError(emailEl, 'Email cannot be empty.');
        } else if (!isEmailValid(email)) {
            showError(emailEl, 'Please provide a valid email')
        } else {
            showSuccess(emailEl);
            valid = true;
        }
        return valid;
    }

    // Function to handle event delegation on the form for all inputs
    function handleInputChanges(e) {

        switch (e.target.name) {
            case 'email':
                checkEmail();
                break;
        }
    }

    function handleFormSubmission(e) {
        // prevent the form from submitting
        e.preventDefault();

        // validate forms
        let isEmailValid = checkEmail();

        let isFormValid = isEmailValid;

        // confirm form is valid
        if (isFormValid) {
            form.classList.add('submitted');

            setTimeout(() => {
                form.classList.remove('submitted');
            }, 4000);
        }
    }
    
    // On page load... 
    
    // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
    form.addEventListener('submit', handleFormSubmission);
    form.addEventListener('input', handleInputChanges);
}

window.addEventListener('DOMContentLoaded', loadContent);