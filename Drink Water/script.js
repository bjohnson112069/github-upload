
function loadContent() {
    const links = document.querySelectorAll('a');
    const days = document.querySelectorAll('.day');
    const drink = document.querySelector('#drink');
    let selection = 'sunday'; // default
    const MIN = 0;
    const MAX = 2;
    const data = {
        sunday: {
            volume: 1
        },
        monday: {
            volume: 1.2
        },
        tuesday: {
            volume: 1.5
        },
        wednesday: {
            volume: 2
        },
        thursday: {
            volume: 1.8
        },
        friday: {
            volume: .8
        },
        saturday: {
            volume: 0
        }
    }

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function handleDayClick() {
        const label = document.querySelector('.day-label');

        // make the current target active
        days.forEach(day => day === this ? 
            day.classList.add('selected') : 
            day.classList.remove('selected'));

        label.textContent = this.value;
        selection = this.value;

        updateBottleProgress(selection);
    }

    function updateBottleProgress(selection) {
        const fill = document.querySelector('.fill-line');
        const volume = document.querySelector('.volume');
        const percentage = data[selection].volume / MAX * 100;

        fill.style.setProperty('--fill-percentage', `${percentage}%`);
        volume.textContent = data[selection].volume;
    }

    function updateButtonProgress(button) {
        const percentage = data[button.value].volume / MAX * 100;
        const progress = button.querySelector('.progress-circle');

        progress.style.maxWidth = `${percentage}%`;
    }

    function handleDrinkWaterEvent() {
        // increment the total volume (0.1 increments)
        data[selection].volume = parseFloat((data[selection].volume + .1).toFixed(1));

        // ensure the value is within bounds (MIN/MAX)
        data[selection].volume = data[selection].volume < MIN ? MIN : data[selection].volume;
        data[selection].volume = data[selection].volume > MAX ? MAX : data[selection].volume;

        // update the progress of the button and bottle
        const button = document.querySelector(`.day[value="${selection}"]`);
        updateButtonProgress(button);
        updateBottleProgress(selection);
    }

    // On page load... 
    days.forEach(day => updateButtonProgress(day));
    updateBottleProgress(selection);

    // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
    days.forEach(day => day.addEventListener('click', handleDayClick));
    drink.addEventListener('click', handleDrinkWaterEvent);
}

window.addEventListener('DOMContentLoaded', loadContent);