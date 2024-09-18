
async function loadContent() {
    const links = document.querySelectorAll('.nav-link');
    const canvases = document.querySelectorAll('canvas');
    const USER_POINTS = [
        {
            "x": 0,
            "y": 150
        },
        {
            "x": 50,
            "y": 75
        },
        {
            "x": 100,
            "y": 115
        },
        {
            "x": 175,
            "y": 45
        },
        {
            "x": 225,
            "y": 135
        },
        {
            "x": 275,
            "y": 75
        },
        {
            "x": 300,
            "y": 95
        }
    ];    
    
    const NEWUSER_POINTS = [
        {
            "x": 0,
            "y": 150
        },
        {
            "x": 50,
            "y": 125
        },
        {
            "x": 100,
            "y": 65
        },
        {
            "x": 175,
            "y": 115
        },
        {
            "x": 225,
            "y": 75
        },
        {
            "x": 275,
            "y": 125
        },
        {
            "x": 300,
            "y": 85
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

    function handleNavLinkClick() {
        links.forEach(link => link === this ? link.classList.add('active') : link.classList.remove('active'));
    }

    function drawChart(canvas, points) {
        if ( canvas && canvas.getContext('2d') ) {
            console.log(canvas, points)
            // Default: context width/height = 300x150
            const ctx = canvas.getContext('2d');
            ctx.strokeStyle = 'hsl(168, 76%, 42%)';
            ctx.fillStyle = 'hsl(168, 76%, 42%, 10%)';
            ctx.lineWidth = 2;

            // *** CREATE THE CHART FILL ***

            // create the path
            ctx.beginPath();

            // move to the bottom left-hand corner
            ctx.moveTo(0, 150);

            // draw lines between the points (no stroke applied)
            for (let i = 0; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }

            // move to the bottom right-hand corner
            ctx.lineTo(300, 150);
            // fill the path
            ctx.fill();

            // close the path (attempts to add a straight line from the current point to the start of the current sub-path)
            ctx.closePath();

            // *** CREATE THE CHART LINE ***
            
            // create the path
            ctx.beginPath();

            // move to the bottom left-hand corner
            ctx.moveTo(0, 150);

            // draw lines between the points (no stroke applied)
            for (let i = 0; i < points.length; i++) {
                ctx.lineTo(points[i].x, points[i].y);
            }

            // apply a stroke to the path
            ctx.stroke();

            // close the path (attempts to add a straight line from the current point to the start of the current sub-path)
            ctx.closePath();


            // *** CREATE THE CHART CIRCLES ***
            
            ctx.fillStyle = 'hsl(168, 76%, 42%)';
            // create the path
            ctx.beginPath();

            // move to the bottom left-hand corner
            ctx.moveTo(0, 150);

            // draw lines between the points (no stroke applied)
            for (let i = 0; i < points.length; i++) {
                ctx.moveTo(points[i].x, points[i].y);
                ctx.arc(points[i].x, points[i].y, 3, 0, 2 * Math.PI);
                ctx.fill();
            }

            // apply a stroke to the path
            ctx.stroke();

            // close the path (attempts to add a straight line from the current point to the start of the current sub-path)
            ctx.closePath();
        }
    }

    // on page load ...
    canvases.forEach(canvas => {
        canvas.id === 'users' ? drawChart(canvas, USER_POINTS) : drawChart(canvas, NEWUSER_POINTS);
    });

    

    // Event Listeners
    links.forEach(link => link.addEventListener('click', handleNavLinkClick));
}

window.addEventListener('DOMContentLoaded', loadContent);