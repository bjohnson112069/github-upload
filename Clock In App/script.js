const add = document.querySelector("#add");
const closeModal = document.querySelector(".close-modal");
const form = document.querySelector("form");
const dateStr = document.querySelector("#date");
const weeksList = document.querySelector(".weeks");


// We need an array to hold our state
let weeks = [];
let days=[];

// Temporary object to store the data for the week prior to pushing to the (weeks) state array
let objWeek = {};

// FUNCTION: to handle opening of the form modal
function handleOpenEvent(e) {
  form.classList.add("active");
}

// FUNCTION: to handle close of the form modal
function handleCloseEvent(e) {
  form.classList.remove("active");
}

// FUNCTION: to handle events associated with the date picker
function handleDatePickEvent(e) {
  // select the month element in the title
  const monthEl = document.querySelector(".month");

  // replace "-" with "/" to conver to lcoal time zone
  const date = new Date(dateStr.value.replace(/-/g, "/"));
  const first = date.getDate() - date.getDay();
  const last = first + 6;
  const firstDay = new Date(date.setDate(first));
  const lastDay = new Date(date.setDate(last));
  let objDate, weekday, month, day;

  // update the month in the title with the month selected
  monthEl.textContent = date.toLocaleDateString('en-us', {  month: 'short' });
  
  // if the temporary week object exists then create keys for id, first, last day
  if (!Object.keys(objWeek).length) {
      Object.assign(objWeek, { id: Date.now(), firstDay: first, lastDay: last });
  }

  // iterate between the first and last day and generate objects for the days state array
  for (let i = first; i <= last; i++) {
      // Temporary object to store the data for the day prior to pushing to the (days) state array
      let objDay = {};

      // gnereate a new date using the index (range: first - last)
      objDate = new Date(date.setDate(i));
      weekday = objDate.toLocaleDateString('en-us', {  weekday: 'short' });
      month = objDate.toLocaleDateString('en-us', {  month: 'short' })
      day = objDate.toLocaleDateString('en-us', {  day: 'numeric' })

      // if the temporary day object exists then create the key/value pairs
      if (!Object.keys(objDay).length) {
                Object.assign(objDay, { day: weekday, date: day, month: month });
      }
      // push the temporary day object to the (days) state array
      days.push(objDay);
  }
}

// FUNCTION: to handle submit event on the form
function handleSubmitevent(e) {
  // select the label containers for all the <hours) input
  const labels = document.querySelectorAll(".hours-input");

  // prevent form from resetting
  e.preventDefault();

  // if the (days) state array is empty return
  if (!Object.keys(days).length) return

  // iterate thrrough all the labels ...
  labels.forEach((label, index) => {
      // within the label container, select the input element and return the value
      const hourStr = label.querySelector("input").value;

      // store the value in the (days) state array
      days[index].hours = hourStr;
  })

  // assign the (days) state array to the temporary (weeks) object
  Object.assign(objWeek, { days: days });

  // push the temporary (weeks) object in the (weeks) state array
  weeks.push(objWeek);

  // dispatch a custom event to update the items displayed on the screen
  weeksList.dispatchEvent(new CustomEvent('hoursUpdated'));

  // reset the form
  form.reset();

  // close the form
  handleCloseEvent();

  // Reinitizlize the (days) state array and the temporary (weeks) object
  days = [];
  objWeek = {};
}

// FUNCTION: to display the hours on the screen
function displayHours() {
  let total, html, weeksItems, daysList;
  
  if (weeks.length === 0) {
      // generate html string for the empty list
      html = `<li class="empty">
                  <i class="fa-solid fa-clock-rotate-left"></i>
                  <p>You have not logged any hours yet</p>
        </li>`;

        // update the inner HTML of weeks <ul> element to instantiate it's deceendantx
      weeksList.innerHTML = html;
  } else {
      // Iterate through the weeks array and ...
      // 1) generate the <li> elements for the weeks <ul> container
      // 2) generate the days <ul> container 
      // 3) generate the total container
      html = weeks.map((week, index) => {
            return `<li class="week" data-id="${week.id}">
              <div class="icon edit" data-id="${week.id}">
                <i class="fa-regular fa-pen-to-square"></i>
              </div>
              <ul class="days"></ul>
              <div class="total-box">Total Hours<span class="total">40</span></div>
            </li>`;
      }).join('');

      // update the inner HTML of weeks <ul> element to instantiate it's deceendantx
      weeksList.innerHTML = html;

      // Select and iterate through the newly created <li> elements within the weeks <ul> element
      weeksItems = document.querySelectorAll(".week");
      weeksItems.forEach(el => {
            // for each week <li> element, reinitialize the total accumulator
            total = 0;
            const id = el.dataset.id;

            // select the total element within the week <li> element
            const totalEl = el.querySelector(".total");
  
            // find/search by id within the weeks array
            const results = weeks.find(obj => obj.id === parseInt(id));

            // assign the days array to a temporary object
            const objDays = !results ? "" : results.days;
            
            // Select the newly created days <ul> container
            daysList = el.querySelector(".days");

            // iterate through the days array and generate the <li> element for each item/day in the array
            html = objDays.map(day => {
              total = parseFloat(total) + parseFloat(day.hours);
              return `<li class="item-day">
                        <span class="date">${day.date}</span>
                        <span class="day">${day.day}</span>
                        <span class="hours">${parseFloat(day.hours).toFixed(2)}</span>
                      </li>`;
              }
            ).join('');
            // Update the inner HTML of the days (ul) element
            daysList.innerHTML = html;

            // Update the total hours
            totalEl.innerHTML = parseFloat(total).toFixed(2);
      })
  }
}

add.addEventListener("click", handleOpenEvent)
closeModal.addEventListener("click", handleCloseEvent);
form.addEventListener("submit", handleSubmitevent);
dateStr.addEventListener("input", handleDatePickEvent);


weeksList.addEventListener('hoursUpdated', displayHours);

// On page load ...
  // dispatch a custom event to update the items displayed on the screen
weeksList.dispatchEvent(new CustomEvent('hoursUpdated'));