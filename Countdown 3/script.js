let countdown; // handle for interval timer

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
        // groupID = days/hours/minutes/seconds
        const groupElement = document.querySelector(`.${groupID}`);
        const valueElement = groupElement.querySelector(".value");

//         console.log(groupElement, valueElement)
        valueElement.textContent = timeValue;

//         updateTimeSegment(timeSegment, timeValue);
}
       
        
function displayTimeLeft(totalSeconds) {
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor(((totalSeconds % 86400) % 3600) / 60);
        const seconds = Math.round(((((totalSeconds % 86400) % 3600) / 60) - minutes) * 60);

        updateTimeGroup("days", `${days < 10 ? '0' : ''}${days}`)
        updateTimeGroup("hours", `${hours < 10 ? '0' : ''}${hours}`)
        updateTimeGroup("minutes", `${minutes < 10 ? '0' : ''}${minutes}`)
        updateTimeGroup("seconds", `${seconds < 10 ? '0' : ''}${seconds}`)
}

// on page load generate a random countdown value (in seconds)
const time = randomTime(1, 2592000);
timer(time);
