const links = document.querySelectorAll("a");
const items = document.querySelectorAll("li");

function handleItemClick(e) {
          
          items.forEach(item => item === this ? 
                    item.setAttribute("aria-current", "page") : item.removeAttribute("aria-current"))

}

items.forEach(item => item.addEventListener("click", handleItemClick));
links.forEach(link => link.addEventListener("click", (e) => e.preventDefault()));