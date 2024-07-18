
function loadContent() {
    const balloons = document.querySelectorAll('.balloon');

    function inflateBalloon() {
        this.style.scale = '2';
    }

    function deflateBalloon() {
        this.style.scale = '1';
    }

    // On page load... 

    // Event Listeners
    balloons.forEach(balloon => balloon.addEventListener('mouseenter', inflateBalloon));
    balloons.forEach(balloon => balloon.addEventListener('mouseleave', deflateBalloon));
}

window.addEventListener('DOMContentLoaded', loadContent);