
function loadContent() {
    const links = document.querySelectorAll('a');
    const buttons = document.querySelectorAll('button');
    const menu = document.querySelector('.menu');
    const options = document.querySelectorAll('.options-btn');
    const radios = document.querySelectorAll('input[type="radio"]');
    const modal = document.querySelector('.modal');

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function toggleModal() {
        const modal = document.querySelector('.modal');

        modal.classList.toggle('active');
    }
    
    function displayOptions() {
        // store the value of the button as a data attribute on the modal
        modal.dataset.button = this.value;

        radios.forEach(radio => {
            radio.checked = false;
        });
        toggleModal();
    }

    function handleSelection() {
        // use the data attributon on the modal to find the calling button
        const button = document.querySelector(`button[value="${modal.dataset.button}"]`);
        const selection = button.querySelector('.selection');

        selection.textContent = this.value;
    }


    
    // On page load... 

    // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
    buttons.forEach(button => button.addEventListener ('click', (e) => e.preventDefault()));
    menu.addEventListener('click', toggleModal);
    options.forEach(option => option.addEventListener ('click', displayOptions));
    radios.forEach(radio => radio.addEventListener ('click', handleSelection));
}

window.addEventListener('DOMContentLoaded', loadContent);