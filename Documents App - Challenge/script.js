const closeButtons = document.querySelectorAll(".close");
const documents = document.querySelector(".documents");
const list = document.querySelector(".list-box");
const addNew = document.querySelector(".add-new");
const file = document.querySelector(".file");

// We need an array to hold our state
let items = [
          { 
                    name: "Landing page copy",
                    fileType: "word",
                    fileName: "word",
                    id: 111111,
                    filtered: false
          },
          { 
                    name: "Feature brief",
                    fileType: "office",
                    fileName: "office",
                    id: 222222,
                    filtered: false
          },
          { 
                    name: "Landing Logo",
                    fileType: "adobe",
                    fileName: "adobe-illustrator",
                    id: 333333,
                    filtered: false
          }
];

// Function to handle submit events triggered from the form
function addNewItem(e) {
          // prevent the from from resetting
          e.preventDefault();

          console.log("Submitted...");

          // The <form> input elements are accessible via the 'name' HTML attribute
          const fileName = e.target.name.value;
          const fileType = e.target.fileType.value;

          const item = {
                    name: fileName,
                    fileType: fileType,
                    fileName: (fileType === "adobe") ? fileType + '-illustrator': fileType,
                    id: Date.now(),
                    filtered: false
          };

          // Push the items into our state
          items.push(item);
          console.log(`There are now ${items.length} items in your state`);
          
          // Clear the form using reset() or e.currentTarget.item.value = ''
          e.target.reset();

          // close the modal wondiw
          const modal = document.querySelector(".file-select");
          modal.classList.remove("active");
      
          // fire off a custom event that will tell anyone else who cares that the items have been updated
          list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

// Function to create the list <li> elements then add them to the list <ul> element
function displayItems() {

          // iterate over array of items and return a listitem (li) for each one
          list.innerHTML = items.map((item) => {
                    let str = `
                    <li data-value="${item.id}">
                              <div>
                                        <i class="icon icon-${item.fileType}">
                                                  <img src="https://github.com/bjohnson112069/web-images/blob/main/${item.fileName}.png?raw=true" alt="icon of microsoft word" title="icons created by Freepik - Flaticon">
                                        </i>
                                        <h2>Scrumbs / ${item.name}</h2>
                              </div>
                              <button type="button" class="btn remove" data-value="${item.id}"><i class="fa-regular fa-trash-can"></i></button>
                    </li>`;
                    return item.filtered ? "" : str;
          })
          .join('');
}

// Function to add current state to local storage
function mirrorToLocalStorage() {
          console.info('Saving items to localstorage');

          // local storage is text only using toString(); have to use JSON.stringify()/JSON.parse()
          localStorage.setItem('items', JSON.stringify(items));
}
        
// Function to load state from local storage then display list items

function restoreFromLocalStorage() {
          console.info('Restoring from localstorage');

          // pull the items from localStorage
          const lsItems = JSON.parse(localStorage.getItem('items'));
          
          // ensure localStorage exists and is populated with items
          if (lsItems != null && lsItems.length >= 0) {
                    // reinitialize the items array prior to loading from local storage
                    items = [];

                    // spread the localStorage items in to the Array.push() method
                    items.push(...lsItems);

          }
          // fire off a custom event that will tell anyone else who cares that the items have been updated
          list.dispatchEvent(new CustomEvent('itemsUpdated'));
}
        
function deleteItem(id) {
          console.log('DELETIENG ITEM', id);

          // update our items array without this one
          items = items.filter(item => item.id !== id);

          // fire off a custom event that will tell anyone else who cares that the items have been updated
          list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function searchForItem(e) {
          e.preventDefault();

          console.log("Searching for item...");

          const value = this.search.value;

          items.forEach(item => {
                    if (value === "") item.filtered = false;
                    else item.filtered = item.name != value;
          })

          // fire off a custom event that will tell anyone else who cares that the items have been updated
          list.dispatchEvent(new CustomEvent('itemsUpdated'));
}
        
function displayFileDialog(e) {
          e.preventDefault();
          const dialog = document.querySelector(".file-select");
          dialog.classList.add("active");
}

function closeModal() {
          const modal = this.parentElement;
          modal.classList.remove("active");
}

// add eventListener to close the modal window
closeButtons.forEach(button => button.addEventListener("click", closeModal));

// add eventlistener top open a new dialog window
addNew.addEventListener("click", displayFileDialog);

// add eventlistener for 'submit' on form
documents.addEventListener("submit", searchForItem)

// add eventListener for custom event ('itemsupdated')
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);

// Event Delegation: We listen or the click on the list <ul> but then delegate the click over to the button if that is what was clicked
list.addEventListener('click', function(e) {
          // move from the clicked element <i> to the parent <button> element and store the data value
          const id = parseInt(e.target.parentElement.dataset.value);

          if (e.target.parentElement.matches('button')) {
            deleteItem(id);
          }
});

file.addEventListener("submit", addNewItem);

// run on page load
restoreFromLocalStorage();
