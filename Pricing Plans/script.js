const links = document.querySelectorAll('a');
const pricing = document.querySelector('#pricing');

function handleToggleEvent() {
          const yearly = this.value === 'true';
          const prices = document.querySelectorAll('.prices');

          this.value = !yearly;

          prices.forEach(price => price.classList.toggle('yearly', !yearly));
}

pricing.addEventListener("change", handleToggleEvent);
links.forEach(link => link.addEventListener("click", (e) => e.preventDefault()));
