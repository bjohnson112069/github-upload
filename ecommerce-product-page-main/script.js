
let selectedProduct = {
          id: 1694006803598,
          complete: false,
          inventoryCount: 100,
          quantity: 0,
          company: "sneaker company",
          title: "fall limited edition sneakers",
          description: "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
          unitPrice: "250.00",
          salePercentage: "50",
          salePrice: "0",
          images: {
                    image1: {
                              dataDescription: "image1",
                              largeImage: "./images/image-product-1.jpg",
                              thumbnailImage: "./images/image-product-1-thumbnail.jpg",
                              alt: "Product Image #1"
                    },
                    image2: {
                              dataDescription: "image2",
                              largeImage: "./images/image-product-2.jpg",
                              thumbnailImage: "./images/image-product-2-thumbnail.jpg",
                              alt: "Product Image #2"
                    },
                    image3: {
                              dataDescription: "image3",
                              largeImage: "./images/image-product-3.jpg",
                              thumbnailImage: "./images/image-product-3-thumbnail.jpg",
                              alt: "Product Image #3"
                    },
                    image4: {
                              dataDescription: "image4",
                              largeImage: "./images/image-product-4.jpg",
                              thumbnailImage: "./images/image-product-4-thumbnail.jpg",
                              alt: "Product Image #4"
                    }
          }

}

const incrementButton = document.querySelector(".increment");
const decrementButton = document.querySelector(".decrement");

// On (increment) button click, call the .stepUp() prototype function of the numeric textfield
// The numeric textfield will keep track of the current value
incrementButton.addEventListener("click", (e) => {
          const numericInput = e.currentTarget.previousElementSibling;
          numericInput.stepUp();
          // qtyValue.stepUp();
})

// On (decrement) button click, call the .stepDown() prototype function of the numeric textfield
// The numeric textfield will keep track of the current value
decrementButton.addEventListener("click", (e) => {
          const numericInput = e.currentTarget.nextElementSibling;
          numericInput.stepDown();
})

const shoppingForm = document.querySelector(".add-to-cart-form")
const shoppingList = document.querySelector(".shopping-list");
const cartBadge = document.querySelector(".badge");
const cartButton = document.querySelector(".cart");

// We need an array to store our state
let cart = [];

