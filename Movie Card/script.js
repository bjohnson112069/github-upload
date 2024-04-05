const links = document.querySelectorAll('a');


// on page load ...
links.forEach(link => link.addEventListener("click", (e) => e.preventDefault()));
