const links = document.querySelectorAll(".nav-link");
const form = document.querySelector("form");
const search = form.querySelector("input[type=text")


const users = [
          {
                    first: "Lelah",
                    last: "Nichols",
                    name: "Lelah Nichols",
                    location: "Troy, MI",
                    image: "https://github.com/bjohnson112069/web-images/raw/main/Users%20List/pexels-amar-preciado-13913217.webp",
                    tags: ["clothes", "stem"]
          },
          {
                    first: "Jesus",
                    last: "Weiss",
                    name: "Jesus Weiss",
                    location: "Fort Worth, TX",
                    image: "https://github.com/bjohnson112069/web-images/blob/main/Users%20List/pexels-creation-hill-1681010.jpg?raw=true",
                    tags: ["headset", "gadget", "speed", "winter"]
          },
          {
                    first: "Annie",
                    last: "Rice",
                    name: "Annie Rice",
                    location: "Austin, TX",
                    image: "https://github.com/bjohnson112069/web-images/blob/main/Users%20List/pexels-italo-melo-2379004.jpg?raw=true",
                    tags: ["road", "mountain", "trip", "earth", "nature"]
          },
          {
                    first: "Robert",
                    last: "Brower",
                    name: "Robert Brower",
                    location: "Cincinnati, OH",
                    image: "https://github.com/bjohnson112069/web-images/raw/main/Users%20List/pexels-rajaa-lemnari-20065834.webp",
                    tags: ["Maintenance", "gears", "frames", "repair"]
          },
          {
                    first: "Amy",
                    last: "Campbell",
                    name: "Amy Campbell",
                    location: "Warrior, AL",
                    image: "https://github.com/bjohnson112069/web-images/raw/main/Users%20List/pexels-tejinder-ladi-photography-13530974.webp",
                    tags: ["music", "disks"]
          },
          {
                    first: "Lloyd",
                    last: "Christmas",
                    name: "Lloyd Christmas",
                    location: "Providence, RI",
                    image: "https://github.com/bjohnson112069/web-images/blob/main/Users%20List/th-2828420862.png?raw=true",
                    tags: ["dumb", "dumber"]
          }
          
];

// FUNCTION: display array of users in the <main> grid element
function displayUsers(list) {
          const main = document.querySelector("main");

          if (list.length === 0) {
                    // create a blank card
                    const message = document.createElement("h1");

                    // add classes
                    message.classList.add("not-found");

                    // add the message
                    message.textContent = "User Not Found";

                    main.innerHTML = message.outerHTML;
          } else {
                    // Generate the card HTML for all users in the list
                    const html = list.map(item => {
                              // create a blank card
                              const card = document.createElement("div");

                              // add classes
                              card.classList.add("card");

                              // generate descendant children and update the innerHTML of the card
                              card.innerHTML = 
                              `<div class="icon card-image">
                              <img src=${item.image} alt="image of user">
                              </div>
                              <h1 class="card-name">${item.name}</h1>
                              <p class="card-location">${item.location}</p>
                              <div class="tag-box"></div>`;

                              // select the newly created 'tag-box' eleemnt
                              const tagBox = card.querySelector(".tag-box");

                              // create the descendant children tag(s)
                              tagBox.innerHTML = item.tags.map(tag => `<div class="tag">${tag}</div>`).join('');
                              
                              // return the outerHTML which describes the element including its descendants
                              return card.outerHTML;
                              
                    }).join(''); // concatenate multiple entries (if found)
                    
                    // replace the contents fo the <main> grid element with the generated card(s)
                    main.innerHTML = html;  
          }
}

// FUNCTION: find a user by first name, last name or first & last name
function findUser(name, users) {
          const searchTerm = name.trim().toLowerCase();
          
          return users.filter(user => user.name.toLowerCase().includes(searchTerm));
}

//FUNCTION: handle the form submission event
function handleFormSubmitEvent(e) {
          e.preventDefault(); 

          // filter the results 
          const results = findUser(this.value, users);

          // if value is <empty> display all users else display search results
          this.value === "" ? displayUsers(users) : displayUsers(results);
}

// Prevent Default on nav links to prevent redirect error
links.forEach(link => link.addEventListener("click", (e) => e.preventDefault()));

// Add event listener for form submission/search
// form.addEventListener("submit", handleFormSubmitEvent);
search.addEventListener("input", handleFormSubmitEvent);

// On page load, display all users
displayUsers(users);