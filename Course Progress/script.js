const links = document.querySelectorAll("a");
const exercises = document.querySelectorAll(".exercise");

// Function to handle event delegation on the <li> element
function handleExerciseClickEvent(e) {
          // if the target is not of interest then return
          if (!e.target.matches("input[type=checkbox]") && (!e.target.matches(".title")) ) return;
          const progressVal = this.querySelector(".progress").querySelector("span");
          const progressBar = this.querySelector("progress");
       
          if (e.target.matches("input[type=checkbox]")) {
                    // mark the current <li> element as complete
                    this.classList.toggle("complete", e.target.checked);

                    // update the progress bar
                    const value = e.target.checked ? "100" : "0";
                    progressVal.textContent = `${value}%`;
                    progressBar.value = value;
          }

          if (e.target.matches(".title")) {
                    e.preventDefault();

                    // Iterate through all exercises. If the item matches the target make it active
                    exercises.forEach( exercise => exercise === this ? 
                              exercise.classList.add("active") : 
                              exercise.classList.remove("active") )
          }

}

exercises.forEach(exercise => exercise.addEventListener("click", handleExerciseClickEvent));
links.forEach(link => link.addEventListener("click", (e) => e.preventDefault));