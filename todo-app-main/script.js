const htmlElement = document.documentElement;

// We need a boolean variable to hold our color theme state; true = dark-mode, false= light-mode
let darkTheme = true;

// Function to set the custom (color) properties associated with the color theme(s)
function setColorProperties(dark) {
          console.log("Dark theme:", dark)

          // toggle the (boolean) value; true = dark-mode, false= light-mode
          theme.dataset.darkMode = dark;
          darkTheme = dark;

          // store the state of the curren theme in local storage
          localStorage.setItem('theme', JSON.stringify(darkTheme));


          // set custom properties in html root element
          if (dark) {                    
                    // set variable for background image files
                    htmlElement.style.setProperty("--bg-image", "url(./images/bg-desktop-dark.jpg)");
                    htmlElement.style.setProperty("--bg-fallback", "url(./images/bg-mobile-dark.jpg)");

                    /* ### THEME: DARK ### */
                    htmlElement.style.setProperty("--clr-bg--main", "var(--clr-very-dark-blue, red)");
                    htmlElement.style.setProperty("--clr-bg--form", "var(--clr-very-dark-desaturated-blue, red)");
                    htmlElement.style.setProperty("--clr-bg--list", "var(--clr-very-dark-desaturated-blue, red)");
                    htmlElement.style.setProperty("--clr-title--text", "var(--clr-white, red)");
                    htmlElement.style.setProperty("--clr-form--text", "var(--clr-light-grayish-blue-2, red)");
                    htmlElement.style.setProperty("--clr-form--placeholder", "var(--clr-dark-grayish-blue-2, red)");
                    htmlElement.style.setProperty("--clr-list--shadow", "var(--clr-very-dark-blue, red)");
                    htmlElement.style.setProperty("--clr-item--text", "var(--clr-light-grayish-blue-2, red)");
                    htmlElement.style.setProperty("--clr-item--completed", "var(--clr-very-dark-grayish-blue-1, red)");
                    htmlElement.style.setProperty("--clr-item--hover", "var(--clr-light-grayish-blue-hover, red)");
                    htmlElement.style.setProperty("--clr-active--text", "var(--clr-bright-blue, red)");
                    htmlElement.style.setProperty("--clr-border", "var(--clr-very-dark-grayish-blue-2, red)");
                    htmlElement.style.setProperty("--clr-footer--text", "var(--clr-very-dark-grayish-blue-1, red)");
          } else {
                    // set variable for background image files
                    htmlElement.style.setProperty("--bg-image", "url(./images/bg-desktop-light.jpg)");
                    htmlElement.style.setProperty("--bg-fallback", "url(./images/bg-mobile-light.jpg)");

                    /* ### THEME: LIGHT ### */
                    htmlElement.style.setProperty("--clr-bg--main", "var(--clr-very-light-gray, red)");
                    htmlElement.style.setProperty("--clr-bg--form", "var(--clr-white, red)");
                    htmlElement.style.setProperty("--clr-bg--list", "var(--clr-white, red)");
                    htmlElement.style.setProperty("--clr-title--text", "var(--clr-white, red)");
                    htmlElement.style.setProperty("--clr-form--text", "var(--clr-very-dark-grayish-blue, red)");
                    htmlElement.style.setProperty("--clr-form--placeholder", "var(--clr-dark-grayish-blue-1, red)");
                    htmlElement.style.setProperty("--clr-list--shadow", "var(--clr-very-light-grayish-blue, red)");
                    htmlElement.style.setProperty("--clr-item--text", "var(--clr-very-dark-grayish-blue, red)");
                    htmlElement.style.setProperty("--clr-item--completed", "var(--clr-light-grayish-blue-1, red)");
                    htmlElement.style.setProperty("--clr-item--hover", "var(--clr-dark-grayish-blue-1, red)");
                    htmlElement.style.setProperty("--clr-active--text", "var(--clr-bright-blue, red)");
                    htmlElement.style.setProperty("--clr-border", "var(--clr-light-grayish-blue-1, red)");
                    htmlElement.style.setProperty("--clr-footer--text", "var(--clr-dark-grayish-blue-1, red)");
          }


}

// Function to handle the color theme click event
function handleColorSwap() {
          // create boolean value from string
          const darkMode = (this.dataset.darkMode === "true");

          // set the custom (color) properties associated with the color theme(s)
          setColorProperties(!darkMode);
}

// listen for when someone types into the input and hits the enter key
// keep track of all the  list items and whether or not they are complete
// render out the list of items
const form = document.querySelector("form");
const list = document.querySelector('.list');

// We need an array to hold our state
let items = [];

