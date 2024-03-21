const links = document.querySelectorAll('a');
const buttons = document.querySelectorAll('.btn');

function handleButtonClick() {

          const dropdowns = document.querySelectorAll('.dropdown');
          
          if (this.matches('.dropdown-btn')) {
                    const menu = this.querySelector('.dropdown');

                    // toggle current active state
                    menu.classList.toggle('active');
          } else {
                    // close all dropdown menus
                    dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
          }
}

buttons.forEach(button => button.addEventListener('click', handleButtonClick));
links.forEach(link => link.addEventListener("click", (e) => e.preventDefault()));
