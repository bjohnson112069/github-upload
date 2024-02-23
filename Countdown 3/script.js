const add = document.querySelector("#add");
const closeModal = document.querySelector(".close-modal");
const form = document.querySelector("form");
const dateStr = document.querySelector("#date");
const labels = document.querySelectorAll(".hours-input");
const daysEl = document.querySelector(".days");
// const weekEl = document.querySelector(".week");
const weeksEl = document.querySelector(".weeks");


// We need an array to hold our state
let weeks = [];
let objWeek = {};
let days=[];

function handleOpenEvent(e) {
          form.classList.add("active");


}

function handleCloseEvent(e) {
          form.classList.remove("active");
}

function handleDatePickEvent(e) {
          // replace "-" with "/" to conver to lcoal time zone
          const date = new Date(dateStr.value.replace(/-/g, "/"));
          const first = date.getDate() - date.getDay();
          const last = first + 6;
          const firstDay = new Date(date.setDate(first));
          const lastDay = new Date(date.setDate(last));
          let curr, weekday, month, day;
          
          if (!Object.keys(objWeek).length) {
              Object.assign(objWeek, { id: Date.now(), firstDay: first, lastDay: last });
          }

          for (let i = first; i <= last; i++) {
              let obj = {};

              // gnereate a new date starting wit the first date
              curr = new Date(date.setDate(i));
              weekday = curr.toLocaleDateString('en-us', {  weekday: 'short' });
              month = curr.toLocaleDateString('en-us', {  month: 'short' })
              day = curr.toLocaleDateString('en-us', {  day: 'numeric' })

              if (!Object.keys(obj).length) {
                        Object.assign(obj, { day: weekday, date: day });
              }
              days.push(obj);
            }
}

function handleSubmitevent(e) {
          e.preventDefault();

          if (!Object.keys(days).length) return

          labels.forEach((label, index) => {
                    const hourStr = label.querySelector("input").value;
                    days[index].hours = hourStr;
          })

                    
          Object.assign(objWeek, { days: days });
          weeks.push(objWeek);
          console.log(weeks);


          daysEl.dispatchEvent(new CustomEvent('hoursUpdated'));
          form.reset();
          handleCloseEvent();
          // Reinitizlize the arry (1 week only)
          days=[];
          objWeek={};
}

function displayHours() {
          const totalEl = document.querySelector(".total");
          const totalBox = totalEl.parentElement;
          let htmlWeeks, html, weekEls, daysEl;
          let total = 0;

          if (weeks.length === 0) {
            console.log("lenght of weeks is zero")
          } else {
              htmlWeeks = weeks.map((week, index) => {
                return `<li class="week" data-id="${week.id}>
                    <div class="icon edit" data-id="${week.id}">
                        <i class="fa-regular fa-pen-to-square"></i>
                    </div>
                    <ul class="days"></ul>
                    <div class="total-box">Total Hours<span class="total">40</span></div>
                </li>`;
              }).join('');
              console.log(htmlWeeks)
              weeksEl.innerHTML = htmlWeeks;

              weekEls = document.querySelectorAll(".week");
              weekEls.forEach(el => {
                daysElements = el.querySelector(".days");
                console.log(daysElements);
                
              })

            }


          // if (days.length === 0 ) {
          //           weekEl.classList.add("empty");
          //           totalBox.classList.remove("active");
          //           html = `<li class="empty">
          //                     <i class="fa-solid fa-clock-rotate-left"></i>
          //                     <p>You have not logged any hours yet</p>
          //           </li>`

          // } else {
          //           weekEl.classList.remove("empty");
          //           html = days.map(day => {
          //                     // debugger
          //                     total = parseFloat(total) + parseFloat(day.hours);
          //                     return `<li class="item-day">
          //                               <span class="date">${day.date}</span>
          //                               <span class="day">${day.day}</span>
          //                               <span class="hours">${parseFloat(day.hours).toFixed(2)}</span>
          //                             </li>`;
          //                     }
          //           ).join('');          
          //           totalBox.classList.add("active");
          //           totalEl.innerHTML = parseFloat(total).toFixed(2);
          // }
          // daysEl.innerHTML = html;
}

add.addEventListener("click", handleOpenEvent)
closeModal.addEventListener("click", handleCloseEvent);
form.addEventListener("submit", handleSubmitevent);
dateStr.addEventListener("input", handleDatePickEvent);


daysEl.addEventListener('hoursUpdated', displayHours);

// On page load ...
daysEl.dispatchEvent(new CustomEvent('hoursUpdated'));