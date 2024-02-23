 const answers = document.querySelector(".answers");
 const radios = answers.querySelectorAll("input[type=radio]");
 const tiers = document.querySelector(".tier-list");
 const buttons = tiers.querySelectorAll(".btn-select");

 function handleRadioBoxEvent(e) {

          // iterate through all the radio buttons; if the button matches the one clickd then check it; else uncheck it
          radios.forEach(radio => radio.checked = radio.name === this.name ? true : false);
 }

 function handleButtonEvent(e) {

          // iterate through all the buttons
          buttons.forEach(button => {
                    // remove the 'selected' class from the parent <li> element
                    button.parentElement.classList.remove("selected");

                    // remove the 'selected' class from the <button> element
                    button.classList.remove("selected");

                    // if the button matches the button selected mark it 'selected'
                    if (button.name === this.name) {
                              // add the 'selected' class to the parent <li> element
                              this.parentElement.classList.add("selected");

                              // add the 'selected' to from the <button> element
                              this.classList.add("selected");
                    }
          });
 }

 radios.forEach(radio => radio.addEventListener("click", handleRadioBoxEvent));
 buttons.forEach(button => button.addEventListener("click", handleButtonEvent));