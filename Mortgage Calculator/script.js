
function loadContent() {
    const links = document.querySelectorAll('a');
    const inputs = document.querySelectorAll('input[type=range]');
    const form = document.querySelector('form');

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    // function to calculate monthly payments and total cost
    // Inputs: price, equity, term (in years), rate (per year)
    function calculateMortgagePayment(price, equity, term, rate) {
        let amount = price - equity;
        const months = term * 12;
        const iRate = (rate / 100 / 12);
        let payment = ((amount * iRate) * Math.pow((1 + iRate), months)) / (Math.pow((1 + iRate), months) - 1);
        
        if (iRate === 0) {
            payment = amount / months;
        }
            
        if (amount < 0) {
            amount = 0;
            payment = 0;
        }
        const total = payment * months;
                
        return {amount, payment, total}
    }

    function displayInputValue(input) {
        const label = document.querySelector(`label[for="${input.id}"]`);
        const value = label.querySelector('.value');

        label.matches('label[for="interest-rate"]') ? 
            value.textContent = `${parseFloat(input.value).toFixed(3)}` :
            value.textContent = `${parseFloat(input.value).toLocaleString()}`;
    }

    function displayTotalValues(amount, payment, total) {
        const loanAmount = document.querySelector('#loan-amount');
        const monthlyPayment = document.querySelector('#monthly-payment');
        const totalCost = document.querySelector('#total-cost');
        let value = '';

        // loan amount
        value = loanAmount.querySelector('.value');
        value.textContent = `${amount.toFixed(2)}`

        // monthly payment
        value = monthlyPayment.querySelector('.value');
        value.textContent = `${payment.toFixed(2)}`

        // total cost
        value = totalCost.querySelector('.value');
        value.textContent = `${total.toFixed(2)}`
    }

    function updateMortgatePaymentInfo() {
        // input selectors
        const purchasePrice = document.querySelector('#purchase-price').value;
        const equity = document.querySelector('#equity').value;
        const repaymentTerm = document.querySelector('#repayment-term').value;
        const interestRate = document.querySelector('#interest-rate').value;
    
        // calculate the mortgate results and store in an object
        const result = calculateMortgagePayment(purchasePrice, equity, repaymentTerm, interestRate);

        // display the results of the calculation
        displayTotalValues(result.amount, result.payment, result.total)
    }

    function handleInputEvent() {
        // update the input value for (this) input
        displayInputValue(this);

        // update the mortgate payment info based on the initial values
        updateMortgatePaymentInfo();
    }

    function handleFormSubmission(e) {
        e.preventDefault();

        alert("Thank you.  An agent will contact you within the next 24 hours")

        form.reset();
    }

    // On page load... 
    // iterate through all the inputs and siplay their initial value
    inputs.forEach(input => displayInputValue(input));

    // update the mortgate payment info based on the initial values
    updateMortgatePaymentInfo();


    // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
    inputs.forEach(input => input.addEventListener('input', handleInputEvent));
    form.addEventListener('submit', handleFormSubmission);
}

window.addEventListener('DOMContentLoaded', loadContent);