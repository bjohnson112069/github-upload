
function loadContent() {
    const links = document.querySelectorAll('a');
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const skips = document.querySelectorAll('.skip');
    const submits = document.querySelectorAll('.submit');
    const forms = document.querySelector('.forms');
    

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function handleSelectionClick() {
        const value = dropdownBtn.querySelector('.dropdown-value');
        value.textContent = this.textContent;
    }

    function handleButtonClick() {
        dropdownBtn.classList.toggle('active');
    }

    function handleSkipEvent(e) {
        e.preventDefault();

        const form = document.querySelector(`form[data-form="${this.value}"]`);
        forms.style.left = `${-1 * form.offsetLeft}px`;
    }

    function handleFormSubmission(e) {
        e.preventDefault();

        const confirmation = document.querySelector('#confirmation');
        const profile = document.querySelector('#user-profile');

        profile.classList.toggle('scale-down');
        setTimeout(() => {
            // reinit
            forms.style.left = `0px`;
            const items = document.querySelectorAll('form');
            const value = dropdownBtn.querySelector('.dropdown-value');
            items.forEach(item => item.reset());
            value.textContent = '------';
            confirmation.classList.toggle('scale-down');

            setTimeout(() => {
                confirmation.classList.toggle('scale-down');
                setTimeout(() => {
                    profile.classList.toggle('scale-down');
                }, 1500);

            }, 3000);

        }, 1000);
    }
    
    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    dropdownBtn.addEventListener('click', handleButtonClick);
    dropdownItems.forEach(item => item.addEventListener('click', handleSelectionClick));
    skips.forEach(skip => skip.addEventListener('click', handleSkipEvent));
    submits.forEach(submit => submit.addEventListener('click', handleFormSubmission));
}

document.addEventListener('DOMContentLoaded', loadContent);