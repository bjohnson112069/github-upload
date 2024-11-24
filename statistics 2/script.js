function loadContent() {
    const links = document.querySelectorAll('a');
    const canvas = document.querySelector('#revenue-chart');
    const CURRENT_POINTS = [
        {
            x: 50,
            y: 103.125,
            cx1: 12.5,
            cy1: 99.75,
            cx2: 37.5,
            cy2: 96.75
        },
        {
            x: 100,
            y: 112.5,
            cx1: 62.5,
            cy1: 110.5,
            cx2: 87.5,
            cy2: 115.5
        },
        {
            x: 150,
            y: 65.625,
            cx1: 127.5,
            cy1: 112.5,
            cx2: 137.5,
            cy2: 99
        },
        {
            x: 200,
            y: 24.125,
            cx1: 162.5,
            cy1: 28.75,
            cx2: 187.5,
            cy2: 24.125
        },
        {
            x: 250,
            y: 46.875,
            cx1: 225,
            cy1: 24.125,
            cx2: 235.5,
            cy2: 36.125
        },
        {
            x: 300,
            y: 75,
            cx1: 262.5,
            cy1: 56.25,
            cx2: 287.5,
            cy2: 77
        }
    ];

    const PREVIOUS_POINTS = [
        {
            x: 50,
            y: 18.75,
            cx1: 25,
            cy1: 56.25,
            cx2: 12.5,
            cy2: 28.125
        },
        {
            x: 100,
            y: 75,
            cx1: 70.5,
            cy1: 25.75,
            cx2: 65,
            cy2: 93.75
        },
        {
            x: 150,
            y: 37.5,
            cx1: 112.5,
            cy1: 37.5,
            cx2: 120.5,
            cy2: 18.75
        },
        {
            x: 200,
            y: 140.625,
            cx1: 156.125,
            cy1: 37.5,
            cx2: 162.5,
            cy2: 138.625
        },
        {
            x: 250,
            y: 75,
            cx1: 212.5,
            cy1: 138.625,
            cx2: 237.5,
            cy2: 112.5
        },
        {
            x: 300,
            y: 56.25,
            cx1: 262.5,
            cy1: 56.25,
            cx2: 287.5,
            cy2: 46.875
        },
    ];

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function drawRevenueChart() {
        if ( canvas && canvas.getContext('2d') ) {
            // Default: context width/height = 300x150
            const ctx = canvas.getContext('2d');

            // *** CREATE THE CURRENT WEEK CHART LINE ***
            ctx.strokeStyle = 'hsl(0, 0%, 17%)';
            ctx.shadowColor = 'hsl(0, 0%, 0%, 50%)';
            ctx.shadowBlur = 5;
            ctx.lineWidth = 1;
            
            // create the path
            ctx.beginPath();

            // move to the bottom left-hand corner
            ctx.moveTo(0, 125);

            // draw lines between the points (no stroke applied)
            for (let i = 0; i < CURRENT_POINTS.length; i++) {
                // ctx.lineTo(CURRENT_POINTS[i].x, CURRENT_POINTS[i].y);
                ctx.bezierCurveTo(CURRENT_POINTS[i].cx1, CURRENT_POINTS[i].cy1, CURRENT_POINTS[i].cx2, CURRENT_POINTS[i].cy2, CURRENT_POINTS[i].x, CURRENT_POINTS[i].y);
            }

            // apply a stroke to the path
            ctx.stroke();

            // close the path (attempts to add a straight line from the current point to the start of the current sub-path)
            ctx.closePath();

            
            // *** CREATE THE PREVIOUS WEEK CHART LINE ***
            ctx.strokeStyle = 'hsl(0, 0%, 50%)';
            ctx.shadowColor = 'hsl(0, 0%, 0%, 0%)';
            ctx.setLineDash([5, 5]);

            // create the path
            ctx.beginPath();

            // move to the bottom left-hand corner
            ctx.moveTo(0, 65.625);

            // draw lines between the points (no stroke applied)
            for (let i = 0; i < CURRENT_POINTS.length; i++) {
                ctx.bezierCurveTo(PREVIOUS_POINTS[i].cx1, PREVIOUS_POINTS[i].cy1, PREVIOUS_POINTS[i].cx2, PREVIOUS_POINTS[i].cy2, PREVIOUS_POINTS[i].x, PREVIOUS_POINTS[i].y);
                // ctx.lineTo(PREVIOUS_POINTS[i].x, PREVIOUS_POINTS[i].y);
            }

            // apply a stroke to the path
            ctx.stroke();

            // close the path (attempts to add a straight line from the current point to the start of the current sub-path)
            ctx.closePath();


        }
    }

    // on page load ...
    drawRevenueChart();

    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
}

window.addEventListener('DOMContentLoaded', loadContent);