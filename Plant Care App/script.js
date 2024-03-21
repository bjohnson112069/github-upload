const links = document.querySelectorAll("a");
const slider = document.querySelector('.plants');
const login = document.querySelector('#login');

const myPlants = [
          {
                    name: "Hosta plantaginea",
                    lastWatered: "2 Days",
                    nextWatering: "2 Days"
          },
          {
                    name: "Hemerocallis fulva",
                    lastWatered: "Yesterday",
                    nextWatering: "1 Day"
          },
          {
                    name: "Syngonium podophyllum",
                    lastWatered: "1 Week",
                    nextWatering: "1 Day"
          }
]

function handleImageClick(e) {

          const activePlant = e.target.closest('.plant');
          if (!activePlant) return;

          const index = activePlant.dataset.value;
          const plants = document.querySelectorAll('.plant');

          plants.forEach(plant => plant === activePlant ? 
                    plant.classList.add('active') : 
                    plant.classList.remove('active'));

          // move the planst slider to the active image
          slider.style.left = `${(activePlant.offsetLeft - 98) * -1}px`;

          // update the plant info
          const name = document.querySelector('.name');
          const lastWatered = document.querySelector('#last-watered')
          const nextWatering = document.querySelector('#next-watering')

          name.textContent = myPlants[(index - 1)].name;
          lastWatered.textContent = myPlants[(index - 1)].lastWatered;
          nextWatering.textContent = myPlants[(index - 1)].nextWatering;
}

function handleLoginClick() {
          const landing = document.querySelector('#landing-page');
          const app = document.querySelector('#app');

          landing.classList.toggle('active');
          app.classList.toggle('active');
}

login.addEventListener("click", handleLoginClick);
slider.addEventListener("click", handleImageClick);
links.forEach(link => link.addEventListener("click", (e) => e.preventDefault()));