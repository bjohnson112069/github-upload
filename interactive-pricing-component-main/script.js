function loadContent() {
    // Configuration parameters
    const billing = document.querySelector('#billing');
    const views = document.querySelector('#page-views');
    const pages = document.querySelector('.num-pages');
    const price = document.querySelector('.price');
    const frequency = document.querySelector('.frequency');
    const MONTHLY_COST = 0.00016;

    function updatePricingInformation() {
        price.textContent = `$${billing.value === 'monthly' ? 
            (views.value * MONTHLY_COST).toFixed(2) : 
            (views.value * MONTHLY_COST * 12).toFixed(2)}`;
        frequency.textContent = billing.value === 'monthly' ? 'month' : 'year';
    }

    function handleBillingFrequencyChange() {
        // toggle the billing frequency
        this.value = this.value === 'monthly' ? 'yearly' : 'monthly';

        // Update the current price
        updatePricingInformation();
    }

    function handleInputRangeEvent() {
        // update the custom properity defining the width of the linear gradient on the range input
        const progress = views.value / views.max * 100;
        views.style.setProperty('--progress-width', `${progress.toFixed(2)}%`);

        // Update the pageviews count
        pages.textContent = `${views.value / 1000}K`;

        // Update the current price
        updatePricingInformation();
    }

    // On page load... 
    handleInputRangeEvent();

    // Event Listeners
    views.addEventListener('input', handleInputRangeEvent);
    billing.addEventListener('change', handleBillingFrequencyChange);
}

window.addEventListener('DOMContentLoaded', loadContent);