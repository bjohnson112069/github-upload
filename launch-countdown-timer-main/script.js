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
                // console.log({ secondsLeft })
                // check if we should stop
                if (secondsLeft < 0) {
                        clearInterval(countdown);
                        return;
                }

                // display it
                displayTimeLeft(secondsLeft);
        }, 1000);
}

function getTimeSegmentElements(segmentElement) {
        const segmentDisplay = segmentElement.querySelector(".segment-display");
        const segmentDisplayTop = segmentDisplay.querySelector(".segment-display__top");
        const segmentDisplayBottom = segmentDisplay.querySelector(".segment-display__bottom");
        const segmentOverlay = segmentDisplay.querySelector(".segment-overlay");
        const segmentOverlayTop = segmentOverlay.querySelector(".segment-overlay__top");
        const segmentOverlayBottom = segmentOverlay.querySelector(".segment-overlay__bottom");

        // return ESX6 short to return object with property names as well as values
        return {
                segmentDisplayTop,
                segmentDisplayBottom,
                segmentOverlay,
                segmentOverlayTop,
                segmentOverlayBottom
        }
}

function updateSegmentValues(displayElement, overlayElement, value) {
        displayElement.textContent = value;
        overlayElement.textContent = value;
}

function updateTimeSegment(segmentElement, timeValue) {
        const segmentElements = getTimeSegmentElements(segmentElement);

        // Check to see if previous value is the same as the current value
        if (parseInt(segmentElements.segmentDisplayTop.textContent, 10) == timeValue) {
                return;
        }

        segmentElements.segmentOverlay.classList.add("flip");

        // 2-step process:
        // 1) update displayTop & overlayBottom first
        updateSegmentValues(
                segmentElements.segmentDisplayTop, 
                segmentElements.segmentOverlayBottom,
                timeValue);
                
        // 2) when the animation finishes remove the 'flip' class, update displayBottom & overlayTop
        function finishAnimation() {
                segmentElements.segmentOverlay.classList.remove("flip");
                updateSegmentValues(
                        segmentElements.segmentDisplayBottom, 
                        segmentElements.segmentOverlayTop,
                        timeValue);
                // reason for using a function versus inline/arrow function
                this.removeEventListener("animationend", finishAnimation);
        }

        segmentElements.segmentOverlay.addEventListener("animationend", finishAnimation);

}

function updateTimeGroup(groupID, timeValue) {
        // groupID = days/hours/minutes/seconds
        const groupElement = document.querySelector(`.${groupID}`);
        const timeSegment = groupElement.querySelector(".time-segment");

        updateTimeSegment(timeSegment, timeValue);
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

function removeAnimation(e) {
        // console.log(e);
        this.classList.remove("flip");

        const seconds = document.querySelector(".seconds");
        const displayBotttom = seconds.querySelector(".segment-display__bottom");
        const overlayTop = seconds.querySelector(".segment-overlay__top");
        const displayValue = `${globalTime.seconds - 1 < 10 ? '0' : ''}${globalTime.seconds - 1}`;

        displayBotttom.textContent = displayValue;
        overlayTop.textContent = displayValue;
}

// const timeOverlays = document.querySelectorAll(".segment-overlay");
// timeOverlays.forEach(overlay => overlay.addEventListener("animationend", removeAnimation));
      