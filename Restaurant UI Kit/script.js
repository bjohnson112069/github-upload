const reserve = document.querySelector(".reserve");
const reservation = document.querySelector(".reservation");
const submit = reservation.querySelector(".submit");
const menu = reservation.querySelector(".close");

function handleClickEvent() {
          reservation.classList.add("active");
}

function handleSubmitEvent(e) {
          e.preventDefault();

          // display the reservation number on the submit button
          submit.textContent = "CONF. # 123456";
}

function handleCloseEvent() {
          // reset the form
          reservation.reset();

          // reset the textContent on the form's submit button
          submit.textContent = submit.value;

          // close the reservation form
          reservation.classList.remove("active");
}

reserve.addEventListener("click", handleClickEvent);
reservation.addEventListener("submit", handleSubmitEvent);
menu.addEventListener("click", handleCloseEvent);