// Query the tab <buttons> container and the child array
const featuresTabContainer = document.querySelector('.features--tab');
const features = Array.from(featuresTabContainer.children);
// Query the tab <div> content container and the child array
const tabContainer = document.querySelector('.features--tab--container');
const tabs = Array.from(tabContainer.children);


// when I click the buttons forming the tabs, move to that tab content
featuresTabContainer.addEventListener('click', e => {
  // what button was clicked on?
  const targetButton = e.target.closest('button');

  // exit out if click is not a button
  if (!targetButton) return;

  // Query the current/active button
  const currentButton = featuresTabContainer.querySelector('.active--tab');
  // Toggle the active class for the current button
  currentButton.classList.toggle('active--tab');
  // Find the index in the array for the current button
  const currentIndex = features.findIndex(index => index === currentButton);
  // Set the current tab container using the index of the current button
  const currentTabContainer = tabs[currentIndex];
  // Toggle the active class for the current tab content
  currentTabContainer.classList.toggle('active--feature');
  // Find the index in the array for the target button
  const targetIndex = features.findIndex(index => index === targetButton);
  // Toggle the active class for the target button
  targetButton.classList.toggle('active--tab');
  // Set the target tab container using the index of the target button
  const targetTabContainer = tabs[targetIndex];
  // Toggle the active class for the target tab content
  targetTabContainer.classList.toggle('active--feature');
})

var acc = document.getElementsByClassName("accordion--button");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
} 

const menuOpen = document.getElementsByClassName('menu--open')[0];
const menuClose = document.getElementsByClassName('menu--close')[0];
const sectionHeader = document.getElementsByClassName('section--header')[0];
const overlayContainer = document.getElementsByClassName('overlay--container')[0];

menuOpen.addEventListener('click', () => {
  sectionHeader.classList.toggle('not--active')
  overlayContainer.classList.toggle('active')
})

menuClose.addEventListener('click', () => {
  sectionHeader.classList.toggle('not--active')
  overlayContainer.classList.toggle('active')
})

