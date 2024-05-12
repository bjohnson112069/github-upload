
function loadContent() {
    const links = document.querySelectorAll('a');
    let percent = 0;

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }


    // set a (20ms) interval to display the percentage values on the progress bars/circle
    const interval = setInterval(() => {
        if (percent < 100) {

            // update the progress bar
            const progress = document.querySelector('.progress');
            const value = document.querySelector('.value');

            progress.style.width = `${percent + 1}%`;
            value.textContent = `${percent + 1}%`;          

            percent++;
        } else {
            clearInterval(interval);
        }
    }, 20)

    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
}

document.addEventListener('DOMContentLoaded', loadContent);