const alarms = document.querySelectorAll(".alarm");
const days = document.querySelectorAll(".day");
const date = document.querySelector(".current-date");
const time = document.querySelector(".current-time");
const MONTHS = [
          "JANUARY",
          "FEBRUARY",
          "MARCH",
          "APRIL",
          "MAY",
          "JUNE",
          "JULY",
          "AUGUST",
          "SEPTEMBER",
          "OCTOBER",
          "NOVEMBER",
          "DECEMBER"
];

function handleAlarmClick(e) {
          alarms.forEach(alarm => alarm === this ? 
                    alarm.classList.add("active") : 
                    alarm.classList.remove("active"));

          e.target.matches(".day") ? e.target.classList.toggle("selected") : "";
}

// Event listener for button clicks ...
alarms.forEach(alarm => alarm.addEventListener("click", handleAlarmClick));


function setDate() {
          const now = new Date();
      
          const mins = now.getMinutes();
          const hour = now.getHours();
          const day = now.getDate();
          const month = MONTHS[now.getMonth()];

          time.textContent = `${hour > 12 ? hour - 12 : hours}:${mins < 10 ? '0' : ''}${mins}`;
          date.textContent = `${day} ${month}`;

}
      
setInterval(setDate, 1000);
      
setDate();