
function loadContent() {
    const links = document.querySelectorAll('a');
    const classesToRemove = ['slide-left', 'slide-right', 'slide-up', 'slide-down', 'scale-up', 'scale-down'];


    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));

    // on page load ...    
}

document.addEventListener('DOMContentLoaded', loadContent);