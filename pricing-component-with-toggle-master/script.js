let paySelection = "annually"; // default value
let pricePlan = {
     annually: {
          basic: "$199.99",
          professional: "$249.99",
          master: "$399.99"     
     },
     monthly: {
          basic: "$19.99",
          professional: "$24.99",
          master: "$39.99"     
     }
}

function setPriceValues() {
     const prices = document.querySelectorAll(".price");

     prices.forEach(price => {
          // if neither of the keys exist then exit/return
          if(!(paySelection in pricePlan) || !(price.dataset.name in pricePlan[paySelection])) return;
          // use the paySelector and data-name custom attribute as lookup values
          price.textContent = pricePlan[paySelection][price.dataset.name];
     })
}

const checkBox = document.querySelector(".checkbox");

function getPricePlan() {
     const isChecked = checkBox.checked;
     
     paySelection = (isChecked) ? "monthly" : "annually";
}

// when the input is checked
// query status of checkbox
// set the price values (annual or monthly)
checkBox.addEventListener('click', () => {
     getPricePlan();
     setPriceValues();
});

// on page load
// query status of checkbox
// set the price values (annual or monthly)
getPricePlan();
setPriceValues();