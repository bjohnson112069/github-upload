
function loadContent() {
    const links = document.querySelectorAll('a');
    const skips = document.querySelectorAll('#skip');
    const forms = document.querySelectorAll('form');
    const exits = document.querySelectorAll('#exit');
    const submits = document.querySelectorAll('#submit');
    const classesToRemove = ['slide-left', 'slide-right', 'slide-up', 'slide-down', 'scale-up', 'scale-down', 'initial'];
    let currentForm = 1;
    
    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function reInitialize() {
            // clear the forms, reset state and move to first form
            forms.forEach(form => form.reset());
            currentForm = 1;
            goToForm(currentForm);
    }

    function handleExitEvent() {
        const project = document.querySelector('#feedback-forms');
        project.classList.add('scale-down');
        

        setTimeout(() => {
            reInitialize();
            project.classList.remove(...classesToRemove);
        }, 2000);

    }

    function goToForm(number) {
        if (number < 1 || number > forms.length) return;

        const slider = document.querySelector('.forms');
        const form = document.querySelector(`form[data-form="${number}"]`);
        slider.style.left = `${-1 * form.offsetLeft}px`;
    }

    function handleButtonEvent(e) {
        e.preventDefault();

        if (this.matches('#submit')) {
            // do something with the form data
        }

        // increment the current form counter
        currentForm++;

        // move to the next form
        goToForm(currentForm);
    }

    // On page load... 
    goToForm(currentForm);

    // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
    skips.forEach(skip => skip.addEventListener('click', handleButtonEvent));
    submits.forEach(submit => submit.addEventListener('click', handleButtonEvent));
    exits.forEach(exit => exit.addEventListener('click', handleExitEvent));
    window.addEventListener('resize', () => reInitialize());
}

window.addEventListener('DOMContentLoaded', loadContent);