
async function loadContent() {
    const links = document.querySelectorAll('a');
    const form = document.querySelector('form');
    const bill = document.querySelector('#bill');
    const people = document.querySelector('#number-of-people');
    const options = document.querySelector('.options');
    const tipAmount = document.querySelector('#tip-amount')
    const totalAmount = document.querySelector('#total-amount')
    const reset = document.querySelector('#reset-form');

    // UTILITY FUNCTIONS
    function isEmpty(value) {
        return value === '' ? true : false;
    }

    function isNumeric(value) {
        return !Number.isNaN(value);
    }

    function isPositive(value) {
        return value > 0;
    }

    function isChecked(name) {
        const selections = document.querySelectorAll(`input[name="${name}"]:checked`);

        return !(selections.length === 0);
    }

    function showError(input, message) {
        // get the form-control element
        const formControl = input.closest('.form-control');

        // add the error class
        formControl.classList.add('error');

        // show the error message
        const error = formControl.querySelector('small');
        error.textContent = message;
    };

    function showSuccess (input) {
        // get the form-field element
        const formControl = input.closest('.form-control');
    
        // remove the error class
        formControl.classList.remove('error');

        // hide the error message
        const error = formControl.querySelector('small');
        error.textContent = '';
    }

    function checkTipPercentages(options, activeEl) {
        const inputs = options.querySelectorAll(`input[name="tip-percentage"]`);
        const custom = options.querySelector('#custom');
        const value = custom.value;
        let msg = 'Please select a tip';
        let returnValue;

        // if a radio box is checked clear the text input
        // if the text input has a value then clear the radio boxes
        if ( activeEl.name === 'tip-percentage' || activeEl.name === 'custom' ) {

            if (activeEl.name === 'tip-percentage' ) {
                // clear the 'custom' input text/value
                custom.select();
                custom.value = '';
            } else {
                // uncheck all radio buttons
                inputs.forEach( input => input.checked = false );

                // define the error message for text input
                msg = 'Number must be over zero';
            }

            // set the focus to the active element
            activeEl.focus();
        }

        // validate to ensure either a radio box is checked or the input has a value
        const isRadioValid = isChecked(inputs[0].name);
        const isNumericValid = isNumeric(value) && !isEmpty(value) && isPositive(value);

        valid = isRadioValid || isNumericValid;

        !valid ? showError(inputs[0], msg) : showSuccess(inputs[0]);

        // send the return value of the selected radio box
        returnValue = valid && isRadioValid ? 
            document.querySelector(`input[name="tip-percentage"]:checked`).value : 
            returnValue;
        // send the return value of the 'custom' text input
        returnValue = valid && isNumericValid ? value : returnValue;

        return ({ valid: valid, value: returnValue });
    }

    // Function to handle event delegation on the form for all inputs
    function checkNumericValue(input) {
        const value = Number(input.value);
        const valid = isNumeric(value) && !isEmpty(value) && isPositive(value);
            
        !valid ? showError(input, 'Number must be over zero') : showSuccess(input);

        return valid;
    }

    // Function to handle event delegation on the form for all inputs
    function handleInputChanges(e) {
        let value = 0;

        // validate forms
        const isBillValid = checkNumericValue(bill);
        const isPeopleValid = checkNumericValue(people);
        const isTipValid = checkTipPercentages(options, e.target);

        const isFormValid = isBillValid && isPeopleValid && isTipValid.valid;

        // set the button disabled status based on form validity
        reset.disabled = !isFormValid;
        
        // if the form is valid calculate the tip and display the results
        if (isFormValid) {
            const billAmount = Number(bill.value);
            const tipPercentage = Number(isTipValid.value) / 100;
            const numberOfPeople = Number(people.value);

            // calculate tip amount
            value = ( billAmount * tipPercentage / numberOfPeople ).toFixed(2);
            tipAmount.textContent = `$${value}`

            // calculate total amount
            value = ( billAmount * ( 1 + tipPercentage) / numberOfPeople ).toFixed(2);
            totalAmount.textContent = `$${value}`
        }
    }

    function handleFormSubmission(e) {
        // prevent the form from submitting
        e.preventDefault();

        // reset the form fields
        form.reset();

        // clear the output amounts
        const amounts = document.querySelectorAll('.amount');
        amounts.forEach(amount => amount.textContent = '$0.00')

        // disable the reset button
        reset.disabled = true;
    }

    
   // On page load... 

   // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
    form.addEventListener('submit', handleFormSubmission);
    form.addEventListener('input', handleInputChanges);
}

window.addEventListener('DOMContentLoaded', loadContent);