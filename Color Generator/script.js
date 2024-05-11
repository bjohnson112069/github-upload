
async function loadContent() {
    const links = document.querySelectorAll('a');
    const colors = document.querySelectorAll('.color');
    const generate = document.querySelector('#generate');

    // Marcin Malecki's thumbnail hack
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

    // Utility: copy str to the clipboard
    const copyToClipboard = (str) => {  
        if (navigator && navigator.clipboard && navigator.clipboard.writeText) {    
            return navigator.clipboard.writeText(str);  
        }  
        return Promise.reject('The Clipboard API is not available.');
    }

    function generateHexColor() {
        // generate a random number between 0 and 255
        // convert to a hexadecimal (base 16) number
        // if the (hex) number is a single digit (0 - F), prepend a leading '0'
        let num = randomNum(0, 255).toString(16).toUpperCase();
        const r = `${num.length === 1 ? '0' : ''}${num}`;

        num = randomNum(0, 255).toString(16).toUpperCase();
        const g = `${num.length === 1 ? '0' : ''}${num}`;

        num = randomNum(0, 255).toString(16).toUpperCase();
        const b = `${num.length === 1 ? '0' : ''}${num}`;

        // return the concatentated values in a string
        return `#${r}${g}${b}`;
    }

    function generateColorPalette() {
        // iterate through the (5) colors
        // generate a (hex) color value
        // update the background color and label 
        colors.forEach(color => {
            const label = color.querySelector('.color-label');
            const bgColor = generateHexColor();
            color.style.backgroundColor = bgColor;
            label.textContent = bgColor;
        })

    }

    function displayNotification(str) {
        const notification = document.querySelector('.notification');
        const msg = notification.querySelector('.color-value');

        msg.textContent = str;
        notification.classList.add('active');

        setTimeout(() => {
            notification.classList.remove('active');    
            msg.textContent = '';
        }, 3000);

    }

    function getColorValue(color) {
        const label = color.querySelector('.color-label');

        return label.textContent;
    }

    function handleKeyDown(e) {
        // exit if the key is not the spacebar (" ") or "C"
        if (e.key != " " && e.key != "C") return;

        if (e.key === " ") generateColorPalette();

        if (e.key === "C") {
            const arr = Array.from(colors);
            const text = arr.map(label => `${getColorValue(label)}, `).join('');

            copyToClipboard(text);
            displayNotification(text);
        }
    }

    function handleColorClick(color) {
        const text = getColorValue(color);

        copyToClipboard(text);
        displayNotification(text);
    }

    // On page load... 
    generateColorPalette();

    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    generate.addEventListener('click', generateColorPalette);
    window.addEventListener('keydown', handleKeyDown);
    colors.forEach(color => color.addEventListener('click', (e) => handleColorClick(e.currentTarget)));
}

window.addEventListener('DOMContentLoaded', loadContent);