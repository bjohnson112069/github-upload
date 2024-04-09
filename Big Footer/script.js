
function loadContent() {
   const links = document.querySelectorAll('a');

   
   // Event Listeners
   links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));

   
   // on page load ... (must go after event listeners)
}

document.addEventListener('DOMContentLoaded', loadContent);
