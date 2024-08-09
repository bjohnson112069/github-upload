
function loadContent() {
    const links = document.querySelectorAll('a');
    const form = document.querySelector('#contact-form');
    const firstnameEl = document.querySelector('#first-name');
    const lastnameEl = document.querySelector('#last-name');
    const emailEl = document.querySelector('#email');
    const passwordEl = document.querySelector('#password');
    const confirmPasswordEl = document.querySelector('#confirm-password');
    const messageEl = document.querySelector('#message');
    const confirmation = document.querySelector('.confirmation');

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
        input.required = true;
        input.value = email;

        return typeof input.checkValidity === 'function' ? input.checkValidity() : /\S+@\S+\.\S+/.test(email);
    }

    function isPasswordSecure(password) {
        const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        return regex.test(password);
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
    };

    function showSuccess (input) {
        // get the form-field element
        const formControl = input.closest('.form-control');
    
        // remove the error class
        formControl.classList.remove('error');

    
        // hide the error message
        const error = formControl.querySelector('small');
        error.textContent = '';
        // error.style.visibility = 'hidden';
    }

    function checkUsername(el) {
        let valid = false;
        const name = el.value.trim();
    
        if (!isRequired(name)) {
            showError(el, 'This field is required.');
        } else {
            showSuccess(el);
            valid = true;
        }
        return valid;
    }

    function checkQueryTypes() {
        const inputs = document.querySelectorAll(`input[name="query-type"]`);
        const selections = document.querySelectorAll(`input[name="query-type"]:checked`);

        const valid = selections.length === 0 ? false : true;

        !valid ? showError(inputs[0], 'Please select a query type') : showSuccess(inputs[0]);
        
        return valid;
    }

    function checkConsent() {
        const inputs = document.querySelectorAll(`input[name="consent"]`);
        const selections = document.querySelectorAll(`input[name="consent"]:checked`);

        const valid = selections.length === 0 ? false : true;

        !valid ? showError(inputs[0], 'To submit this form, please consent to being contacted') : showSuccess(inputs[0]);
        
        return valid;
    }

    function checkEmail() {
        let valid = false;
        const email = emailEl.value.trim();
        if (!isRequired(email)) {
            showError(emailEl, 'Email cannot be empty.');
        } else if (!isEmailValid(email)) {
            showError(emailEl, 'Please enter a valid email address')
        } else {
            showSuccess(emailEl);
            valid = true;
        }
        return valid;
    }

    function checkPassword() {

        let valid = false;
    
        const password = passwordEl.value.trim();
    
        if (!isRequired(password)) {
            showError(passwordEl, 'Password cannot be empty.');
        } else if (!isPasswordSecure(password)) {
            showError(passwordEl, 'min 8 / 1 lower / l upper / 1 number / 1 special');
        } else {
            showSuccess(passwordEl);
            valid = true;
        }
    
        return valid;
    };

    function checkConfirmPassword() {
        let valid = false;
        // check confirm password
        const confirmPassword = confirmPasswordEl.value.trim();
        const password = passwordEl.value.trim();
    
        if (!isRequired(confirmPassword)) {
            showError(confirmPasswordEl, 'Password cannot be empty.');
        } else if (password !== confirmPassword) {
            showError(confirmPasswordEl, 'Passwords don’t match');
        } else {
            showSuccess(confirmPasswordEl);
            valid = true;
        }
    
        return valid;
    };

    // Function to handle event delegation on the form for all inputs
    function handleInputChanges(e) {

        switch (e.target.name) {
            case 'first-name':
                checkUsername(firstnameEl);
                break;
            case 'last-name':
                checkUsername(lastnameEl);
                break;
            case 'email':
                checkEmail();
                break;
            case 'query-type':
                checkQueryTypes();
                break;
            case 'consent':
                checkConsent();
                break;
            case 'password':
                checkPassword();
                break;
            case 'confirm-password':
                checkConfirmPassword();
                break;
            case 'message':
                checkUsername(messageEl);
                break;
            }
    }

    function handleFormSubmission(e) {
        // prevent the form from submitting
        e.preventDefault();

        // validate forms
        let isFirstnameValid = checkUsername(firstnameEl),
            isLastnameValid = checkUsername(lastnameEl),
            isEmailValid = checkEmail(),
            isQueryValid = checkQueryTypes(),
            isMessageValid = checkUsername(messageEl)
            isConsentValid = checkConsent();

        let isFormValid = isFirstnameValid && 
            isLastnameValid &&
            isEmailValid &&
            isQueryValid && 
            isMessageValid && 
            isConsentValid;

        // confirm form is valid
        if (isFormValid) {
            const submit = document.querySelector('#submit');

            confirmation.classList.toggle('active');
            setTimeout(() => {
                confirmation.classList.toggle('active');
                form.reset();
                submit.focus();    
            }, 5000);
        }
    }

    
   // On page load... 

   // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
    form.addEventListener('submit', handleFormSubmission);
    form.addEventListener('input', handleInputChanges);
}

window.addEventListener('DOMContentLoaded', loadContent);