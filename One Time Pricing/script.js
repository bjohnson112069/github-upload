const offeringFeatures = {
          pickup: [
                    "All locations are conveniently located",
                    "In-store and curbside pickup available",
                    "Search for the nearest pickup locatioon"
          ],
          delivery: [
                    "Free shipping over NOK 800",
                    "Lightning fast delivery",
                    "Search for all shipping options near you"
          ]
}

const options = document.querySelectorAll(".option");
const features = document.querySelector(".features");
const check = document.querySelector(".check");
const form = document.querySelector(".offering-details");

function handleOptionSelection() {
          if (!this.value) return;

          const index = this.value;

          // iuse the <button> value as a lookup index then terate through the array and generate the HTML elements for the features list
          const html = offeringFeatures[index].map((item, index, originalArray) => {
                    const span = index === (originalArray.length - 1) ? `` : `<span class="icon icon-check" ria-label="Check Mark"></span>`;
                    const str = `
                              <li>
                                        ${span}${item}
                              </li>
                    `;
                    return str;
          }).join('');

          // add the HTML string to the innerHTML of the features list
          features.innerHTML = html;

          // remove all hover state classess from the check button
          check.classList.remove("check-button-pickup", "check-button-delivery");

          // add the proper hover state class based on teh button value/clicked
          check.classList.add(`${ index === "pickup" ? "check-button-pickup" : "check-button-delivery" }`);

          // add the active class to the form to display it
          form.classList.add("active");

}

function handleSubmitEvent(e) {
          e.preventDefault();
          alert("not functional");
          form.reset();

}

options.forEach(option => option.addEventListener("click", handleOptionSelection));
form.addEventListener("submit", handleSubmitEvent);
