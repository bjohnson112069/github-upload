function loadContent() {
    const timer = document.querySelector('.timer');
    const progressCircle = timer.querySelector('#timer-progress');
    const displayRemainingTime = document.querySelector('#time-Left');
    const playPauseBtn = document.querySelector('#play-pause-button')
    const stopBtn = document.querySelector('#stop-button');
    
    // configuration parameters
    let timeLeft = 60;
    let countdownTimer = 0;

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function isTimeLeft() {
        return timeLeft > -1;
    }

    function runTimer() {

        timer.classList.add('animatable');
        
        countdownTimer = setInterval(function(){
            if(isTimeLeft()){
                const timeRemaining = timeLeft--;
                const normalizedTime = (60 - timeRemaining) / 60;
                
                progressCircle.style.strokeDashoffset = normalizedTime;
                displayRemainingTime.textContent = timeRemaining;
            } else {
                resetTimer();
            }  
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(countdownTimer);
    }
    
    function resetTimer() {

        clearInterval(countdownTimer);
        timeLeft = 60;
        timer.classList.remove('animatable');
        progressCircle.style.strokeDashoffset = 1;
        displayRemainingTime.textContent = timeLeft;
        playPauseBtn.classList.remove('timer-started');
    }
    
    function handleToggleClick() {
        playPauseBtn.classList.toggle('timer-started');

        if (playPauseBtn.classList.contains('timer-started')) {
            runTimer();
        } else {
            pauseTimer();
        }
    }

    // on page load ...

    // Event Listeners
    playPauseBtn.addEventListener('click', handleToggleClick);
    stopBtn.addEventListener('click', () => resetTimer());
}

window.addEventListener('DOMContentLoaded', loadContent);