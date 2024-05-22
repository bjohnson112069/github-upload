
function loadContent() {
    const links = document.querySelectorAll('a');
    const dots = document.querySelectorAll('.dot');
    const types = document.querySelectorAll('.type');
    const submit = document.querySelector("#continue");

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function moveToSlide() {
        const types = document.querySelector('.types');
        const type = document.querySelector(`.type[data-type="${this.value}"]`);
        const dots = document.querySelectorAll('.dot');

        types.style.left = `${-1 * type.offsetLeft}px`;
        dots.forEach(dot => dot === this ? dot.classList.add('selected') : dot.classList.remove('selected'));
    }

    function selectType() {
        const types = document.querySelectorAll('.type');

        types.forEach(type => type === this ? type.classList.add('selected') : type.classList.remove('selected'));
    }

    
    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    dots.forEach(dot => dot.addEventListener('click', moveToSlide));
    types.forEach(type => type.addEventListener('click', selectType));
    submit.addEventListener('click', () => {
        const users = document.querySelector('#user-types');
        users.classList.add('scale-down');
        setTimeout(() => {users.classList.remove('scale-down')}, 2000);
    });
}

document.addEventListener('DOMContentLoaded', loadContent);