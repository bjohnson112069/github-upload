
function loadContent() {
    const links = document.querySelectorAll('a');
    const button = document.querySelector('#btn');

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function handleButtonClick() {
        button.style.transition = 'transform .5s linear';
        button.style.backgroundColor = '#fef6f5';
        button.style.color = '#f55153';
        button.textContent = 'Clicked!';
        button.style.transform = 'scale(1.5)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 1000);

    }

    // On page load... 
    
    // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
    button.addEventListener('click', handleButtonClick);
}

window.addEventListener('DOMContentLoaded', loadContent);