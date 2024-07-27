
function loadContent() {
    const links = document.querySelectorAll('a');
    const chart = document.querySelector('.pie-chart');
    const data = {
        completed: 167,
        overdue: 24,
        inprogress: 123
    };
    
    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }


    // On page load... 
    
    // iterate through the object using array methods to calculate the total
    // Object.entries() returns an array of key-value pairs
    // which is used as the 'currentValue' in the .reduce() array method
    const TOTAL = Object.entries(data).reduce((acc, [key, value]) => acc + value, 0);

    // iterate through the object and create the SVG element(s)
    const outerRadius = 50; // needs to match SVG in HTML
    const innerRadius = 25; // needs to match SVG in HTML; ideally outer * 0.5
    const outerDiameter = outerRadius * 2;
    const innerDiameter = innerRadius * 2;
    const outerCircumference = 2 * Math.PI * outerRadius;
    const innerCircumference = 2 * Math.PI * innerRadius;

    const svgEl = chart.querySelector('svg');
    svgEl.style.setProperty('--outer-radius', `${outerRadius}`);
    svgEl.style.setProperty('--inner-radius', `${innerRadius}`);
    svgEl.style.setProperty('--outer-circumference', `${outerCircumference}`);
    svgEl.style.setProperty('--inner-circumference', `${outerCircumference}`);

    let angle = 0;
    Object.entries(data).forEach(([key, value], index) => {
        const slice = document.querySelector(`#${key}`);
        const sliceFraction = value / TOTAL;
        const circleFraction = sliceFraction * innerCircumference;

        // console.log({slice, sliceFraction, circleFraction, innerCircumference, angle})

        slice.style.setProperty('--angle', `${angle}turn`);
        angle += sliceFraction;
        svgEl.style.setProperty(`--${key}-percentage`, `${circleFraction}`);
    });

    // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
}

window.addEventListener('DOMContentLoaded', loadContent);