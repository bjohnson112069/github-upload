
function loadContent() {
    const links = document.querySelectorAll('a');
    const timerBtn = document.querySelector('#toggle-timer');
    const btnLabel = document.querySelector('.timer-btn--label');
    const lastContraction = document.querySelector('.last-contraction');
    const hours = document.querySelector('#hours');
    const minutes = document.querySelector('#minutes');
    const seconds = document.querySelector('#seconds');
    const contractions = document.querySelector('.contractions');
    let interval, contractionInterval;
    let count = 0;
    let startTime;
    let endTime;
    const items = [];

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function convertMillisecondsToTime(duration) {
        const ms = Math.floor((duration % 1000) / 100);
        const s = Math.floor((duration / 1000) % 60);
        const m = Math.floor((duration / (1000 * 60)) % 60);
        const h = Math.floor((duration / (1000 * 60 * 60)) % 24);
        return {h, m, s};
    }

    function convertSecondsToTime(duration) {
        const h = Math.floor(duration / 3600) == 24 ? 0 : Math.floor(duration / 3600);
        const m = Math.floor(duration % 3600 / 60);
        const s = Math.floor(duration % 3600 % 60);
        return {h, m, s};
    }

    function displayItems() {
        const HTML = items.map((item, i, arr) => {
            // if array length > 1 calculate time apart for the current item
            if (i > 0) {
                const duration = (item.start - arr[i - 1].start)
                const results = convertMillisecondsToTime(duration);
                item.apart = `${results.h < 10 ? '0' : ''}${results.h}:${results.m < 10 ? '0' : ''}${results.m}:${results.s < 10 ? '0' : ''}${results.s}`;
            }

            return `<li class="contraction">
                <span class="length">${item.length}s</span>
                <span class="time-apart">${item.apart === 0 ? '--' : item.apart}</span>
                <p class="start-end-time">
                    <span class="start-time">${item.start.toLocaleTimeString('en-US',
                        {hour12:true,hour:'numeric',minute:'numeric'})}</span>
                    <span>-</span>
                    <span class="end-time">${item.end.toLocaleTimeString('en-US',
                        {hour12:true,hour:'numeric',minute:'numeric'})}</span>
                </p>
            </li>`
        }).join('');

        contractions.innerHTML = HTML;
    }

    function displayTimerElements(s, m, h) {
        seconds.textContent = `${s < 10 ? '0' : ''}${s}`;
        minutes.textContent = `${m < 10 ? '0' : ''}${m}`;
        hours.textContent = `${h < 10 ? '0' : ''}${h}`;
    }

    function handleButtonTimer() {

        // check to see if the button is currently active
        if (this.matches('.active')) {
            // clear the interval
            clearInterval(interval);

            // store the current (end) time
            endTime = new Date();

            // create an object to store 
            const item = {
                id: Date.now(),
                length: count,
                apart: 0,
                start: startTime,
                end: endTime
            };

            // store the item in our array
            items.push(item);

            displayItems();

            // reinit our variables
            count = 0;
            startTime = 0;
            endTime = 0;

            displayTimerElements(0, 0, 0);

            // update the button label
            btnLabel.textContent = 'Start Timer';

            // start a new timer
            // get the current time
            // calculate the delta between the current time and the last item in our array
            // convert to hours, minutes, seconds
            clearInterval(contractionInterval);
            lastContraction.textContent = '00:00:00';
            contractionInterval = setInterval(() => {
                const now = new Date();
                const results = convertMillisecondsToTime(now - items[items.length - 1].end);
                lastContraction.textContent = `${results.h < 10 ? '0' : ''}${results.h}:${results.m < 10 ? '0' : ''}${results.m}:${results.s < 10 ? '0' : ''}${results.s}`;
            }, 1000);


        } else {
            // start an interval timer
            // increment a counter every second
            // calculate seconds, minutes, hours
            // update the timer elements
            interval = setInterval( () => {
                count++;
                const timer = convertSecondsToTime(count);
                displayTimerElements(timer.s, timer.m, timer.h);
            }, 1000)

            // store the current (start) time
            startTime = new Date();

            // update the button label
            btnLabel.textContent = 'Stop Timer';

            clearInterval(contractionInterval);
            lastContraction.textContent = '00:00:00';
        }

        // toggle the active state of the button
        this.classList.toggle('active');
    }

   // On page load... 
    
   // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
    timerBtn.addEventListener('click', handleButtonTimer);
}

window.addEventListener('DOMContentLoaded', loadContent);