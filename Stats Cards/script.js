
function loadContent() {
    const links = document.querySelectorAll('.nav-link');
    const sliders = document.querySelectorAll('.slide');
    const classesToRemove = ['slide-left', 'slide-right', 'slide-up', 'slide-down', 'scale-up', 'scale-down'];

    const CHART_MAX = 45;
    const CHART_DATA = {
        Current: 12.2,
        All: 34.8,
        Average: 28.7
    }
    
    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }


    // On page load... 
    setTimeout(() => {
        // iterate through the object using array methods to display the bars
        Object.entries(CHART_DATA).map(([key, value], index) => {
            const bar = document.querySelector(`.bar[data-legend="${key}"]`);

            bar.style.setProperty('--bar-height', `${value / CHART_MAX * 100}%`);
            bar.classList.add('grow');
        });

        // remove the transfrom:translate() classes
        sliders.forEach(slider => {
            slider.classList.remove(...classesToRemove);
        })

    }, 1500);


    // Event Listeners
    links.forEach(link => link.addEventListener ('click', handleNavLinkEvent));
}

window.addEventListener('DOMContentLoaded', loadContent);