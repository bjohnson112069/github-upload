const links = document.querySelectorAll('a');
const bars = document.querySelectorAll('.bar');
const circle = document.querySelector(".circle");
let percent = 0;
let prevStep = 0;

function displayCircleProgress(percentage) {

          const progress = document.querySelector(".percent");
          const baseValue = 472; // length of 'stroke-dasharray'; ideally want to query this
          const ratio = (100 - percentage) / 100;
          const percentValue = Math.ceil(baseValue * ratio);

          // update the offset in the dashArray which draws the dash/progess
          circle.style.setProperty("--initial-offset", `${percentValue}`);

          // update the % complete
          progress.textContent = `${percentage}%`;
}

// set a (20ms) interval to display the percentage values on the progress bars/circle
const interval = setInterval(() => {
    if (percent < 100) {

          // update the horizontal progress bars
          bars.forEach(bar => {
                    const progress = bar.querySelector('.progress');
                    const value = bar.querySelector('.value');
          
                    // update the step progress bar
                    if(bar.parentElement.matches('.step')) {
                              const step = Math.floor(percent / 25) + 1;
                              let icon;

                              // when transitioning from previuos step to next step ...
                              if (step != prevStep) {
                                        // update the progress bar with the step value
                                        progress.dataset.step = step;

                                        // make the current step's icon active
                                        icon = document.querySelector(`.icon[data-value="${step}"]`); 
                                        icon.classList.add('active');

                                        // make the previous step's icon inactive and complete
                                        icon.previousElementSibling.classList.remove('active');
                                        icon.previousElementSibling.classList.add('complete');
                              }

                              // update the previuos step number
                              prevStep = step;

                    } else {
                              // update the other step progress bars
                              progress.style.width = `${percent + 1}%`;
                              value.textContent = `${percent + 1}%`;          
                    }
          })

          // update the circle progress bar
          displayCircleProgress(percent + 1);

          percent++;
    } else {
          clearInterval(interval);
    }
}, 20)

// on page load ...
links.forEach(link => link.addEventListener("click", (e) => e.preventDefault()));
