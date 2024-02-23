const listElements = document.querySelectorAll(".list")
const links = document.querySelectorAll("a");


// We need an array to hold our state
let lists = {
  email: [
    {
        value: "johnjohnson",
        id: 1,
        primary: true
    },
    {
        value: "johnsoncompany@mail.com",
        id: 2,
        primary: false
    }
  ],
  phone: [
    {
        value: "123-456-7890",
        id: 1,
        primary: true
    },
    {
        value: "111-222-3333",
        id: 2,
        primary: false
    }
  ]
}


function createList(form) {
          if (!(form instanceof Element)) {
                    throw new Error('No form element passed in');
          }

          const list = form.querySelector("ul");
          let input = form.querySelector(".user-input").querySelector("input");
          let type, value;

          type = input.name;

          function handleSubmit(e) {
                e.preventDefault();
                // console.log('submitted!!');

                input = this.querySelector(".user-input").querySelector("input");
                type = input.name;
                value = input.value;

                // if its empty, then dont submit it
                if (!value) return;
        
                const item = {
                            value,
                            id: Date.now(),
                            primary: false
                };
                // Push the items into our state
                lists[type].push(item);
                // console.log(`There are now ${lists[type].length} in your state`);

                // Clear the form
                this.reset();

                // fire off a custom event that will tell anyone else who cares that the items have been updated!
                list.dispatchEvent(new CustomEvent('itemsUpdated'));
        }
        
        function displayItems() {
            let header = form.querySelector("h2");
            let html;

            if (lists[type].length === 0) {
                html = `<li class="list-empty">
                    <h2>You haven't added any ${type === "email" ? "email addresses" : "phone numbers"} yet.</h2>
                    <p>Your ${type} helps us keep your account secure.  It also helps people who already have your number discover and connect with you.</p>
                    </li>`
            }
            else {
                html = lists[type].map(item => `<li class="list-item">
                <p>${item.value}<span class="primary ${item.primary ? "active" : ""}">primary</span></p>
                <div class="dropdown">
                    <button class="dropdown-btn" type="button">
                        <i class="fa-solid fa-ellipsis"></i>
                    </button>
                    <ul class="dropdown-items" aria-hidden="true">
                        <li class="dropdown-item" data-value="primary" data-id="${item.id}">
                            <a href="#" class="dropdown-link">Make Primary</a>
                        </li>
                        <li class="dropdown-item" data-value="edit" data-id="${item.id}">
                            <a href="#" class="dropdown-link">Edit</a>
                        </li>
                        <li class="dropdown-item" data-value="delete" data-id="${item.id}">
                            <a href="#" class="dropdown-link">Delete</a>
                        </li>
                    </ul>
                </div>    
                </li>`
                )
                .join('');
            }

            list.innerHTML = html;
        }
        
        function deleteItem(id) {
                // console.log('DELETIENG ITEM', id);

                // update our items array without this one
                lists[type] = lists[type].filter(item => item.id !== id);
                
                list.dispatchEvent(new CustomEvent('itemsUpdated'));
        }

        function makePrimary(id) {

            lists[type].forEach(item => {
                item.id === id ? item.primary = true : item.primary = false;
            })
                     
            list.dispatchEvent(new CustomEvent('itemsUpdated'));
        }

        
        function toggleDropDownVisibility(dropdownBtn, dropdownList) {
            // Query current visibility of the dropdown list and convert to boolean value
            let isHidden= dropdownList.getAttribute("aria-hidden") === "true";

            // Toggle active state of the dropdown button and dropdown list based on the aria-hidden attribute:
            // button: not active (default), dropdown list: hidden = true
            // button: active, dropdownlist: hidden = false
            dropdownBtn.classList.toggle("active", isHidden);
            dropdownList.setAttribute("aria-hidden", `${!isHidden}`);
        }

        // Event Delegation handler for <ul> list
        function handleDropDownClickEvent(e) {

            // Handle Drop Down Button click
            if (e.target.matches(".dropdown-btn"))
            {
                // selec all dropdown buttons
                const form = e.target.form;
                const buttons = form.querySelectorAll(".dropdown-btn");
                let dropdownList;
                
                // iterate through all dropdown buttons 
                buttons.forEach(button => {
                    // select the dropdown items
                    dropdownList = button.nextElementSibling;
                    
                    // if the currnet button was clicked ...
                    if (button === e.target) {
                        // Set active state of the dropdown button and dropdown list
                        toggleDropDownVisibility(e.target, dropdownList);
                    }
                    else {
                        // make the button inactive and hide the dropdown items
                        button.classList.remove("active");
                        dropdownList.setAttribute("aria-hidden", "true");
                    }
                })
            }

            // Handle Drop Down Menu Selection (e.g. <li> element)
            if (e.target.matches(".dropdown-item")) {
                const selection = e.target.dataset.value;
                const id = e.target.dataset.id;

                if (selection === "delete") deleteItem(parseInt(id));

                if (selection === "primary") makePrimary(parseInt(id));

                // Future ReFactor: Edit selection

            }
        }

        // Event listeners ...
        form.addEventListener('submit', handleSubmit);
        list.addEventListener('itemsUpdated', displayItems);
        list.addEventListener("click", handleDropDownClickEvent);

        list.dispatchEvent(new CustomEvent('itemsUpdated'))
}

// Create the lists (from each form element) ...
const emailList = createList(document.querySelector("#email"));
const phoneList = createList(document.querySelector("#phone"));


// Prevent default behavior for all <a> links
links.forEach(link => link.addEventListener("click", (e) => e.preventDefault()));
