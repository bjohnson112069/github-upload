function loadContent() {
    const links = document.querySelectorAll('a');
    const choices = document.querySelectorAll('.choice');
    const winner = document.querySelector('.winner');
    const result = winner.querySelector('.win-lose');
    const results = document.querySelectorAll('.result');
    const again = document.querySelector('#play-again');
    const score = document.querySelector('.score');
    const sections = document.querySelector('.sections');
    const left = document.querySelector('.section-left');
    const right = document.querySelector('.section-right');
    const modal = document.querySelector('.outer-modal');
    const rules = document.querySelector('#rules');
    const exit = document.querySelector('#close-modal');
    const CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    let SCORES = {
        win: 0,
        loss: 0,
        tie: 0
    }

    // Utility: generate random number between min and max
    function randomNum(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    // display the selection/choice
    function displayChoice(name, selection) {
        const result = document.querySelector(`#${name}`);
        const choice = result.querySelector('.choice');

        choice.classList.remove(...CHOICES);
        if (selection != '') {
            choice.classList.add(selection)
        }
    }

    // apply the animation to the winning choice
    function applyAnimation(name) {
        const winner = document.querySelector(`#${name}`);

        results.forEach(result => {
            result === winner ? result.classList.add('pulse') : result.classList.remove('pulse');
        })
    }

    // handle user selection
    function handleUserSelection() {
        let msg = '';

        // move to the right section containing the results
        sections.style.left = `${-1 * right.offsetLeft}px`;

        const player = this.value;
        displayChoice('player', player);

        const computer = CHOICES[randomNum(0, (CHOICES.length - 1))];
        displayChoice('computer', '');
        setTimeout(() => {
            displayChoice('computer', computer);
        }, 1000);
    
        if (player === computer) {
            msg = 'TIE';
            SCORES.tie++;
        } else if ( (player === 'rock' &&  computer === 'scissors') ||
                (player === 'rock' &&  computer === 'lizard') ||
                (player === 'paper' &&  computer === 'rock') || 
                (player === 'paper' &&  computer === 'spock') ||
                (player === 'scissors' &&  computer === 'paper') || 
                (player === 'scissors' &&  computer === 'lizard') || 
                (player === 'lizard' &&  computer === 'spock') ||
                (player === 'lizard' &&  computer === 'paper') ||
                (player === 'spock' &&  computer === 'scissors') ||
                (player === 'spock' &&  computer === 'rock') ) {
                    msg = 'WIN';
                    SCORES.win++;
        } else {
            msg = 'LOSE';
            SCORES.loss++;
        }

        // store the score(s) in local storage
        localStorage.setItem("scores", JSON.stringify(SCORES));

        // display the winner, apply the animation, update the scoreboard
        setTimeout(() => {
            // update the winner and make it visible
            winner.classList.add('visible');
            result.textContent = msg;

            // apply the pulse animation to the winner
            if (msg === 'WIN') {
                applyAnimation('player');
            }
            if (msg === 'LOSE') {
                applyAnimation('computer');
            }

            // update scoreboard
            score.textContent = SCORES.win;

        }, 1500);
    }

    function handlePlayAgain() {
        // move to the left section containing all the buttons
        sections.style.left = `${-1 * left.offsetLeft}px`;

        // clear/reinitialize the results section
        displayChoice('player', '');
        displayChoice('computer', '');
        winner.classList.remove('visible');
        result.textContent = '';

        // remove the animation from all results
        results.forEach(result => result.classList.remove('pulse'));
    }

    function handleCloseModal() {
        modal.classList.toggle('opened');
    }

    // on page load ...

    // retrieve the scores from local storage and overwrite the data object
    const lsSCORES = JSON.parse(localStorage.getItem('scores'));
    if (lsSCORES) {
        SCORES = {...lsSCORES};
    }

    // update scoreboard
    score.textContent = SCORES.win;

    // Event Listeners
    links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
    choices.forEach(choice => choice.addEventListener('click', handleUserSelection));
    again.addEventListener('click', handlePlayAgain);
    exit.addEventListener('click', handleCloseModal);
    rules.addEventListener('click', handleCloseModal);
}

window.addEventListener('DOMContentLoaded', loadContent);