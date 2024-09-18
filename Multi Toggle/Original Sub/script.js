
function loadContent() {
    const links = document.querySelectorAll('a');
    const classesToRemove = ['slide-left', 'slide-right', 'slide-up', 'slide-down', 'scale-up', 'scale-down'];

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }
    
    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));

    // on page load ...
    const form = document.querySelector('#browse');
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    const footer = document.querySelector('footer');

    form.classList.remove(...classesToRemove);
    setTimeout(() => {
        header.classList.remove(...classesToRemove);

        setTimeout(() => {
            main.classList.remove(...classesToRemove);
            const interests = document.querySelectorAll('.interest');

            interests.forEach((interest, i) => {
                setTimeout(() => {
                    interest.classList.remove(...classesToRemove);
                }, i*200);
                
            });
            
            setTimeout(() => {
                footer.classList.remove(...classesToRemove);
            }, 1000);

        }, 1000);
    }, 1000);
    
}

document.addEventListener('DOMContentLoaded', loadContent);