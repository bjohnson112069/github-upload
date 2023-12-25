

async function fetchData(options) {
          const baseEndpoint = 'https://geo.ipify.org/api/v2/country,city?';
          const proxy = '';
          let fetchStr = "";

          if (options.ipAddress !== "") {
                    fetchStr = `${proxy}${baseEndpoint}apiKey=${options.apiKey}&ipAddress=${options.ipAddress}`;
          } else {
                    fetchStr = `${proxy}${baseEndpoint}apiKey=${options.apiKey}&domain=${options.domain}`;
          }

          console.log("fetching ...", fetchStr);

          // async/await enables synchronous, promise-based behavior to be written in a cleaner style and avoiding the need to explicitly configure promise chains.  
          /* fetch(fetchStr)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error)); */

          const response = await fetch(fetchStr);
          const data = await response.json();
          return data;
}

function handleError(err) {
          console.log(`UH OH!  Error: ${err}`);

          const myData = {
                "ip": "192.212.174.101",
                "location": {
                    "country": "US",
                    "region": "California",
                    "city": "South San Gabriel",
                    "lat": 34.04915,
                    "lng": -118.09462,
                    "postalCode": "91770",
                    "timezone": "-08:00",
                    "geonameId": 5397771
                },
                "as": {
                    "asn": 7127,
                    "name": "SCE",
                    "route": "192.212.0.0/15",
                    "domain": "",
                    "type": ""
                },
                "isp": "Southern California Edison"
          }

          // if API quota exceeded return static data as part of error condition
          return myData;

}
        
// Function to validate the domain name
function isValidIPaddress(inputText)
{
          // Regex to check valid IP Address
          const ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
          const str = inputText.value;

          return ipformat.test(str);
}

// Function to validate the domain name
function isValidDomain(inputText) {
          // Regex to check valid Domain Name
          const regex = new RegExp(/^(?!-)[A-Za-z0-9-]+([\-\.]{1}[a-z0-9]+)*\.[A-Za-z]{2,6}$/);
          const str = inputText.value;

          return regex.test(str) === true;
}

// Function to conver state name to abbreviation
function lookupStateAbbrv(state) {
    const states = {
            'Arizona': 'AZ',
            'Alabama': 'AL',
            'Alaska': 'AK',
            'Arkansas': 'AR',
            'California': 'CA',
            'Colorado': 'CO',
            'Connecticut': 'CT',
            'Delaware': 'DE',
            'Florida': 'FL',
            'Georgia': 'GA',
            'Hawaii': 'HI',
            'Idaho': 'ID',
            'Illinois': 'IL',
            'Indiana': 'IN',
            'Iowa': 'IA',
            'Kansas': 'KS',
            'Kentucky': 'KY',
            'Louisiana': 'LA',
            'Maine': 'ME',
            'Maryland': 'MD',
            'Massachusetts': 'MA',
            'Michigan': 'MI',
            'Minnesota': 'MN',
            'Mississippi': 'MS',
            'Missouri': 'MO',
            'Montana': 'MT',
            'Nebraska': 'NE',
            'Nevada': 'NV',
            'New Hampshire': 'NH',
            'New Jersey': 'NJ',
            'New Mexico': 'NM',
            'New York': 'NY',
            'North Carolina': 'NC',
            'North Dakota': 'ND',
            'Ohio': 'OH',
            'Oklahoma': 'OK',
            'Oregon': 'OR',
            'Pennsylvania': 'PA',
            'Rhode Island': 'RI',
            'South Carolina': 'SC',
            'South Dakota': 'SD',
            'Tennessee': 'TN',
            'Texas': 'TX',
            'Utah': 'UT',
            'Vermont': 'VT',
            'Virginia': 'VA',
            'Washington': 'WA',
            'West Virginia': 'WV',
            'Wisconsin': 'WI',
            'Wyoming': 'WY',
        };

        if (!state) return;

        return states[state];
}


async function handleSubmitEvent(e) {
          // prevent the form from resetting
          e.preventDefault();

          // store the text from the text input
          const input = this.querySelector(".input");
          const value = input.value;

          // validate the intput value
          const ipAddress = isValidIPaddress(input);
          const domainName = isValidDomain(input);

          // IPify API search options
          const options = {
            apiKey: "at_FKl3teJQSqkcuoJbclMUXDsxiqmgN",
            ipAddress: "",
            domain: "",
            email: "",
            escapedUnicode: ""
          }

          // validation of input value; comply with IP/Domain format
          if (!ipAddress && !domainName) {
                    alert("You have entered an invalid IP Address or Domain name!");
                    input.focus();
                    return;
          }

          // sedt IPify search options based on text input value; binary condition
          options.ipAddress = (ipAddress) ? value : "";
          options.domain = (domainName) ? value : "";

          
          // async/await enables synchronous, promise-based behavior to be written in a cleaner style and avoiding the need to explicitly configure promise chains.  
          const data = await fetchData(options).catch(handleError);

          // Derive location string
          const country = data.location.country;
          const region = (country === "US") ? lookupStateAbbrv(data.location.region) : data.location.region;
          const city = data.location.city;
          const zipcode = data.location.postalCode;
          const location = `${city}, ${region} ${zipcode}`;

          // Update screen values
          let detail = document.querySelector("[data-name=ip]");
          detail.textContent=`${data.ip}`;
          detail = document.querySelector("[data-name=location]");
          detail.textContent=`${location}`;
          detail = document.querySelector("[data-name=timezone]");
          detail.textContent=`${data.location.timezone}`;
          detail = document.querySelector("[data-name=isp]");
          detail.textContent=`${data.isp}`;

          // store Leaflet Map input values
          const latitude = data.location.lat;
          const longitude = data.location.lng;
          const zoom = 13;

          // set the view of the map to the lat/long from the IPify search results
          map.setView([latitude, longitude], zoom);

          // set attributes for custom marker icon
          const myIcon = L.icon({
                              iconUrl: './images/icon-location.svg',
                              iconSize: [45, 57],
                              iconAnchor: [22, 94],
                              popupAnchor: [-3, -76],
                    });
          
          // instantiate the custom marker and add it to the map
          L.marker([latitude, longitude], {icon: myIcon}).addTo(map);

}

// add event listener for the form submit event
const form = document.querySelector(".search");
form.addEventListener("submit", handleSubmitEvent);


function initializeMap() {
        // Instantiates a map object given the DOM ID 
        let map = L.map('map', {
            zoomControl: false,
            scrollWheelZoom: false
        });

        // Used to load and display tile layers on the map. Note that most tile servers require attribution
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        
        return map;
}

// on page load ...
const map = initializeMap();