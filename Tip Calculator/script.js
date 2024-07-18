
function loadContent() {
    const calculate = document.querySelector('#calculate-tip-btn');
    
    function displayPayment(tip, total) {
        const tipAmount = document.querySelector('#tip-amount');
        const totalAmount = document.querySelector('#total-amount');

        tipAmount.textContent = `$${tip.toFixed(2)}`;
        totalAmount.textContent = `$${total.toFixed(2)}`;
    }

    function calculatePayment() {
        const billAmount = parseFloat(document.querySelector('#bill-amount').value);
        const tipPercentage = parseFloat(document.querySelector('#tip-percentage').value);
        const tip = billAmount * (tipPercentage / 100);
        const total = billAmount + tip;

        displayPayment(tip, total);
    }

    // On page load... 
    displayPayment(0, 0);

    // Event Listeners
    calculate.addEventListener('click', calculatePayment);
}

window.addEventListener('DOMContentLoaded', loadContent);