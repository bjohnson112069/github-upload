let latitude = 51.505;
let longitude = -0.09;
const zoom = 13;

// var map = L.map('map').setView([51.505, -0.09], 13);
var map = L.map('map', {
                    zoomControl: false
          }).setView([latitude, longitude], zoom);

const myIcon = L.icon({
          iconUrl: './images/icon-location.svg',
          iconSize: [45, 57],
          iconAnchor: [22, 94],
          popupAnchor: [-3, -76],
      });
// var marker = L.marker([51.5, -0.09]).setIcon(myIcon).addTo(map);
const marker = L.marker([51.5, -0.09], {icon: myIcon}).addTo(map);


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


const baseEndpoint = 'https://geo.ipify.org/api/v2/country?';
const proxy = '';
const apiKey = 'at_FKl3teJQSqkcuoJbclMUXDsxiqmgN';

async function fetchData(options) {
          // fetch(`${proxy}${baseEndpoint}${apiKey}&${options}`)
          //           .then(response => response.json())
          //           .then(data => console.log(data))
          //           .catch(error => console.error(error));

          const response = await fetch(`${proxy}${baseEndpoint}${apiKey}&${options}`);
          const data = await response.json();
          return data;
}

function isValidIPaddress(inputText)
 {
          var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

          return inputText.value.match(ipformat);
}

// Function to validate the domain name
function isValidDomain(inputText) {
    // Regex to check valid Domain Name
    let regex = new RegExp(/^(?!-)[A-Za-z0-9-]+([\-\.]{1}[a-z0-9]+)*\.[A-Za-z]{2,6}$/);
    let str = inputText.value;

    return regex.test(str) === true;
}

function handleSubmitEvent(e) {
          // prevent the form from resetting
          e.preventDefault();

          // store the text from the text input
          const input = this.querySelector(".input");
          const value = input.value;
          console.log("Input value:", value);

          // validation
          if (!isValidIPaddress(input) && !isValidDomain(input)) {
                    alert("You have entered an invalid IP Address or Domain name!");
                    input.focus();
                    return;
          }

          console.log("proceeding with API call ...")

          // const data = await fetchData(serachCriteria).catch(handleError);
          // const ip = data.ip;
          // const country = data.lcoation.country;
          // const region = data.location.region;
          // const city = data.location.city;
          // const zipcode = data.location.postalCode;
          // const location = `${region}, ${country}`;
          // const timezone = data.location.timezone;
          // const isp = data.isp;
}

const form = document.querySelector(".search");
form.addEventListener("submit", handleSubmitEvent);