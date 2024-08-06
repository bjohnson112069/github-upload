
function loadContent() {
    const links = document.querySelectorAll('a');
    const content = document.querySelector('.post-content');
    const bookmark = document.querySelector('#bookmark')
    const post = document.querySelector('#post');;
    const classesToRemove = ['slide-left', 'slide-right', 'slide-up', 'slide-down', 'scale-up', 'scale-down', 'initial'];
    const gradientHeight = 64; // 4rem; 64px
    
    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function handleScrollEvent() {

        this.scrollTop >= (this.scrollHeight - this.offsetHeight - gradientHeight) ?
            post.classList.add('bottom') : post.classList.remove('bottom');
    }

    // On page load... 
    post.style.setProperty('--gradient-height', `${gradientHeight}px`);

    // Event Listeners
    links.forEach(link => link.addEventListener ('click', handleNavLinkEvent));
    bookmark.addEventListener('click', (e) => e.target.classList.toggle('active') );
    content.addEventListener('scroll', handleScrollEvent);
}

window.addEventListener('DOMContentLoaded', loadContent);