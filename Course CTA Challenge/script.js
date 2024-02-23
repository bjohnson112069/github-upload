
const dates = {
          spring: {
                    enrollment: "FEB",
                    commencement: "APR",
                    completion: "MAR"
          },
          summer: {
                    enrollment: "MAY",
                    commencement: "JUL",
                    completion: "JUN"
          },
          fall: {
                    enrollment: "AUG",
                    commencement: "OCT",
                    completion: "SEP"
          },
          winter: {
                    enrollment: "NOV",
                    commencement: "JAN",
                    completion: "DEC"
          }
}

const tabs = document.querySelectorAll(".tab");


function handleButtonclick() {
          const months = document.querySelectorAll(".month");
          const value = this.dataset.value;

          months.forEach(month => month.textContent = dates[value][month.dataset.value]);

          tabs.forEach(tab => {
                    tab.matches(`button[data-value=${value}]`) ? tab.classList.add("active") : tab.classList.remove("active");

          })
}
tabs.forEach(tab => tab.addEventListener("click", handleButtonclick));