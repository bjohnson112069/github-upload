
function loadContent() {
    const links = document.querySelectorAll('a');
    const yMax = 200000;
    const months = {
        Jul: {
            us: 95000,
            canada: 145000,
            australia: 170000,
            china: 180000
        },
        Aug: {
            us: 35000,
            canada: 105000,
            australia: 115000,
            china: 155000
        },
        Sep: {
            us: 110000,
            canada: 160000,
            australia: 170000,
            china: 200000
        },
        Oct: {
            us: 60000,
            canada: 70000,
            australia: 80000,
            china: 85000
        },
        Nov: {
            us: 75000,
            canada: 105000,
            australia: 140000,
            china: 145000
        },
        Dec: {
            us: 110000,
            canada: 140000,
            australia: 155000,
            china: 170000
        }
    };

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    
    function displayChart() {
        const chart = document.querySelector('.chart');

        Object.entries(months).map(month => {
            const key = month[0];
            const value = month[1];

            const countries = document.createElement('div');
            countries.classList.add('countries');
            countries.setAttribute('data-month', key);
            chart.appendChild(countries);

            Object.entries(value).map(item => {
                const countryKey = item[0];
                const countryValue = item[1];

                const country = document.createElement('div');
                country.classList.add('country');
                country.setAttribute('id', countryKey);
                country.setAttribute('data-value', countryValue);
                country.setAttribute('title', countryValue);
                countries.appendChild(country);

                // set a timer to allow for the bar transition (max-height)
                setTimeout(() => {
                    country.style.maxHeight = `${countryValue / yMax * 100}%`;
                }, 1000);
            });
        });
    }

    // On page load... 
    displayChart();

    // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
}

window.addEventListener('DOMContentLoaded', loadContent);