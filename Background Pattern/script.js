
function loadContent() {
    const links = document.querySelectorAll('a');
    const container = document.querySelector('.grid-container');
    const grid = document.querySelector('.grid');
    const boxWidth = 30;
    const dotDensity = 5; // percent

    // Marcin g's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }
    // Utility: generate random number between min and max (base 10)
    function randomNum(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function drawGrid() {
        // calculate # of columns/rows based on the container dimensions
        // round *UP* making the grid width > container width
        const numColumns = Math.ceil(container.offsetWidth / boxWidth);
        const numRows = Math.ceil(container.offsetHeight / boxWidth);

        // clear the grid child elements
        grid.innerHTML = '';

        // set CSS custom properties to size the grid
        grid.style.setProperty('--box-size', `${boxWidth}px`);
        grid.style.setProperty('--num-columns', numColumns);
        grid.style.setProperty('--num-rows', numRows);

        // generate the grid box elements
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numColumns; j++) {
                const div = document.createElement('div');
                div.className = 'box';
                grid.appendChild(div);
            }
        }

        // offset the grid (vertically) within the container
        grid.style.top = `${-1 * boxWidth / 2}px`;

        // generate the dots...
        const boxes = document.querySelectorAll('.box');

        for (let d = 0; d < Math.floor(boxes.length * dotDensity / 100); d++) {
            boxes[randomNum(0, boxes.length - 1)].classList.add('selected');
        }

    }

    // On page load... 
    drawGrid();
    
    // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
    window.addEventListener('resize', (e) => drawGrid());
}

window.addEventListener('DOMContentLoaded', loadContent);