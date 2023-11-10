const inputYear = document.querySelector("input[name=year]");
const inputMonth = document.querySelector("input[name=month]");
const inputDay = document.querySelector("input[name=day]");
const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth() + 1;
const currentDay = now.getDate();
const d1 = now.getTime();
const daysPerMonth = [
     31,
     28,
     31,
     30,
     31,
     30,
     31,
     31,
     30,
     31,
     30,
     31
];

function throwError(name, message = "") {
     const input = document.querySelector(`input[name=${name}]`);
     const inputGroup = input.parentElement;
     const errorMessage = input.nextElementSibling;
     
     inputGroup.classList.add("error");
     errorMessage.textContent = message;
}

function verifyInput(name, value) {
     let verified = false;

     if (value === "") {
          throwError(name, "This field is required");
          return verified;
     }

     switch(name) {
          case "year":
               if (value > 99 && value <= currentYear) verified = true;
               else throwError(name, "Must be in the past");
               break;
          case "month":
               if (value > 0 && value <= daysPerMonth.length) verified = true;
               else throwError(name, "Must be a valid month");
               break;
          case "day":
               if (value > 0 && value <= 31) verified = true;
               else throwError(name, "Must be a valid day");
               break;
          default:
               break;
     }
     return verified;
}



function leapYear(year)
{
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}



function verifyDate(year, month, day) {
     // inputs have all been verified as valid but need to check the day of the month and possible leap year
     const isLeapYear = leapYear(year);
     // month ranges from 1 - 12; convert to a number then subtract 1 for array index
     const numMonth = parseInt(month) - 1;


     // if the month is FEB check to see if the day is in range and if leap year
     if (numMonth === 1) {
          if ( (day > 0 && day <= daysPerMonth[numMonth]) || 
               (isLeapYear && day > 0 && day <= 29) ) return true;
          else return false;
     } 
     
     // otherwise check to see if the day in range
     if (day > 0 && day <= daysPerMonth[numMonth]) return true;
     else return false;

}

function clearErrorMessages() {
     const inputGroups = document.querySelectorAll(".input-group");

     inputGroups.forEach(group => group.classList.remove("error"));
}


function calculateAge(e) {
     e.preventDefault(); // prevent page refresh when sending data to server

     // Clear all error conditions on submit
     clearErrorMessages();

     const yearVerified = verifyInput(inputYear.name, inputYear.value)
     const monthVerified = verifyInput(inputMonth.name, inputMonth.value)
     const dayVerified = verifyInput(inputDay.name, inputDay.value)

     if (!yearVerified || !monthVerified || !dayVerified) return;

     const dateVerified = verifyDate(inputYear.value, inputMonth.value, inputDay.value);

     if (!dateVerified) {
          throwError(inputDay.name, "Must be a valid date")
          return;
     }

     
     const then = new Date(inputYear.value, inputMonth.value-1, inputDay.value);
     const d2 = then.getTime(); // getTime() produced inconsistent results for year < 100; modified verification protocol to account for this

     
     const MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365.2425;
     const MS_PER_MONTH = MS_PER_YEAR / 12;
     const MS_PER_DAY = 1000 * 60 * 60 * 24;

     const timeInterval = (d1 - d2);
     // console.log("time interval:", timeInterval);
     const numYears = Math.floor(timeInterval / MS_PER_YEAR);
     const numMonths = Math.floor((timeInterval % MS_PER_YEAR) / MS_PER_MONTH);
     const numDays = Math.floor(((timeInterval % MS_PER_YEAR) % MS_PER_MONTH) / MS_PER_DAY);
     // console.log(`years: ${numYears}, months: ${numMonths} days: ${numDays}`);

     const resultsYears = document.querySelector("span[data-name=year");
     const resultsMOnths = document.querySelector("span[data-name=month");
     const resultsDays = document.querySelector("span[data-name=day");

     resultsYears.textContent = numYears;
     resultsMOnths.textContent = numMonths;
     resultsDays.textContent = numDays;

}

const dateForm = document.querySelector(".enter-date");
dateForm.addEventListener("submit", calculateAge);