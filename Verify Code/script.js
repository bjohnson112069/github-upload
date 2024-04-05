const generate = document.querySelector('.generate');
const form = document.querySelector('form');
const digits = form.querySelectorAll('.digit');
let code = [];

// Untility: generate random number between min and max
function randomNum(min, max) {
   return Math.round(Math.random() * (max - min) + min);
}

function generateNewCode() {
   const email = document.querySelector('.email');
   const digits = email.querySelectorAll('.digit');

   // reinit/erase the previous code
   code = [];

   // generate a random number for each digit, store in the code array and display the number
   digits.forEach(digit => {
      const num = randomNum(0, 9);
      code.push(num);
      digit.textContent = num;
   })
}

function handleSubmit(e) {

   e.preventDefault();

   // precuationary
   if (digits.length != code.length) return;
   let verified;

   // iterate through the code array and compare to the input values
   for (let i = 0; i < code.length; i++) {

      // compare the value of the code to the value of the input
      if (code[i] != parseInt(digits[i].value)) {
         verified = false;

         // break out of the loop on the first instance of a mismatch
         break;
      } else {
         verified = true;
      }
   }

   // if all input values are verified ...
   if (verified) {
      const verify = document.querySelector('.verify')

      verify.classList.add('scale-down');
      setTimeout(() => {
         verify.classList.remove('scale-down');
      }, 3000);

      // remove any active states from the inputs
      digits.forEach((digit, index) => {
         index === 0 ? digit.focus() : '';
         digit.classList.remove('active')
      });

      this.reset();
   } else {
      alert("Oops!  Wrong Code.")
   }

}

function handleInputFocus() {
   this.select();
}

function handleInputUpdate() {
   this.classList.add('active');

   (!this.nextElementSibling) ? '' : this.nextElementSibling.focus();
}


// Event Listeners
generate.addEventListener('click', (e) => { 
   e.preventDefault();
   generateNewCode()
});
form.addEventListener('submit', handleSubmit);
digits.forEach(digit => {
   digit.addEventListener('focus', handleInputFocus);
   digit.addEventListener('input', handleInputUpdate );
});

// on page load ...
generateNewCode();