// On (Add to cart) button submit...
function handleSubmit(e) {
          // prevent the form from resetting
          e.preventDefault();

          // Store the value of the numeric input using the "id" attribute
          const value = e.currentTarget.quantity.value;

          selectedProduct.inventoryCount -= value;

          // The findIndex() method returns the index of the first element in the array that satisfies the provided testing function. Otherwise -1 is returned.

          // Search the cart for the selected product ID
          const cartIndex = cart.findIndex(item => item.id === selectedProduct.id);

          if (cartIndex > -1) {
                    // If ID was found use the index to update the quantity and price
                    cart[cartIndex].quantity += parseInt(value);
                    cart[cartIndex].totalPrice = parseFloat(cart[cartIndex].quantity * cart[cartIndex].unitPrice).toFixed(2);
          } else {
                    // if ID was not found/does not exist then add a new item to the cart
                    console.info(`Adding ${value} of this product to state`);
                    let cartItem = {
                              id: selectedProduct.id,
                              complete: false,
                              image: `${selectedProduct.images.image1.thumbnailImage}`,
                              alt: `${selectedProduct.images.image1.alt}`,
                              title: `${selectedProduct.title}`,
                              unitPrice: `${selectedProduct.salePrice}`,
                              quantity: 0,
                              totalPrice: 0
          
                    };
                    cartItem.quantity += parseInt(value);
                    cartItem.totalPrice = parseFloat(cartItem.quantity * cartItem.unitPrice).toFixed(2);
          
                    // Push the selected product into our state
                    cart.push(cartItem);
          }

          // Clear the form (target not currentTarget)
          e.target.reset();
          
          // Dispatch a custom event that will tell anyone else who cares that the items have been updated!
          shoppingList.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function displayCartBadge() {
          let cartTotal = 0;

          // Loop through the cart and total the quanity for each item
          cart.forEach(item => {
                    cartTotal += item.quantity;
          })
          
          // Update the content of the cart badge
          cartBadge.textContent = cartTotal;

          // make the badge active if the total is > 0
          // disable the cart button if the cart total is 0
          if (cartTotal > 0) {
                    cartBadge.classList.add("active");
          } else {
                    cartBadge.classList.remove("active");
          }
}

function displayCartItems() {

          let html;

          if (cart.length === 0) {
                    html = `<li class="shopping-list-empty">Your cart is empty.</li>`;
                    checkoutButton.classList.remove("active");
          }
          else {
                    // Convert the cart array to HTML List Item(s).  array.map().join("")
                    html = cart.map(item => {
                              return `
                              <li class="shopping-list-item">
                                        <img class="checkout-thumbnail" src="${item.image}" alt="${item.alt}">
                                        <div class="checkout-product-details">
                                                  <h1 class="checkout-product-title">${item.title}</h1>
                                                  <div class="checkout-price-details">
                                                            <p class="checkout-sale-price">${item.unitPrice}</p>
                                                            <p>x</p>
                                                            <p class="checkout-quantity">${item.quantity}</p>
                                                            <p class="checkout-total">${item.totalPrice}</p>
                                                  </div>
                                        </div>
                                        
                                        <button type="button" class="checkout-delete-item" aria-label="Remove item" value=${item.id}>
                                        </button>
                              </li>`;
                    }).join("");
                    checkoutButton.classList.add("active");
          }
          shoppingList.innerHTML = html;
}

function mirrorToLocalStorage() {
          console.info(`Saving items to localstorage`);
          // JSON.stringify() converts and object to a string
          localStorage.setItem('cart', JSON.stringify(cart));

}

function restoreFromLocalStorage() {
          
          // Pull the items from local storage.  JSON.parse() converts string to an object
          const localStorageCart = JSON.parse(localStorage.getItem('cart'));

          if (!localStorageCart) return;
          
          if (localStorageCart.length) {
                    console.info(`Restoring items from localstorage`);
                    // spread the contents of local storage into the push() function
                    // equivalent to localStorageCart.forEach(item => items.push(item));
                    cart.push(...localStorageCart);
                    // Dispatch a custom event that will tell anyone else who cares that the items have been updated!
          }
          shoppingList.dispatchEvent(new CustomEvent('itemsUpdated'));
}

function deleteItemFromCart(id) {
          console.info(`Deleting item with ID:${id} from cart`);
          // Update/Filter the cart array without this item
          cart = cart.filter(item => item.id !== id);
          // Dispatch a custom event that will tell anyone else who cares that the items have been updated!
          shoppingList.dispatchEvent(new CustomEvent('itemsUpdated'));
}

shoppingForm.addEventListener("submit", handleSubmit);
// Listen for custom event (itemsUpdated) and call displayCartItems frunction
shoppingList.addEventListener('itemsUpdated', displayCartItems);
// Listen for custom event (itemsUpdated) and call displayCartBadge frunction
shoppingList.addEventListener('itemsUpdated', displayCartBadge);
// Listen for custom event (itemsUpdated) and call mirrorToLocalStorage frunction
shoppingList.addEventListener('itemsUpdated', mirrorToLocalStorage);

// Event delegation.  Listen for click events on the shoppingList (ul) but then delegate the click over to the button if that is whas was clicked
shoppingList.addEventListener('click', e => {
          // tgarget is what was clicked (e.g. button element)
          // currentTareget is the event listener (e.g. ul element)
          // The matches() method of the Element interface tests whether the element would be selected by the specified CSS selector.
          if(e.target.matches('.checkout-delete-item')) {
                    // pass the ID 'value' from the button we added in the innerHTML
                    // value is stored as a string so use parseInt() to conver to a number
                    deleteItemFromCart(parseInt(e.target.value));
          }
})

const cartContainer = document.querySelector(".shopping-list-container");
const checkoutButton = document.querySelector(".checkout");

function toggleCartContainer() {
          cartContainer.classList.toggle("active");
}

cartButton.addEventListener("click", toggleCartContainer);
checkoutButton.addEventListener("click", toggleCartContainer);


// On Page Load, calculate the sales price
function calculateSalePrice() {
          selectedProduct.salePrice = parseFloat(selectedProduct.unitPrice * selectedProduct.salePercentage / 100).toFixed(2);
}

function displaySelectedProduct(product) {
          // Display Product Preview
          const thumbnailContainer = document.querySelector(".thumbnail-container");
          const thumbnails = Array.from(thumbnailContainer.querySelectorAll("img"));

          thumbnails.map((thumbnail, index) => {
                    let objectIndex = `image${index + 1}`;
                    thumbnail.src = product.images[objectIndex].thumbnailImage;
                    thumbnail.alt = product.images[objectIndex].alt;
                    thumbnail.dataset.description = product.images[objectIndex].dataDescription;
          });


          // Display Product Details
          const productDetails = document.querySelector(".product-details");
          const productCompany = productDetails.querySelector(".company-name");
          const productTitle = productDetails.querySelector(".product-title");
          const productDescription = productDetails.querySelector(".product-description");
          const productSalesPrice = productDetails.querySelector(".sale-price");
          const productSalesPercentage = productDetails.querySelector(".sales-percentage");
          const productUnitPrice = productDetails.querySelector(".original-price");

          productCompany.textContent = product.company;
          productTitle.textContent = product.title;
          productDescription.textContent = product.description;
          productSalesPrice.textContent = `$${product.salePrice}`;
          productSalesPercentage.textContent = `${product.salePercentage}%`;
          productUnitPrice.textContent = `$${product.unitPrice}`;

}



function openLighthouse(e) {
          outerModal.classList.add("active");
}

function closeLighthouse(e) {

          // currentTarget is listener (e.g. outer modal)
          // target is what generated the click event
          // if the target is the currentTarget (outer modal) then close the outer modal
          // if the targvet is the close button then close the outer modal
          if (e.target === e.currentTarget || e.target.matches('.close-lighthouse')) outerModal.classList.remove("active");
}

function handleThumbnailClick(e) {          
          // update the current/prev/next status for the slider; pass current image
          updateSliderState(e.target.name);

          // Dispatch a custom event that will tell all carousels that a new image was selected
          // Pass custom details (e.g. image name attribute) in the event
          largeImages.forEach(image => {
                    image.dispatchEvent(new CustomEvent('imageUpdated', { detail: {name: e.target.name} }));
          });

}

function updateCurrentImage(e) {
          // use the name attribute from the custom event details as an index into the Object.images[] array
          const imageIndex = e.detail.name;
          e.target.src = selectedProduct.images[imageIndex].largeImage;

          // loop through all thumbnail images; remove all .active classes then add the .active class to the current image (parent element: thumbnail-wrapper)
          thumbnails.forEach(thumbnail => {
                    if (thumbnail.name === imageIndex) thumbnail.parentElement.classList.add("active")
                    else thumbnail.parentElement.classList.remove("active")
          })
}

const outerModal = document.querySelector(".outer-modal");
const thumbnails = document.querySelectorAll(".thumbnail");
const largeImages = document.querySelectorAll(".large-image");
const productPreview = document.querySelector(".product-preview");
const productPreviewLargeImage = productPreview.querySelector(".carousel");

// When the large image in the product preview is clicked open the lighthouse modal
productPreviewLargeImage.addEventListener("click", openLighthouse);

// When a thumbail (in product preview or lightouse) is clicked handle the click event
thumbnails.forEach(thumbnail => {
          thumbnail.addEventListener("click", handleThumbnailClick);
});

// For each carousel, listen for a custom event (imageUpdated) and call updateCurrentImage frunction
largeImages.forEach(image => {
          image.addEventListener('imageUpdated', updateCurrentImage);
});

let prevImage = "image4";
let currentImage = "image1";
let nextImage = "image2";
let productImages = [];

for (key in selectedProduct.images) productImages.push(key);

function updateSliderState(imageName) {
          const currentIndex = productImages.findIndex(item => item === imageName);
          const maxItems = productImages.length;

          currentImage = productImages[currentIndex];
          prevImage = (currentIndex === 0) ? productImages[maxItems-1] : productImages[currentIndex - 1];
          nextImage = (currentIndex === (maxItems-1)) ? productImages[0]: productImages[currentIndex + 1];
}

function handleCarouselButtonClick(e) {
          const currentIndex = productImages.findIndex(item => item === currentImage);
          const maxItems = productImages.length;

          if (e.target.name === "prev") {
                    currentImage = (currentIndex === 0) ? productImages[maxItems-1] : productImages[currentIndex - 1];
          } else {
                    currentImage = (currentIndex === (maxItems-1)) ? productImages[0]: productImages[currentIndex + 1];
          }

          updateSliderState(currentImage);

          // Dispatch a custom event that will tell all carousels that a new image was selected
          // Pass custom details (e.g. image name attribute) in the event
          largeImages.forEach(image => {
                    image.dispatchEvent(new CustomEvent('imageUpdated', { detail: {name: currentImage} }));
          });
}

const carouselButtons = document.querySelectorAll(".arrow");
carouselButtons.forEach(button => {
          button.addEventListener("click", handleCarouselButtonClick);
})



// Event delegation.  Listen for click events on the outer modal but then delegate the click event over to the close button if that is whas was clicked
outerModal.addEventListener("click", closeLighthouse);


const nav = document.querySelector("nav");
const primaryNav = document.querySelector(".primary-navigation");
const htmlElement = document.documentElement;

// data-visible attribute controls visibility of the mobile nav menu (.primary-navigation)
// active (.active) class controls visibility of nav (header nav) tranpsarent background
// .disable-scrolling prevents vertical scrolling (overflow-y) while moobile nav menu is visible
function setNavMenuStatus(boolean) {
          primaryNav.setAttribute("data-visible", boolean);
          nav.classList.toggle("active", boolean);
          htmlElement.classList.toggle("disable-scrolling", boolean);
}

const navMenuOpen = document.querySelector(".mobile-nav-open");
const navMenuClose = document.querySelector(".mobile-nav-close");

// nav menu open button (.mobile-nav-open) becomes visible via CSS media query
// nav menu close button is always visible but is a child element of the mobile nav menu (.primary-navigation)
// mobile nav (header nav) and mobile nav menu (.primary-navigation) becomes invisible via CSS media query
// when someone cliks the hambruger button ..
// mobile nav (header nav) and mobile nav menu (.primary-navigation) becomes visible via menu open click
navMenuOpen.addEventListener("click", () => {
          const visibility = primaryNav.getAttribute("data-visible");
          // convert string to boolean value
          let booleanValue = (visibility === "true");

          // toggle the visibility status of the nav menu (using the ! operator)
          setNavMenuStatus(!booleanValue);
});

// when someone cliks the X (e.g. close) button ..
// mobile nav (header nav) and mobile nav menu (.primary-navigation) becomes invisible via menu close click
navMenuClose.addEventListener("click", () => {
          const visibility = primaryNav.getAttribute("data-visible");
          // convert string to boolean value
          let booleanValue = (visibility === "true");

          // toggle the visibility status of the nav menu (using the ! operator)
          setNavMenuStatus(!booleanValue);
});



// On page load, calculate the sales price
calculateSalePrice();

// On page load, display the contents of the selected product
displaySelectedProduct(selectedProduct);

// On page load, restore the cart from Local Storage
restoreFromLocalStorage();
