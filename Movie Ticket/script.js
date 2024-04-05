
function loadContent() {
   const links = document.querySelectorAll('a');
   const seats = document.querySelectorAll('.seat');
   const next = document.querySelector('#btn-next');
   const exit = document.querySelector('.close');
   const MONTHS = ["January", "February", "March", "April", "May", "June",
   "July", "August", "September", "October", "November", "December"
   ];
   const PRICE = 10;


   function toggleReceiptModal() {
      const receipt = document.querySelector('.receipt');

      receipt.classList.toggle("active");
   }

   function displayReceipt(e) {
      const invoice = document.querySelector('.receipt__num');
      const tickets = document.querySelector('.receipt__tickets');
      const price = document.querySelector('.receipt__price');
      const date = document.querySelector('.receipt__date');
      const claasesToRemove = ['available', 'selected'];
      let count = 0;

      e.preventDefault();

      toggleReceiptModal();

      // update the invoice/receipt #
      invoice.textContent = Date.now();

      // display the row and set info for each ticket
      tickets.innerHTML = Array.from(seats)
      .filter(seat => seat.matches('.selected'))
      .map(seat => { 
         count++;
         // remove all classes then mark the selected seats as booked
         seat.classList.remove(...claasesToRemove);
         seat.classList.add('booked')
         return `
         <li class="receipt_ticket-item">
            <div class="receipt__bl-col">
               <span class="receipt__label">row:</span>
               <span class="receipt__row">${seat.parentElement.dataset.row}</span>
            </div>
            <div class="receipt__bl-col">
               <span class="receipt__label">seat:</span>
               <span class="receipt__row">${seat.dataset.seat}</span>
            </div>    
         </li>` 
      })
      .join('');

      // display the total
      price.textContent = `$${count * PRICE}`;

      // display the date
      const now = new Date();
      date.textContent = `${MONTHS[now.getMonth()]} ${now.getDay()}, ${now.getFullYear()}`;

      // reset the form
      this.form.reset();
   }

   function updateTicketDetails() {

      const date = document.querySelector('#date');
      const tickets = document.querySelector('#num-tickets');
      const total = document.querySelector('#total');

      // update the date
      const now = new Date();
      let str = `${MONTHS[now.getMonth()]} ${now.getDay()}, ${now.getHours()}:${now.getMinutes()}`;
      date.textContent = str;

      // update the number of tickets & total amount
      const num = Array.from(seats).reduce((amount, seat) => seat.matches('.selected') ? amount + 1 : amount, 0);
      tickets.textContent = num;
      total.textContent = `$${num * PRICE}`;
   }
   
   function selectSeat() {
      const num = this.dataset.seat;
      const row = this.parentElement.dataset.row;
      const claasesToRemove = ['available', 'selected'];
      const selected = this.matches('.selected');

      this.classList.remove(...claasesToRemove);
      this.classList.add( `${selected ? 'available' : 'selected'}` );

      updateTicketDetails();
   }

   // Event Listeners
   links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
   seats.forEach(seat => seat.addEventListener('click', selectSeat));
   next.addEventListener('click', displayReceipt);
   exit.addEventListener('click', toggleReceiptModal);

   // display initial ticket details
   updateTicketDetails();
}


window.addEventListener('DOMContentLoaded', loadContent);