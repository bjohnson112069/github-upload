
function loadContent() {
    const links = document.querySelectorAll('a');
    const filters = document.querySelectorAll('.filter');
    const chart = document.querySelector('.chart');
    const yAxis = chart.querySelector('.y-axis');

    const weekly = {
        Mon: {
            income: '85%',
            expenses: '45%'    
        },
        Tue: {
            income: '55%',
            expenses: '20%'    
        },
        Wed: {
            income: '40%',
            expenses: '10%'    
        },
        Thu: {
            income: '80%',
            expenses: '45%'    
        },
        Fri: {
            income: '52%',
            expenses: '35%'    
        },
        Sat: {
            income: '35%',
            expenses: '20%'    
        },
        Sun: {
            income: '15%',
            expenses: '5%'    
        },
    };
    const monthly = {
        Week1: {
            income: '52%',
            expenses: '35%'    
        },
        Week2: {
            income: '80%',
            expenses: '45%'    
        },
        Week3: {
            income: '50%',
            expenses: '50%'    
        },
        Week4: {
            income: '55%',
            expenses: '20%'    
        },
        Week5: {
            income: '85%',
            expenses: '45%'    
        }

    };
    const yearly = {
        Jan: {
            income: '85%',
            expenses: '45%'    
        },
        Feb: {
            income: '55%',
            expenses: '20%'    
        },
        Mar: {
            income: '40%',
            expenses: '10%'    
        },
        Apr: {
            income: '80%',
            expenses: '45%'    
        },
        May: {
            income: '52%',
            expenses: '35%'    
        },
        Jun: {
            income: '35%',
            expenses: '20%'    
        },
        Jul: {
            income: '15%',
            expenses: '5%'   
        },
        Aug: {
            income: '52%',
            expenses: '35%' 
        },
        Sep: {
            income: '80%',
            expenses: '45%'    
        },
        Oct: {
            income: '50%',
            expenses: '50%'
        },
        Nov: {
            income: '55%',
            expenses: '20%'        
        },
        Dec: {
            income: '85%',
            expenses: '45%'     
        }
    };
    let data = weekly; // default

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function handleFilterClick() {

        // make the current filter selection active
        filters.forEach(filter => filter === this ? 
                filter.classList.add('active') : 
                filter.classList.remove('active'));

        // update the reference variable to the appropriate data object
        switch(this.value) {
            case 'weekly':
                data = weekly;
                break;
            case 'monthly':
                data = monthly;
                break;
            case 'yearly':
                data = yearly;
                break;
            default:
                data = weekly;
                break;
        }

        displayChart(data);
    }

    function displayChart(obj) {

        // remove any child with a class of .bar
        let bars = chart.querySelectorAll('.bars');
        bars.forEach(bar => chart.removeChild(bar));
        
        // set the number of grid columns to the number of keys/length in the data object
        chart.style.setProperty("--num-columns", Object.keys(obj).length);

        // iterate through the data object, create the HTML elements and insert them before the '.y-axis' element
        for (let key in obj) {
            // console.log(key, weekly[key]);
            bars = document.createElement('div');
            bars.classList.add('bars');
            bars.setAttribute('data-x-value', `${key}`);
            bars.innerHTML = `<div class="income"></div>
                <div class="expenses"></div>`;
            chart.insertBefore(bars, yAxis);
            const income = bars.querySelector('.income');
            income.style.maxHeight = obj[key].income;
            const expenses = bars.querySelector('.expenses');
            expenses.style.maxHeight = obj[key].expenses;
        }
        
    }

    // On page load... 
    displayChart(data);



    // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
    filters.forEach(filter => filter.addEventListener('click', handleFilterClick)); 
}

window.addEventListener('DOMContentLoaded', loadContent);