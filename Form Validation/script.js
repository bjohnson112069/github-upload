
function loadContent() {
    const links = document.querySelectorAll('a');
    const form = document.querySelector('#form');
    const usernameEl = document.querySelector('#username');
    const emailEl = document.querySelector('#email');
    const passwordEl = document.querySelector('#password');
    const confirmPasswordEl = document.querySelector('#confirm-password');
    
    // UTILITY FUNCTIONS
    function isRequired(value) {
        return value === '' ? false : true;
    }

    function isBetween(length, min, max) {
        return length < min || length > max ? false : true;
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
        const check = formControl.querySelector('.check-icon');
        const exclamation = formControl.querySelector('.exclamation-icon');

        // add the error class
        formControl.classList.remove('success');
        formControl.classList.add('error');

        // display the icon
        exclamation.style.visibility = 'visible';
        check.style.visibility = 'hidden';
    
        // show the error message
        const error = formControl.querySelector('small');
        error.textContent = message;
        error.style.visibility = 'visible';
    };

    function showSuccess (input) {
        // get the form-field element
        const formControl = input.closest('.form-control');
        const check = formControl.querySelector('.check-icon');
        const exclamation = formControl.querySelector('.exclamation-icon');
    
        // remove the error class
        formControl.classList.remove('error');
        formControl.classList.add('success');

        // display the icon
        check.style.visibility = 'visible';
        exclamation.style.visibility = 'hidden';
    
        // hide the error message
        const error = formControl.querySelector('small');
        error.textContent = '';
        error.style.visibility = 'hidden';
    }

    function checkUsername() {
        let valid = false;
        const min = 3,
            max = 25;
        const username = usernameEl.value.trim();
    
        if (!isRequired(username)) {
            showError(usernameEl, 'Username cannot be empty.');
        } else if (!isBetween(username.length, min, max)) {
            showError(usernameEl, `Username must be between ${min} and ${max} characters.`)
        } else {
            showSuccess(usernameEl);
            valid = true;
        }
        return valid;
    }

    function checkEmail() {
        let valid = false;
        const email = emailEl.value.trim();
        if (!isRequired(email)) {
            showError(emailEl, 'Email cannot be empty.');
        } else if (!isEmailValid(email)) {
            showError(emailEl, 'Enter a valid email address')
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
            showError(passwordEl, 'minLength 8 / 1 lower / l upper / 1 number / 1 special');
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
        switch (e.target.id) {
            case 'username':
                checkUsername();
                break;
            case 'email':
                checkEmail();
                break;
            case 'password':
                checkPassword();
                break;
            case 'confirm-password':
                checkConfirmPassword();
                break;
        }
    }

    function handleFormSubmission(e) {
        // prevent the form from submitting
        e.preventDefault();

        // validate forms
        let isUsernameValid = checkUsername(),
            isEmailValid = checkEmail(),
            isPasswordValid = checkPassword(),
            isConfirmPasswordValid = checkConfirmPassword();

        let isFormValid = isUsernameValid &&
            isEmailValid &&
            isPasswordValid &&
            isConfirmPasswordValid;

        // confirm form is valid
        if (isFormValid) {
            alert('Form is valid');
            form.reset();
        }
    }

    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    form.addEventListener('submit', handleFormSubmission);
    form.addEventListener('input', handleInputChanges);

}

document.addEventListener('DOMContentLoaded', loadContent);