async function loadContent() {
    const form = document.querySelector('.cart-form');
    const confirmation = document.querySelector('.confirmation-modal');
    const newOrder = document.querySelector('#start-new-order');

    // Configuration parameters
    let cart = [];

    // Function to filter the items array by ID
    function findProductByID(array, id) {
        return  array.find(item => item.id === id);
    }

    // Function to remove an item from the cart array using ID
    function removeProductFromCart(id) {
        
        // find the index of the item matching the id and remove it (count = 1) from the array
        cart.splice(cart.findIndex(item => item.id === id), 1);
        
        // display the updated cart
        displayCart();
        
        // (Un)select the product
        const dessert = document.querySelector(`.dessert[data-id="${id}"]`);
        const qtyLabel = dessert.querySelector('#edit-quantity > .quantity');
        dessert.classList.remove('selected')

        // reinitialize the quantity label
        qtyLabel.textContent = 1;
    }

    // Function to handle the click event to remove item(s) from the cart
    function handleRemoveItemClick() {
        const id = Number(this.value);

        removeProductFromCart(id);
    }

    // Function to display the cart
    function displayCart() {
        const container = document.querySelector('.cart-container')
        const list = document.querySelector('.cart-items');
        const itemCount = document.querySelector('.item-count');
        let count = 0;
        let total = 0;

        // check the cart array length
        // if array is empty then mark the parent container as 'empty'
        // otherwise, iterate through the array and generate the HTML
        if (cart.length === 0) {
            container.classList.add('empty');
        } else {
            container.classList.remove('empty');

            list.innerHTML = cart.map(item  => {
                const product = findProductByID(items, item.id);
                const cost = item.quantity * product.price;
                total += cost;
                count += item.quantity;
    
                return `<!-- ITEM -->
                    <li class="cart-item">
                        <div class="item-details">
                            <span class="name">${product.name}</span>
                            <div class="price-details">
                                <span class="quantity">${item.quantity}x</span>
                                <p>@ <span class="price">$${product.price.toFixed(2)}</span></p>
                                <span class="cost">$${cost.toFixed(2)}</span>
                            </div>
                        </div>
                        <button type="button" id="remove-item" aria-label="remove item" value="${item.id}">
                            <svg class="icon">
                                <use xlink:href="#icon-remove-item"></use>
                            </svg>    
                        </button>
                    </li>`;
            }).join('');

            // update the order total
            const totalLabel = document.querySelector('.order-total > .total');
            totalLabel.textContent =`$${total.toFixed(2)}`;
        }

        // Update Cart Item Count
        itemCount.textContent = count;

        // Event Listeners
        const removeItemBtns = document.querySelectorAll('#remove-item');

        removeItemBtns.forEach(button => button.addEventListener('click', handleRemoveItemClick));
    }

    // Function to handle the Add To Cart Button Click
    function handleAddToCartClick() {
        const dessert = this.closest('.dessert');
        const id = Number(dessert.dataset.id);

        // Mark the item clicked on as selected
        dessert.classList.add('selected');

        // Store the item ID and initial quantity (default: 1)
        const myItem = {
            "id": id,
            "quantity": 1
        }

        // Push the object into the cart array
        cart.push(myItem);

        // update/display the cart
        displayCart();
    }

    // Function to handle click events which modify the quantity
    function modifyQuantity() {
        const dessert = this.closest('.dessert');
        const id = Number(dessert.dataset.id);
        const qtyLabel = dessert.querySelector('#edit-quantity > .quantity');

        // Find the product by ID
        const product = findProductByID(cart, id);

        // modify the quantity
        this.id === "increment-quantity" ? product.quantity++ : product.quantity--;

        // check for lower bound (< 1)
        product.quantity = product.quantity < 0 ? 0 : product.quantity;
        // check for upper bound (> 100)
        product.quantity = product.quantity > 100 ? 100 : product.quantity;

        // update/display the cart
        displayCart();

        // if the quantity is zero
        // unselect the product
        // remove the product from the cart
        // reinitialize the quantity label
        if (product.quantity === 0) {
            removeProductFromCart(id);
        } else {
            // update the label with quantity value
            qtyLabel.textContent = product.quantity;
        }
    }

    // Function to display the product cards
    function displayItems(array) {
        const list = document.querySelector('.desserts');

        list.innerHTML = array.map((item, index) => {
            return `<!-- LIST ITEM -->
                <li class="dessert" data-id="${item.id}">
                    <!-- IMAGE -->
                    <div class="image">
                        <img src="${item.image.desktop}" alt="${item.name}">
                    </div>
                    <!-- ACTIONS -->
                    <div class="actions">
                        <button class="action" id="add-to-cart">
                            <svg class="icon">
                                <use xlink:href="#icon-add-to-cart"></use>
                            </svg>
                            <span>Add to Cart</span>
                        </button>
                        <div class="action" id="edit-quantity">
                            <button type="button" id="decrement-quantity" aria-label="decrement quantity">
                                <svg class="icon">
                                    <use xlink:href="#icon-decrement-quantity"></use>
                                </svg>
                            </button>
                            <span class="quantity">1</span>
                            <button type="button" id="increment-quantity" aria-label="increment quantity">
                                <svg class="icon">
                                    <use xlink:href="#icon-increment-quantity"></use>
                                </svg>                        
                            </button>
                        </div>
                    </div>
                    <!-- INFORMATION -->
                    <div class="information">
                        <span class="category">${item.category}</span>
                        <span class="name">${item.name}</span>
                        <span class="price">$${item.price.toFixed(2)}</span>
                    </div>
                </li>`;
        }).join('');

        // Event Listeners
        const addToCartBtns = document.querySelectorAll('#add-to-cart');

        addToCartBtns.forEach(button => button.addEventListener('click', handleAddToCartClick));

        const quantityBtns = document.querySelectorAll('#edit-quantity > button');
        quantityBtns.forEach(button => button.addEventListener('click', modifyQuantity));
    }

    // Function to display the final/confirmed order
    function displayFinalOrder() {
        const list = document.querySelector('.order-items');
        let total = 0;

        list.innerHTML = cart.map(item  => {
            const product = findProductByID(items, item.id);
            const cost = item.quantity * product.price;
            total += cost;
            
            return `<!-- LIST ITEM -->
                <li class="order-item">
                    <img class="thumbnail" src="${product.image.thumbnail}" alt="${product.name}">
                    <div class="item-details">
                        <span class="name">${product.name}</span>
                        <div class="price-details">
                            <span class="quantity">${item.quantity}x</span>
                            <p>@ <span class="price">$${product.price.toFixed(2)}</span></p>
                        </div>
                    </div>
                    <span class="cost">$${cost.toFixed(2)}</span>
                </li>`;
        }).join('');

        // update the order total
        const totalLabel = document.querySelector('.order-details .total');
        totalLabel.textContent =`$${total.toFixed(2)}`;
    }

    // Function to handle cart/form submisssion
    function handleFormSubmision(e) {
        e.preventDefault();

        // activate the confirmation modal
        confirmation.classList.add('active');

        displayFinalOrder();
    }

    // Function to start a new order
    function startNewOrder() {
        // close the confirmation modal
        confirmation.classList.remove('active');

        // select all product menu items
        const desserts = document.querySelectorAll(`.dessert`);

        // iterate through all items and reinitialize
        desserts.forEach(dessert => {
            // (un)select all products
            dessert.classList.remove('selected');

            // select the quantity label
            const qtyLabel = dessert.querySelector('#edit-quantity > .quantity');
        
            // reinitialize the quantity label
            qtyLabel.textContent = 1;
        });

        // reinitialize the cart
        cart = [];

        // display the cart
        displayCart();

        // scroll to the top
        setTimeout(() => {

            window.scrollTo({ top: '0', behavior: 'smooth' });
        }, 1000)
    }
    
    // Function to fet data from a specified end point
    async function fetchData(endpt) {
        const response = await fetch(`${endpt}`, {
            headers: {
                Accept: 'application/json',
            },
        });
        const data = await response.json();
        return data;
    }

    // On page load... 
    
    // fetch data from local JSON file
    const items = await fetchData(`./data.json`);
    
    displayItems(items);

    // Event Listeners
    form.addEventListener('submit', handleFormSubmision);
    newOrder.addEventListener('click', startNewOrder);
}

window.addEventListener('DOMContentLoaded', loadContent);