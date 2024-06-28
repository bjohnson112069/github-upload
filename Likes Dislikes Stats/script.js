
function loadContent() {
    const links = document.querySelectorAll('a');
    const yMax = 300;
    const data = {
        Mon: {
            likes: 210,
            dislikes: 160    
        },
        Tue: {
            likes: 190,
            dislikes: 195
        },
        Wed: {
            likes: 250,
            dislikes: 205
        },
        Thu: {
            likes: 215,
            dislikes: 175
        },
        Fri: {
            likes: 280,
            dislikes: 255
        },
        Sat: {
            likes: 235,
            dislikes: 165
        },
        Sun: {
            likes: 140,
            dislikes: 205
        },
    };

    function displayYAxis() {
        const yAxis = document.querySelector('.y-axis');
        const lines = yAxis.querySelectorAll('.line');

        lines.forEach((line, i) => {
            line.style.bottom = `${line.dataset.value / yMax * 100}%`;
        })
    }

    function displayChart() {
        const chart = document.querySelector('.chart');

        Object.entries(data).map(entry => {
            const key = entry[0];
            const value = entry[1];

            const bars = document.createElement('div');
            bars.classList.add('bars');
            bars.setAttribute('data-day', key);
            chart.appendChild(bars);

            const likes = document.createElement('div');
            likes.classList.add('bar', 'likes');
            likes.setAttribute('data-value', value.likes);
            bars.appendChild(likes);

            const dislikes = document.createElement('div');
            dislikes.classList.add('bar', 'dislikes');
            dislikes.setAttribute('data-value', value.dislikes);
            bars.appendChild(dislikes);

            // set a timer to allow for the bar transition (max-height)
            setTimeout(() => {
                likes.style.maxHeight = `${value.likes / yMax * 100}%`;
                dislikes.style.maxHeight = `${value.dislikes / yMax * 100}%`;
            }, 1000);

        });
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
    displayYAxis();
    displayChart();
    
    // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
}

window.addEventListener('DOMContentLoaded', loadContent);