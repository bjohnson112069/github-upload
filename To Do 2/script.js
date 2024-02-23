const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

// We need an array to hold our state
// let items = [];
let items = [
          {
                    name: "Eggs",
                    id: 1,
                    complete: false
          },
          {
                    name: "Tomatoes",
                    id: 2,
                    complete: false
          },
          {
                    name: "Avocado",
                    id: 3,
                    complete: false
          },
          {
                    name: "Egg noodles",
                    id: 4,
                    complete: true
          },
          {
                    name: "Scampi",
                    id: 5,
                    complete: true
          },
          {
                    name: "Orange juice",
                    id: 6,
                    complete: true
          },
          {
                    name: "Apples",
                    id: 7,
                    complete: true
          }
];

function handleSubmit(e) {
  e.preventDefault();
  console.log('submitted!!');
  const name = e.currentTarget.item.value;

  // if its empty, then dont submit it
  if (!name) return;

  const item = {
    name,
    id: Date.now(),
    complete: false,
  };

  // Push the items into our state
  items.push(item);
  console.log(`There are now ${items.length} in your state`);
  
  // Clear the form
  e.target.reset();
  
  // fire off a custom event that will tell anyone else who cares that the items have been updated!
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function displayItems() {
  const openItems = document.querySelector("#open-items");
  const completeItems = document.querySelector("#completed-items");
  const numComplete = document.querySelector(".num-complete");
  let num = 0;

  // filter for open itmes then generate the inner HTML for the open items list
  let html = items
    .filter(item => !item.complete)
    .map(
      item => `<li class="shopping-item">
        <input type="checkbox" id="${item.id}" name="${item.id}" value="${item.id}" ${item.complete && 'checked'}>
        <label for="${item.id}">
            <div class="icon icon-check" aria-label="Choice"></div>                        
            <span class="item-name">${item.name}</span>
        </label>
        <button aria-label="Remove ${item.name}" value="${item.id}"></button>
      </li>`
    )
    .join('');
    openItems.innerHTML = html;

  // filter for completed itmes then generate the inner HTML for the completed items list and update the number completed
  html = items
    .filter(item => item.complete)
    .map(
      item => {
          num++;
          return `<li class="shopping-item">
                    <input type="checkbox" id="${item.id}" name="${item.id}" value="${item.id}" ${item.complete && 'checked'}>
                    <label for="${item.id}">
                              <div class="icon icon-check" aria-label="Choice"></div>                        
                              <span class="item-name">${item.name}</span>
                    </label>
                    <button aria-label="Remove ${item.name}" value="${item.id}"></button>
          </li>`
      }
    )
    .join('');

    completeItems.innerHTML = html;
    numComplete.textContent = num;
}


function deleteItem(id) {
  console.log('DELETIENG ITEM', id);

  // update our items array without this one
  items = items.filter(item => item.id !== id);

  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function markAsComplete(id) {
  console.log('Marking as complete', id);
  const itemRef = items.find(item => item.id === id);

  itemRef.complete = !itemRef.complete;
  list.dispatchEvent(new CustomEvent('itemsUpdated'));
}

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);


// Event Delegation: We listen or the click on the list <ul> but then delegate the click over to the button if that is what was clicked
list.addEventListener('click', function(e) {
  const id = parseInt(e.target.value);
  if (e.target.matches('button')) {
    deleteItem(id);
  }
  if (e.target.matches('input[type="checkbox"]')) {
    markAsComplete(id);
  }
});

// on page load ...
displayItems();