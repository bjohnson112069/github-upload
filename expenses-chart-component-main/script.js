
function fetchData() {
        fetch('http://127.0.0.1:5500/expenses-chart-component-main//data.json')
            .then((response) => response.json())
            .then((json) => updateDataElements(json));
}

function updateDataElements(data) {
        const maxAmount = data.reduce( (accumulator, current, index) => {
                return Math.max(accumulator, current.amount);
        }, 0);

        data.forEach(value => {
                let barWrapper = document.querySelector(`[data-value=${value.day}]`);

                let amount = barWrapper.querySelector(".amount");
                amount.textContent = `$${value.amount}`;

                let day = barWrapper.querySelector(".day");
                day.textContent = value.day;

                if (value.amount === maxAmount) barWrapper.classList.add("max-amount");
                let percentage = Math.floor(value.amount / maxAmount * 100);
                console.log(percentage);
                let bar = barWrapper.querySelector(".bar-value");
                bar.style.height = `${percentage}%`;
        })

}

// fetch data on page load
fetchData();