// We need a variable to hold our filter state; All (default)
let displayFilter = "All";

// Function to add current state to local storage
function setDisplayFilter(value) {
          console.info('Saving display filter to localstorage');
          // local storage is text only using toString(); have to use JSON.stringify()/JSON.parse()
          localStorage.setItem('filter', JSON.stringify(displayFilter));
}
        
// Function to handle submit events triggered from the form
function handleSubmitEvent(e) {
          // prevent the from from resetting
          e.preventDefault();

          console.log("Submitted...")

          // the <input> element is accessible via the 'name' attribute (e.g. 'todo') on the form/currentTarget
          const name = e.currentTarget.todo.value;

          // if it is empty, then dont submit it
          if (!name) return;

          const item = {
                    name,
                    id: Date.now(),
                    complete: false,
          };
          
          // Push the items into our state
          items.push(item);
          console.log(`There are now ${items.length} items in your state`);
          
          // Clear the form using reset() or e.currentTarget.item.value = ''
          e.target.reset();
      
          // fire off a custom event that will tell anyone else who cares that the items have been updated
          list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

// Function to create the list <li> elements then add them to the list <ul> element
function displayItems() {
          let numActive = 0;

          // iterate over array of items and return a listitem (li) for each one
          const html = items.map((item) => {
                    const str = `<li class="wrapper item ${item.complete ? 'completed' : ''}" draggable="true">
                              <input 
                                        value="${item.id}" 
                                        type="checkbox"
                                        id="checkbox"
                                        ${item.complete ? 'checked' : ''}
                                        >
                              <label class="circle" for="checkbox" data-value="${item.id}"></label>
                              <span class="item-name">${item.name}</span>
                              <button 
                                        aria-label="Remove${item.name}"
                                        data-value="${item.id}">
                              </button>
                    </li>`;

                    // if item is not complete (e.g. active) increment number of active items
                    if (!item.complete) numActive++;

                    // displayFilter = "Active"
                    if (displayFilter === "Active" && !item.complete)
                              return str;
                    else if (displayFilter === "Completed" && item.complete)
                              return str;
                    else if (displayFilter === "All") 
                              return str;
          })
          .join('');
          list.innerHTML = html;

          // update the number of items left based on the number of children currently in the list
          const itemsLeft = document.querySelector(".items-left");
          itemsLeft.textContent = numActive;
}

// Function to add current state to local storage
function mirrorToLocalStorage() {
          console.info('Saving items to localstorage');
          // local storage is text only using toString(); have to use JSON.stringify()/JSON.parse()
          localStorage.setItem('items', JSON.stringify(items));
          localStorage.setItem('filter', JSON.stringify(displayFilter));
}
        
// Function to load state from local storage then display list items
function restoreFromLocalStorage() {
          console.info('Restoring items from localstorage');
          // local storage is text only using toString(); have to use JSON.stringify()/JSON.parse()
          // Pull the items from local storage
          const lsItems = JSON.parse(localStorage.getItem('items'));
          const lsFilter = JSON.parse(localStorage.getItem('filter'))
          const lsTheme = JSON.parse(localStorage.getItem('theme'));

          // set the current state of the color theme from local storage
          if (lsTheme != null) darkTheme = lsTheme;

          // set the current state of the display filter from local storage
          displayFilter = lsFilter;

          // iterate through the filter buttons and set the current filter to 'active'
          const buttons = filter.querySelectorAll("button");
          buttons.forEach(button => button.value === displayFilter ? button.classList.add("active") : "")

          // if local storage items is undefined/does not exist then exit
          if (!lsItems || lsItems.length <= 0) return;

          // local storage items exist and is not empty ...

          // use spread operator to pass all elements to push() method
          items.push(...lsItems); 

          // fire off a custom event that will tell anyone else who cares that the items have been updated
          list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

// Function to delete items from the list using "id"
function deleteItem(id) {
          console.log(`Deleting Item, ID: ${id}`);
          // update our items array without this one; filter and overwrite
          items = items.filter((item) => item.id !== id);
        
          // fire off a custom event that will tell anyone else who cares that the items have been updated
          list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

// Function to mark a list item complete using "id"
function markAsComplete(id) {
          if (!id) return;
          console.log(`Marking as complete ${id}`);

          // return item and use it as a reference into items array
          const itemRef = items.find((item) => item.id === id);
          itemRef.complete = !itemRef.complete;

          // fire off a custom event that will tell anyone else who cares that the items have been updated
          list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

// Function to clear all Completed list items
function clearCompleted() {
          console.log(`Deleting Completed Items`);
          // update our items array without this one; filter and overwrite
          items = items.filter((item) => !item.complete);

          // fire off a custom event that will tell anyone else who cares that the items have been updated
          list.dispatchEvent(new CustomEvent('itemsUpdated'));
}
        
// Function to handle click event on the list
function handleClickEvent(e) {
          // target = what you clicked on; currentTarget = what you listen on
          // target.value = id attribute on the <button> list item
          const id = parseInt(e.target.dataset.value);

          // if <button> element then delete the list item
          if (e.target.matches('button')) {
                    deleteItem(id);
          }

          // if <input type='checkbox'> then mark the list item complete
          if (e.target.matches('label')) {
                    markAsComplete(id);
          }
}

// Function to handle click event on thbe filter
function handleFilterEvent(e) {
          // set the state of the display filter to the current value of the button that was clicked
          displayFilter = e.target.value;

          // select all fitler buttons
          const buttons = this.querySelectorAll("button");
          buttons.forEach(button => {
                    // remove the 'active' class from all buttons
                    button.classList.remove("active");

                    // if the current button is the one that was clicked then add the 'active' class
                    if (button.value === e.target.value) {
                              button.classList.add("active");
                    }
          })
                
          // fire off a custom event that will tell anyone else who cares that the items have been updated
          list.dispatchEvent(new CustomEvent('itemsUpdated'));

}

// Citation: https://www.youtube.com/watch?v=9HUlUnM3UG8
function handleDragEvent(e) {

          // when the drag is started add a class (.dragging) to the item (li) for styling purposes
          if (e.type === "dragstart") {
                    if (e.target.matches('li')) {
                              // Adding dragging class to the item after a delay
                              setTimeout(() => e.target.classList.add("dragging"), 0);
                    }
          
                    // Removing dragging class from the item on dragend event
                    e.target.addEventListener("dragend", () => e.target.classList.remove("dragging"));          
          }

          // whend dragging over list items calculate the next sibling and insert before
          if (e.type === "dragover") {
                    // prevent the no-drop cursor from appearing
                    e.preventDefault();

                    const draggingItem = list.querySelector(".dragging");
                    // Getting all items except currently dragging and making array of them
                    const siblings = Array.from(list.querySelectorAll(".item:not(.dragging)"));

                    // Finding the sibling after which the draggin item should be placed
                    let nextSibling = siblings.find(sibling => {
                              return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
                    });
                    // Inserting the dragging item before the found sibling
                    list.insertBefore(draggingItem, nextSibling);

          }
          
          // once the drag is complete regenerate the items array based on the current list of items
          if (e.type === "dragend") {
                    // need to update items array
                    const listItems = list.querySelectorAll(".item")

                    // re-initialize the items array
                    items = [];

                    // iterate through the list (li) items and rebuild the items object
                    listItems.forEach(item => {
                              const itemName = item.querySelector(".item-name").textContent;
                              const itemID = parseInt(item.querySelector("input").value);
                              const itemComplete = item.matches(".completed");

                              const newItem = {
                                        name: itemName,
                                        id: itemID,
                                        complete: itemComplete
                              };

                              // push the new items into the items array
                              items.push(newItem);
                    })

                    // fire off a custom event that will tell anyone else who cares that the items have been updated.  display items and update local storage
                    list.dispatchEvent(new CustomEvent('itemsUpdated'));
          }
}

// add eventlistener for 'submit' on form
form.addEventListener("submit", handleSubmitEvent);

// add eventListener for custom event ('itemsupdated')
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);

// Event Delegation; we listen for the click on the list (ul) but then delegate the click over to the button if that is what was clicked.
list.addEventListener('click', handleClickEvent);

// Event Delegation: we listeN for dragstart on the list (ul) but delegate the dragstart to the item (li)
list.addEventListener('dragstart', handleDragEvent);
list.addEventListener('dragend', handleDragEvent);
// add event listener to handle dragging the item within the list
list.addEventListener('dragover', handleDragEvent);

// add event listener to prevent default behavior on enter
list.addEventListener('dragenter', e => e.preventDefault());

// add event listeners for the filter buttons
const filter = document.querySelector(".filter");
filter.addEventListener("click", handleFilterEvent);

// add event listener for the Clear Completed button
const clear = document.querySelector(".clear");
clear.addEventListener("click", clearCompleted);

// add event listener for the Color Theme button
const theme = document.querySelector(".theme");
theme.addEventListener("click", handleColorSwap);

// run on page load
setColorProperties(darkTheme);
setDisplayFilter(displayFilter);
restoreFromLocalStorage();
