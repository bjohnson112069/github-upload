
function loadContent() {
    const links = document.querySelectorAll('.nav-link');
    let countdown; // handle for interval timer

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    // Untility: generate random number between min and max
    function randomTime(min, max) {
            return Math.round(Math.random() * (max - min) + min);
    }

    function timer(seconds) {
        // clear any existing timers
        clearInterval(countdown);

        // setInterval() not the best choice as sometimes it does not run when tabbed out (Windows) or scrolling (iOS)         
        const now = Date.now(); // current timestamp in ms
        const then = now + (seconds * 1000);

        // display the initial time prior to the interval; accounts for 1 (1000ms) delay w/interval
        displayTimeLeft(seconds);
                
        // using setInternval() to display the time left is okay (even if it is delayed)
        countdown = setInterval(() => {
                const secondsLeft = Math.round((then - Date.now()) / 1000);
                // check if we should stop
                if (secondsLeft < 0) {
                        clearInterval(countdown);
                        return;
                }

                // display it
                displayTimeLeft(secondsLeft);
        }, 1000);
    }

    function updateTimeGroup(groupID, timeValue) {
        // groupID = months/days/hours/minutes/seconds
        const groupElement = document.querySelector(`.${groupID}`);
        const valueElement = groupElement.querySelector(".value");

        valueElement.textContent = timeValue;
    }
            
    function displayTimeLeft(totalSeconds) {
        const months = Math.floor(totalSeconds / 2628000);
        const days = Math.floor((totalSeconds % 2628000) / 86400);
        const hours = Math.floor(((totalSeconds % 2628000) % 86400) / 3600);
        const minutes = Math.floor((((totalSeconds % 2628000) % 86400) % 3600) / 60);
        const seconds = Math.round(((((totalSeconds % 86400) % 3600) / 60) - minutes) * 60);

        updateTimeGroup("months", `${months < 10 ? '0' : ''}${months}`)
        updateTimeGroup("days", `${days < 10 ? '0' : ''}${days}`)
        updateTimeGroup("hours", `${hours < 10 ? '0' : ''}${hours}`)
        updateTimeGroup("minutes", `${minutes < 10 ? '0' : ''}${minutes}`)
        updateTimeGroup("seconds", `${seconds < 10 ? '0' : ''}${seconds}`)
    }

    // on page load generate a random countdown value (in seconds)
    // const time = randomTime(1, 2592000);
    const time = 5551096; // 2 months, 3 days, 9 hours, 58 minutes, 16 seconds
    timer(time);

    // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
}

window.addEventListener('DOMContentLoaded', loadContent);