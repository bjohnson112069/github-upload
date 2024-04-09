
function loadContent() {
    const links = document.querySelectorAll('a');
    const classesToRemove = ['slide-left', 'slide-right', 'slide-up', 'slide-down', 'scale-up', 'scale-down'];


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