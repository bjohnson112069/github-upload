async function loadContent() {
    const links = document.querySelectorAll('a');
    const switcher = document.querySelector('#color-theme')

    // fetch data from the specifieed endpoint
    async function fetchData(endpt) {
        const response = await fetch(`${endpt}`, {
            headers: {
                Accept: 'application/json',
            },
        });
        const data = await response.json();
        return data;
    }

    // display grid items
    function displayGridItems(obj) {

        // iterate through the object using array methods
        Object.entries(obj).map(([key, value], index) => {
            
            // update the total count
            if (key === 'total') {
                const count = document.querySelector('#follower-count');
                count.textContent = value.toLocaleString();
            }

            // iterate through the 'details' array and generate the HTML
            if (key === 'details' && Array.isArray(value)) {
                const details = document.querySelector('#details');

                details.innerHTML = value.map(item => {
                    return `<div class="grid-item detail ${item.platform}">
                        <div class="social-info">
                            <span class="social-logo" aria-label="social media logo"></span>
                            <span class="social-user">${item.user}</span>
                        </div>
                        <h1 class="count">${item.count}</h1>
                        <span class="label">${item.label}</span>
                        <div class="trend ${item.trend >= 0 ? 'up' : 'down'}">
                            <span class="trend-arrow" aria-label="trend arrow"></span>
                            <span class="trend-value">${item.trend < 0 ? item.trend *= -1 : item.trend}</span>
                            <span>Today</span>
                        </div>
                    </div>`;
                }).join('');
            }

            // iterate through the 'overview' array and generate the HTML
            if (key === 'overview' && Array.isArray(value)) {
                const overview = document.querySelector('#overview');

                overview.innerHTML = value.map(item => {
                    return `<div class="grid-item overview-item ${item.platform}">
                        <div>
                            <span class="label">${item.label}</span>
                            <span class="social-logo" aria-label="social media logo"></span>
                        </div>
                        <div>
                            <h3 class="count">${item.count}</h3>
                            <div class="trend ${item.trend >= 0 ? 'up' : 'down'}">
                                <span class="trend-arrow" aria-label="trend arrow"></span>
                                <span class="trend-value">${item.trend < 0 ? item.trend *= -1 : item.trend}%</span>
                            </div>    
                        </div>
                    </div>`;
                }).join('');
            }
        });
    }

    // store theme
    function storeColorTheme(checked) {
        localStorage.setItem("mode", checked);
    }

    // apply theme
    function applyColorTheme() {
        const mode = localStorage.getItem("mode");
        switcher.checked = (mode === 'true');
    }

    // on page load ...
    const data = await fetchData(`./data.json`);

    // generate and display the grid items from the data object
    displayGridItems(data);

    // get the stored value from local storage and apply the theme
    applyColorTheme();

    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    switcher.addEventListener('click', () => storeColorTheme(switcher.checked));
}

window.addEventListener('DOMContentLoaded', loadContent);