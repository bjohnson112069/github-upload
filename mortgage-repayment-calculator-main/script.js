
function loadContent() {
    const form = document.querySelector('#user-form');
    const clear = form.querySelector('#clear-all');
    const slider = document.querySelector('.results');

    function handleClearAllEvent(e) {
        e.preventDefault();

        const empty = document.querySelector('#result-empty');

        slider.style.left = `${-1 * empty.offsetLeft}px`;

        form.reset();
    }

    function isRequired(value) {
        return value === '' ? false : true;
    }

    function checkInputValue(input) {
        const value = input.value;
        const control = input.closest('.form-control');
        const valid = isRequired(value);

        !valid ? control.classList.add('error') : control.classList.remove('error');

        return valid;
    }

    function checkInputOptions() {
        const control = form.querySelector('.option').closest('.form-control');
        const options = form.querySelectorAll('.radiobox:checked');
        const valid = options.length === 0 ? false : true;
        
        !valid ? control.classList.add('error') : control.classList.remove('error');
        
        return valid;
    }

    
    // Function to handle event delegation on the form for all inputs
    function handleInputChanges(e) {

        if (e.target.matches(`input[type="number"]`)) {
            checkInputValue(e.target);
        } else {
            // type["radio"]
            checkInputOptions();
        }
    }

    // function to calculate monthly payments and total cost
    // Inputs: price, equity, term (in years), rate (per year)
    function calculateMortgagePayment(price, equity, term, rate) {
        let principal = price - equity;
        const months = term * 12;
        const iRate = (rate / 100 / 12);
        let payment = ( principal * (iRate * Math.pow((1 + iRate), months)) ) / (Math.pow((1 + iRate), months) - 1);
        
        if (iRate === 0) {
            payment = principal / months;
        }
            
        if (principal < 0) {
            principal = 0;
            payment = 0;
        }
        const total = payment * months;
        const interest = total - principal;
                
        return {principal, payment, interest, total}
    }
    
    function formatToLocaleString(number) {
        return number.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    }

    function handleFormSubmission(e) {
        e.preventDefault();

        const amount = form.querySelector('#mortgage-amount');
        const term = form.querySelector('#mortgage-term');
        const rate = form.querySelector('#interest-rate');

        // validate form
        let isAmountValid = checkInputValue(amount),
        isTermValid = checkInputValue(term),
        isRateValid = checkInputValue(rate);
        isOptionValid = checkInputOptions();

        let isFormValid = isAmountValid && 
        isTermValid &&
        isRateValid &&
        isOptionValid;

        // confirm form is valid
        if (isFormValid) {
            // do calculations then move the slider to view the result
            const amountValue = Number(amount.value);
            const equityValue = Number('0');
            const termValue = Number(term.value);
            const rateValue = Number(rate.value);
            const data = calculateMortgagePayment(amountValue, equityValue, termValue, rateValue);

            const type = document.querySelector('.radiobox:checked').value;
            const result = document.querySelector('#result-full');
            const top = result.querySelector('#payment-top');
            const label = top.querySelector('.label');
            let value = top.querySelector('.value');
            
            if (type === 'repayment') {
                label.textContent = 'Your monthly repayments';
                value.textContent = `$${formatToLocaleString(data.payment)}`;
            } else {
                // interest only
                label.textContent = 'Yout total interest';
                value.textContent = `$${formatToLocaleString(data.interest)}`;
            }

            const bottom = result.querySelector('#payment-bottom')
            value = bottom.querySelector('.value');
            value.textContent = `$${formatToLocaleString(data.total)}`;

            slider.style.left = `${-1 * result.offsetLeft}px`;
        }
    }
    // On page load... 

    // Event Listeners
    form.addEventListener('submit', handleFormSubmission);
    form.addEventListener('input', handleInputChanges);
    clear.addEventListener('click', handleClearAllEvent);
    window.addEventListener('resize', handleClearAllEvent);
}

window.addEventListener('DOMContentLoaded', loadContent);