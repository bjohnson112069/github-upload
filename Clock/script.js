
function loadContent() {
    const toggle = document.querySelector('.toggle');
    const secondHand = document.querySelector('#second');
    const minuteHand = document.querySelector('#minute');
    const hourHand = document.querySelector('#hour');
    const time = document.querySelector('#current-time');
    const date = document.querySelector('#current-date');
    const MONTHS = [ 'JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC' ];
    const DAYS = [ 'Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    function toggleColorMode() {
        const html = document.documentElement;

        html.matches('.dark') ? html.classList.remove('dark') : html.classList.add('dark');
    }

    // This function handles the transition of the needle/hand between 360 deg and 1 deg
    function handleTransitionAnimation(value, element) {

        // remove the transition then reapply it one second later
        if (value === 0) {
            element.style.transition = 'none';
        } else if (value === 1) {
            element.style.transition = 'all 0.5s ease-in';
        }
    }

    function setDateTime() {
        // get the current date
        const now = new Date();

        // set the current date
        date.innerHTML = `${DAYS[now.getDay()]} ${MONTHS[now.getMonth()]} <span class="circle">${now.getDate()}</span>, ${now.getFullYear()}`;
    
        // calculate seconds, convert to degrees, set the rotation angle
        const seconds = now.getSeconds();
        handleTransitionAnimation(seconds, secondHand);
        const secondsDegrees = ((seconds / 60) * 360) + 360;
        secondHand.style.transform = `translate(-50%, -100%) rotate(${secondsDegrees}deg)`;
    
        // calculate minutes, convert to degrees, set the rotation angle
        const mins = now.getMinutes();
        handleTransitionAnimation(mins, minuteHand);
        const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6);
        minuteHand.style.transform = `translate(-50%, -100%) rotate(${minsDegrees}deg)`;
    
        // calculate hours, convert to degrees, set the rotation angle
        const hour = now.getHours();
        handleTransitionAnimation(hour, hourHand);
        const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30);
        hourHand.style.transform = `translate(-50%, -100%) rotate(${hourDegrees}deg)`;

        // set the current time (24 hour format)
        time.textContent = `${hour < 10 ? '0' : ''}${hour}:
            ${mins < 10 ? '0' : ''}${mins}:
            ${seconds < 10 ? '0' : ''}${seconds}`;
    }

    // On page load...
    setInterval(setDateTime, 1000);
    setDateTime();

    // Event Listeners
    toggle.addEventListener('click', toggleColorMode);
}

window.addEventListener('DOMContentLoaded', loadContent);