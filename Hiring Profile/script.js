const classesToRemove = ['slide-left', 'slide-right', 'slide-up', 'slide-down', 'scale-up', 'scale-down'];
const tabs = document.querySelectorAll(".tab");
const slider = document.querySelector('.albums');
const links = document.querySelectorAll("a");

let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
          isDown = true;
          slider.classList.add('active');
          startX = e.pageX - slider.offsetLeft;
          scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
          isDown = false;
          slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
          isDown = false;
          slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
          if (!isDown) return;  // stop the fn from running
          e.preventDefault();
          const x = e.pageX - slider.offsetLeft;
          const walk = (x - startX) * 3;
          slider.scrollLeft = scrollLeft - walk;
});

function handleTabClick() {
    // return if the value is empty/falsy
    if (!this.value) return;

    const contents = document.querySelectorAll(".content");

    // iterate through all tabs and make the one that was clicked active
    tabs.forEach(tab => tab === this ? 
        tab.classList.add("active") : tab.classList.remove("active"));

    // iterate through all tab contents and mthe one associated with the tab button active
    contents.forEach(content => content.id === this.value ? 
        content.classList.add("active") : content.classList.remove("active"));
}

tabs.forEach(tab => tab.addEventListener("click", handleTabClick));
links.forEach(link => link.addEventListener("click", (e) => e.preventDefault()));