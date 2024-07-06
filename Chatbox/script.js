
function loadContent() {
    const links = document.querySelectorAll('a');
    const consent = document.querySelector('#consent-button');
    const form = document.querySelector('#message-form');
    const toggle = document.querySelector('#toggle-chat-button');
    const agents = [
        'https://randomuser.me/api/portraits/women/47.jpg',
        'https://randomuser.me/api/portraits/women/49.jpg',
        'https://randomuser.me/api/portraits/women/44.jpg'
    ];
    const agent = agents[randomNum(0, 2)];
    const user = 'https://github.com/bjohnson112069/web-images/blob/main/Chatbox/user-regular.png?raw=true';


    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    
    // Untility: generate random number between min and max
    function randomNum(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function handleFormSubmission(e) {
        e.preventDefault();
        const input = document.querySelector('#new-message');
        const msg = input.value;

        // create user message then append to the messages list
        postMessage('User', msg);

        // create agent typing message then append to the messages list
        setTimeout(() => {
            postMessage('Agent', '');
        }, 1500);
        
        form.reset();
        input.focus();
    }

    function postMessage(person, msg) {
        const messages = document.querySelector('.messages');
        const li = document.createElement('li');
        const src = person === 'Agent' ? agent : user;

        li.classList.add('message', person.toLowerCase());
        if (!msg) {
            li.innerHTML = `<img src=${src} alt="avatar image" class="avatar">
            <div class="message-content">
                <p class="typing">
                    <span class="person">${person}</span>
                    <span> is typing</span>
                    <div class="dots">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>    
                    </div>
                </p>
            </div>
            `;
        } else {
            li.innerHTML = `<img src=${src} alt="avatar image" class="avatar">
            <div class="message-content">${msg}</div>`;
        }
        messages.appendChild(li);
        messages.scrollTo(0, messages.scrollHeight);
    }

    function toggleChatBox() {
        const box = document.querySelector('#chat-box');
        
        box.classList.toggle('open');
        this.classList.toggle('expanded');
    }


    // On page load... 
    form.reset();
    postMessage('Agent', 'Hi there!<br>Looking to get started?  I can help answer your questions.');

    // Event Listeners
    links.forEach(link => link.addEventListener ('click', (e) => e.preventDefault()));
    consent.addEventListener('click', () => document.querySelector('#privacy-policy').classList.add('acknowledged'));
    form.addEventListener('submit', handleFormSubmission);
    toggle.addEventListener('click', toggleChatBox);
}

window.addEventListener('DOMContentLoaded', loadContent);