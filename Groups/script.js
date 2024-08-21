
function loadContent() {
    const links = document.querySelectorAll('.nav-link');
    const aside = document.querySelector('aside');
    const asideBtns = aside.querySelectorAll('.btn');
    const views = document.querySelector('.views');
    const viewBtns = views.querySelectorAll('.btn');
    
    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function handleAsideButtonClick() {
        asideBtns.forEach(button => {
            button === this ? 
                button.classList.add('active') : 
                button.classList.remove('active');
        });
    }

    function handleViewButtonClick() {
        const groups = document.querySelector('.groups');

        if (this.matches('#grid-view')) {
            groups.classList.remove('split-view');
        }

        if (this.matches('#split-view')) {
            groups.classList.add('split-view');
        }
        
        viewBtns.forEach(button => {
            button === this ? 
                button.classList.add('active') : 
                button.classList.remove('active');
        });
    }

    // On page load... 

    // Event Listeners
    links.forEach(link => link.addEventListener ('click', handleNavLinkEvent));
    asideBtns.forEach(button => button.addEventListener('click', handleAsideButtonClick));
    viewBtns.forEach(button => button.addEventListener('click', handleViewButtonClick));
}

window.addEventListener('DOMContentLoaded', loadContent);