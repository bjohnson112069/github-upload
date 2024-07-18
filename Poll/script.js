
function loadContent() {
    const links = document.querySelectorAll('a');
    const form = document.querySelector('#survey');
    const classesToRemove = ['slide-left', 'slide-right', 'slide-up', 'slide-down', 'scale-up', 'scale-down'];
    const results = {
        1: 64,
        2: 12,
        3: 23
    }

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function handleFormSubmission(e) {
        e.preventDefault();

        const choice = document.querySelector('.radiobox:checked').value;

        if (choice in results) {
            results[choice]++;

            // iterate through the object using array methods to calculate the total
            const total = Object.entries(results).reduce((acc, [key, value]) => {
                // Object.entries() returns an array of key-value pairs
                // which is used as the 'currentValue' in the .reduce() array method
                return acc + value;
            }, 0);

            // iterate through the object using array methods to display the choices
            Object.entries(results).map(([key, value], index) => {
                const input = document.querySelector(`.radiobox[value="${key}"]`);
                const option = input.parentElement;
                const progressBar = option.querySelector('.progress-bar');
                const percentage = option.querySelector('.value');
                const progress = progressBar.querySelector('.progress');
                const valPercentage = ( (value / total) * 100 ).toFixed(2);

                // update the content and display on screen
                progressBar.classList.add('visible');
                progress.style.maxWidth = `${valPercentage}%`;
                percentage.textContent = `${valPercentage}%`;
                percentage.classList.add('visible');
            });
        }

        form.reset();
    }

    // On page load... 

    
    // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
    form.addEventListener('submit', handleFormSubmission);
}

window.addEventListener('DOMContentLoaded', loadContent);