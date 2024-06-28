
function loadContent() {
    const links = document.querySelectorAll('a');
    const container = document.querySelector('.container');
    const buttons = document.querySelectorAll('.choice');
    const result = document.querySelector('#result');
    const CHOICES = ['rock', 'paper', 'scissors'];
    const SCORES = {
        win: 0,
        loss: 0,
        tie: 0
    }

    
    // Utility: generate random number between min and max
    function randomNum(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function displayScore() {
        Object.entries(SCORES).map(entry => {
            const key = entry[0];
            const value = entry[1];

            const score = document.querySelector(`#${key}`);
            score.textContent = value;
        });
    }

    function handleButtonEvent() {
        let msg = '';
        const player = this.id;
        const computer = CHOICES[randomNum(0, 2)];
    
        msg = `You chose: ${player.toUpperCase()}.  Computer chooses ...`;
        result.textContent = msg;
        setTimeout(() => {
            msg = msg.concat(`${computer.toUpperCase()}.  `);
            result.textContent = msg;

            if (player === computer) {
                msg = msg.concat(`It's a TIE`);
                SCORES.tie++;
            } else if ( (player === 'rock' &&  computer === 'scissors') ||
                    (player === 'scissors' &&  computer === 'paper') || 
                    (player === 'paper' &&  computer === 'rock') ) {
                        msg = msg.concat(`Player WINS`);
                        SCORES.win++;
            } else {
                msg = msg.concat(`Computer WINS`);
                SCORES.loss++;
            }
            result.textContent = msg;

            // Display the results for 5 seconds then reset
            setTimeout(() => {
                result.textContent = 'Make your choice!';
                displayScore();
            }, 3000);
        }, 1000);

    }

    // On page load... 

    // create the scoreboard
    const scoreboard = document.createElement('div');
    scoreboard.classList.add('.scoreboard');
    scoreboard.style.position = 'fixed';
    scoreboard.style.top = '3rem';
    scoreboard.style.left = '50%';
    scoreboard.style.transform = 'translateX(-50%)';
    scoreboard.style.width = '100%';
    scoreboard.style.maxWidth = '300px';
    scoreboard.style.display = 'grid';
    scoreboard.style.gridTemplateColumns = 'repeat(3, 1fr)';
    scoreboard.style.justifyContent = 'center';
    scoreboard.style.gap = '1rem';

    Object.entries(SCORES).map(entry => {
        const key = entry[0];
        const number = entry[1];

        // create SCORE container element
        const score = document.createElement('div');
        score.classList.add('score');
        score.style.display = 'grid';
        score.style.gridAutoRows = 'min-content';
        score.style.fontWeith = '700';
        score.style.border = '5px solid black';
        score.style.borderRadius = '4px';

        // create the label element
        const span = document.createElement('span');
        span.textContent = key.toUpperCase();
        span.style.paddingBlock = '.25rem';
        score.appendChild(span);

        // create the value element
        const value = document.createElement('span');
        value.classList.add('value');
        value.setAttribute('id', key);
        value.textContent = number;
        value.style.fontSize = '3rem';
        score.appendChild(value);

        // append the SCORE element to the scoreboard
        scoreboard.appendChild(score);
    });

    // append the SCOREBOARD to the parent container
    container.appendChild(scoreboard);

    // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
    buttons.forEach(button => button.addEventListener('click', handleButtonEvent));
}

window.addEventListener('DOMContentLoaded', loadContent);