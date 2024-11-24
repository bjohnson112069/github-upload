function loadContent() {
    const banner = document.querySelector('.banner');
    const canvas = document.querySelector('#banner-dots');
    const NUM_DOTS = 50;
    let dots = [];
    const colors = ['#007BFF', '#FF00FF', '#32CD32', '#FFD700', '#FF4500']

    
    // Utility: generate random number between min and max
    function randomNum(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function drawDots() {
        dots.forEach(dot => {
            ctx.fillStyle = dot.color;
            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dot.size, 0, 2 * Math.PI);
            ctx.fill();
        })
    }

    function drawLines(e) {
        // clear the canvas prior to drawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // (re)draw the dots
        drawDots();

        const mouse = {
            x: e.pageX - banner.getBoundingClientRect().left, 
            y: e.pageY - banner.getBoundingClientRect().top
        };

        dots.forEach(dot => {
            // calculate the distance between two points ...
            const distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);

            // draw the line if the dot is less than 300px
            if (distance < 300) {
                ctx.lineWidth = 1;
                ctx.strokeStyle = dot.color;
                ctx.beginPath();
                ctx.moveTo(dot.x, dot.y)
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        })
    }

    // on page load ...

    // setup the canvas
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');

    // gnerate the dots
    for (let i = 0; i < NUM_DOTS; i++) {
        dots.push({
            x: randomNum(0, canvas.width),
            y: randomNum(0, canvas.height),
            size: randomNum(5, 10), // random size between 5 and 10 pixels
            color: colors[randomNum(0, colors.length - 1)]
        });
    }

    // draw the dots
    drawDots();

    // Event Listeners
    banner.addEventListener('mousemove', drawLines);
    banner.addEventListener('mouseleave', () => {
                // clear the canvas prior to drawing
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // (re)draw the dots
                drawDots();
    });
    window.addEventListener('resize', () => {
        window.location.reload();
    });
}

window.addEventListener('DOMContentLoaded', loadContent);