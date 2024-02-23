const circle = document.querySelector(".circle");
const buttons = document.querySelectorAll("input[type=checkbox]");

function displayPercentComplete() {
          // convert NodeList to Array
          const checks = Array.from(buttons);

          // iterate through the array and return the cumulative percentage total
          const percentage = checks.reduce((accumulator, item) => {
                    return (item.checked) ? accumulator += parseInt(item.value) : accumulator;
          }, 0);

          const baseValue = 472; // length of 'stroke-dasharray'; ideally want to query this
          const ratio = (100 - percentage) / 100;
          const percentValue = Math.ceil(baseValue * ratio);

          // update the offset in the dashArray which draws the dash/progess
          circle.style.setProperty("--initial-offset", `${percentValue}`);

          // update the % complete
          const progress = document.querySelector(".percent");
          progress.textContent = `${percentage}%`;
}

buttons.forEach(button => button.addEventListener("click", displayPercentComplete));

// on page load ...
displayPercentComplete();