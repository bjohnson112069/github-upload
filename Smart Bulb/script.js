function loadContent() {
    const links = document.querySelectorAll('a');
    const form = document.querySelector('form');
    const slider = document.querySelector('.slider');
    const thumb = document.querySelector('.thumb');
    const toggle = document.querySelector('.switch');
    const section = document.querySelector('#section-bulb');
    let isDrawing = false;

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
        const sections = document.querySelector('.sections');
        console.log(section.offsetLeft)
        sections.style.left = `${-1 * section.offsetLeft}px`;
    }

    function handleSwitchClick() {
        let on = this.value === "true";

        this.value = !on;
        on = !on;

        this.textContent = on ? 'ON' : 'OFF';

        // if button value is true the bulb slider should turn on ...
        slider.classList.toggle('active', on);

        // set the thumb to the lower left-hand corner of the slider
        thumb.style.setProperty("--x", `0px`);
        thumb.style.setProperty("--y", `${slider.offsetHeight}px`);
        // change the brigthness of the background color
        section.style.setProperty("--brightness", `28%`);
        
    }

    /*  https://stackoverflow.com/questions/839899/how-do-i-calculate-a-point-on-a-circle-s-circumference
    * Calculate x and y in circle's circumference
    * @param {Object} input - The input parameters
    * @param {number} input.radius - The circle's radius
    * @param {number} input.angle - The angle in degrees
    * @param {number} input.cx - The circle's origin x
    * @param {number} input.cy - The circle's origin y
    * @returns {Array[number,number]} The calculated x and y
    */
    function pointsOnCircle({ radius, angle, cx, cy }){
        // Convert from Degrees to Radians
        angle = angle * ( Math.PI / 180 ); 
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        return [ x, y ];
    }

    function handleSliderEvent(e) {
        if (!isDrawing) return; 

        const { offsetWidth: width, offsetHeight: height } = this;
        let { offsetX: x, offsetY: y } = e;
        const border = 4;
        const radius = (width - (border * 2)) / 2;

        console.log(e.target);

        // handle chiid elements within the slider container
        if (this !== e.target) {
            x += e.target.offsetLeft;
            y += e.target.offsetTop;
        }

        // Convert from one range to another ...
        
        // old range for slider element
        const OldMin = 0;
        const OldMax = width;
        const OldValue = x <= radius ? (x + border) : (x - border);
        
        // new range for arc angle (180 - 360deg)
        let NewMin = 180;
        let NewMax = 360;
        let NewValue = (((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin;

        // calculate the x,y coordinates along the arc
        const [ arc_x, arc_y ] = pointsOnCircle({ radius: radius, angle: NewValue, cx: radius, cy: radius });
        
        // move the slider thumb to the arc x,y position
        thumb.style.setProperty("--x", `${arc_x}px`);
        thumb.style.setProperty("--y", `${arc_y}px`);

        // new range for brightness (28 - 100%)
        NewMin = 28;
        NewMax = 100;
        NewValue = (((OldValue - OldMin) * (NewMax - NewMin)) / (OldMax - OldMin)) + NewMin;
        
        // change the brigthness of the background color
        section.style.setProperty("--brightness", `${NewValue}%`);
    }

    // on page load ...


    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    form.addEventListener('submit', handleFormSubmission);
    toggle.addEventListener('click', handleSwitchClick);
    slider.addEventListener('mousedown', () => isDrawing = true);
    slider.addEventListener('mouseup', () => isDrawing = false);
    slider.addEventListener('mousemove', handleSliderEvent);
}

window.addEventListener('DOMContentLoaded', loadContent);