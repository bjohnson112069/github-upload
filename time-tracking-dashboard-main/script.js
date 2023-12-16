let timeframe = "weekly";

function fetchData() {
        fetch('http://127.0.0.1:5500/time-tracking-dashboard-main//data.json')
            .then((response) => response.json())
            .then((json) => updateDataElements(json, timeframe));
}

function updateDataElements(data, timeframe) {
        data.forEach(value => {
                const title = value.title;
                const currentTimeframe = value.timeframes[timeframe].current;
                const previousTimeframe = value.timeframes[timeframe].previous;
                
                // console.log(title, currentTimeframe, previousTimeframe)
                const cardContent = document.querySelector(`[data-title=${title}]`);
                const currentValue = cardContent.querySelector(".current-value");
                const previousValue = cardContent.querySelector(".previous-value");
                currentValue.querySelector("span").textContent = currentTimeframe;
                previousValue.querySelector("span").textContent = previousTimeframe;
        })
}



function handleClickEvent(e) {
        //  remove active state from all stat links
        links.forEach(link => link.classList.remove("active"));
        
        timeframe = this.dataset.value;
        this.classList.add("active");
        fetchData();
}

const links = document.querySelectorAll("a[data-value]");
links.forEach(link => link.addEventListener("click", handleClickEvent));

// default selection is 'weekly'; on page load fetch & display the data
fetchData();