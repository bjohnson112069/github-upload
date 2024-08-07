
function loadContent() {
    const progress = document.querySelector('.progress');
    const storage = document.querySelector('#storage-value');
    const remaining = document.querySelector('#remaining-storage-value');
    const STORAGE = 815
    const MAX_STORAGE = 1000;
    
    // On page load... 
    setTimeout(() => {
        storage.textContent = `${STORAGE} gb`;
        remaining.textContent = `${MAX_STORAGE - STORAGE}`;
        progress.style.width = `${STORAGE / MAX_STORAGE * 100}%`;
    }, 1000);

    // Event Listeners
}

window.addEventListener('DOMContentLoaded', loadContent);