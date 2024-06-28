
function loadContent() {
    const links = document.querySelectorAll('a');
    const chart = document.querySelector('.chart');
    const canvas = document.querySelector('#myCanvas');
    const pts = [
        {
            x: 42.85,
            y: 112.5,
            cx1: 21.425,
            cy1: 140.625,
            cx2: 21.425,
            cy2: 112.5,
        },
        {
            x: 85.71,
            y: 131.25,
            cx1: 53.5625,
            cy1: 112.5,
            cx2: 64.275,
            cy2: 140.625
        },
        {
            x: 128.57,
            y: 28.125,
            cx1: 117.8575,
            cy1: 121.875,
            cx2: 96.4225,
            cy2: 37.5
        },
        {
            x: 171.42,
            y: 46.875,
            cx1: 149.995,
            // cy1: 18.75,
            cy1: 24,
            cx2: 150.7075,
            cy2: 28.125
        },
        {
            x: 214.28,
            y: 70,
            cx1: 182.1325,
            cy1: 56.9125,
            cx2: 203.5675,
            cy2: 67.625
        },
        {
            x: 257.14,
            y: 75,
            cx1: 224.9925,
            cy1: 73,
            cx2: 235.705,
            cy2: 75
        },
        {
            x: 300,
            y: 56.25,
            cx1: 267.8525,
            cy1: 75,
            cx2: 278.565,
            cy2: 70
        }
    ];

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function drawCurve() {
        if ( canvas && canvas.getContext('2d') ) {
            const ctx = canvas.getContext('2d');
            // Default: context width/height = 300x150
    
            // Draw the horizontal grid lines
            ctx.lineWidth = .2;
            ctx.beginPath();
            ctx.strokeStyle = '#A6ADBA';
            ctx.setLineDash([5, 5]);
            ctx.moveTo(0, 150);
            ctx.lineTo(300, 150);
            ctx.moveTo(0, 112.5);
            ctx.lineTo(300, 112.5);
            ctx.moveTo(0, 75);
            ctx.lineTo(300, 75);
            ctx.moveTo(0, 37.5);
            ctx.lineTo(300, 37.5);
            ctx.moveTo(0, 0);
            ctx.lineTo(300, 0);
            ctx.stroke();
            ctx.closePath();

            // draw the bezier curve(s)
            ctx.lineWidth = 2;
            ctx.beginPath();
            const gradient = ctx.createLinearGradient(0, 0, 300, 150);

            // Add three color stops to the gradient
            gradient.addColorStop(0, '#43619F');
            gradient.addColorStop(0.5, '#9562F5');
            gradient.addColorStop(1, '#7161D7');

            ctx.strokeStyle = gradient;
            ctx.fillStyle = '#181F2A';
            ctx.setLineDash([0, 0]);
            ctx.moveTo(0, 150);
            for (let i = 0; i < pts.length; i++) {
                ctx.bezierCurveTo(pts[i].cx1, pts[i].cy1, pts[i].cx2, pts[i].cy2, pts[i].x, pts[i].y);
            }
            ctx.lineTo(300, 150);
            ctx.lineTo(0, 150);
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }    
    }

    // On page load... 
    drawCurve();

    // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
    window.addEventListener('resize', drawCurve);
}

window.addEventListener('DOMContentLoaded', loadContent);