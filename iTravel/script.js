
function loadContent() {
    const login = document.querySelector('#log-in-btn');
    const newsletter = document.querySelector('.newsletter-form');
    const mediaQuery = window.matchMedia('(max-width: 768px)')

    // Utiltity Functions
    function isValidEmail(str)
    {
            // Regex to check valid Email Address
            const regex = /[^\s@]+@[^\s@]+\.[^\s@]+/gi;

            return regex.test(str);
    }

    function toggleNavModal() {
        const nav = document.querySelector('nav');
        const menu = nav.querySelector('.menu');
        const ul = nav.querySelector('ul');
        const isExpanded = menu.getAttribute('aria-expanded') === 'true';

        // check if the menu is expanded
        if (isExpanded) {
            // restore the nav container
            nav.style.position = 'static';
            nav.style.paddingBottom = '1rem';

            // hide the nav list
            ul.style.opacity = '0';
            ul.style.left = '100%';
            ul.style.transform = 'translateX(0)';

            // restore the hamburger menu
            createMenuBars();
        } else {
            // resize the nav container to fill the screen
            nav.style.position = 'fixed';
            nav.style.inset = '0';
            nav.style.paddingBottom = '7rem'; // space for the panel
            
            // make the nav list visible and move it into view
            ul.style.opacity = '1';
            ul.style.left = '50%';
            ul.style.transform = 'translateX(-50%)'; 
            ul.style.width = '100%';

            // transform the menu into an X
            createMenuClose();

        }

        // toggle the aria-expanded attribute
        menu.setAttribute('aria-expanded', !isExpanded);
    }

    function handleMediaQuery(e) {
        const nav = document.querySelector('nav');
        const menu = nav.querySelector('.menu');
        const ul = nav.querySelector('ul');
        const logo = ul.querySelector('#logo');
        const panel = document.querySelector('.login-panel');

        // Check if the media query is true
        if (e.matches) {
            // Then log the following message to the console
            console.log('Media Query: Small Screen!');

            // display the hamburger menu
            menu.style.display = 'block';

            // (re)style the nav, ul, and panel
            nav.style.backgroundColor = 'inherit';
            nav.style.zIndex = '2';
            ul.style.flexDirection = 'column';
            ul.style.position = 'absolute';
            ul.style.top = '1rem';
            ul.style.left = '100%';
            ul.style.opacity = 0;
            ul.style.transition = 'left .5s linear, opacity .2s linear';
            logo.style.marginRight = '0';
            panel.style.width = 'calc(100% - 2rem)';
            panel.style.top = 'calc(100% + .5rem)';
            panel.style.left = '50%';
            panel.style.transform = 'translateX(-50%)';

            // Event listener for nav modal
            menu.addEventListener('click', toggleNavModal);

        } else {
            console.log('Media Query: Large Screen');
            
            // display the hamburger menu
            menu.style.display = 'none';

            // (re)style the nav, ul, and panel
            nav.style.backgroundColor = 'inherit';
            nav.style.zIndex = '2';
            ul.style.flexDirection = 'row';
            ul.style.position = 'relative';
            ul.style.top = 'unset';
            ul.style.left = 'unset';
            ul.style.opacity = 1;
            ul.style.transition = 'left .5s linear, opacity .2s linear';
            logo.style.marginRight = 'auto';
            panel.style.top = 'calc(100% + .5rem)';
            panel.style.left = 'unset';
            panel.style.transform = 'unset';
            panel.style.right = '0';
            panel.style.width = 'unset';

            // Event listener for nav modal
            menu.removeEventListener('click', toggleNavModal);
        }
    }

    // Functions to create Elements
    function createMenuBars() {
        // style the bars within the hamburger menu
        const bars = document.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            bar.style.display = 'inline-block';
            bar.style.position = 'absolute';
            bar.style.width = '1rem';
            bar.style.height = '3px';
            bar.style.top = `${index * 6}px`;
            bar.style.left = '0';
            bar.style.backgroundColor = '#373232';
            bar.style.transform = 'rotate(0)';
            bar.style.zIndex = '2';
        });
    }

    function createMenuClose() {
        const top = document.querySelector('.top');
        const middle = document.querySelector('.middle');
        const bottom = document.querySelector('.bottom');

        middle.style.display = 'none';
        top.style.top = '50%';
        bottom.style.top = '50%';
        top.style.transformOrigin = 'center center';
        top.style.transform = 'rotate(45deg)';
        bottom.style.transformOrigin = 'center center'
        bottom.style.transform = 'rotate(-45deg)';
    }

    function createHamburgerMenu() {
        const nav = document.querySelector('nav');
        const menu = document.createElement('div');

        // create the hamburger menu container
        menu.classList.add('menu');
        menu.innerHTML = `
            <span class='bar top'></span>
            <span class='bar middle'></span>
            <span class='bar bottom'></span>
        `;

        // style the hamburger menu container
        menu.style.position = 'absolute';
        menu.style.width = '1rem';
        menu.style.height = '1rem';
        menu.style.left = '1rem';
        menu.style.top = '1rem';
        menu.style.display = 'none';
        menu.style.flexDirection = 'column';
        menu.style.gap = '3px';
        menu.style.cursor = 'pointer';
        menu.setAttribute('aria-expanded', 'false');

        // insert the hamburger menu
        nav.appendChild(menu);

        createMenuBars();
    }

    function createLoginPanel() {
        // select the nav and make it position:relative
        const nav = document.querySelector('nav');
        const ul = nav.querySelector('ul');

        // make the ul container an anchor for the panel
        ul.style.position = 'relative';

        // create subpanel
        const panel = document.createElement('form');
        panel.classList.add('login-panel');

        // add the panel element to the DOM
        ul.appendChild(panel);

        // style the panel
        panel.style.position = 'absolute';
        panel.style.top = 'calc(100% + .5rem)';
        panel.style.right = '0';
        panel.style.display = 'none';
        panel.style.alignItems = 'center';
        panel.style.gap = '1rem';
        panel.style.padding = '1rem';
        panel.style.background = '#ededed';
        panel.style.border = '2px solid #bcbbbb';

        // create the panel child eleements
        panel.innerHTML = `
            <input type="text" name="name" autocomplete="name" placeholder="Please enter your name" required/>
            <button type="submit" id='confirm-btn'>OK</button>`;

        // select the child elements
        const input = panel.querySelector('input[type=text]');
        const confirm = panel.querySelector('#confirm-btn');

        // style the child elements
        input.style.padding = '.5rem 1rem';
        input.style.fontFamily = 'inherit';
        input.style.fontSize = 'inherit';
        input.style.width = '100%';
        confirm.style.backgroundColor = '#d94363';
        confirm.style.border = '2px solid #d94363';
        confirm.style.borderRadius = '5px';
        confirm.style.color = '#fffefe';
        confirm.style.cursor = 'pointer';
        confirm.style.padding = '0.5rem 1rem';
        confirm.style.transition = 'background-color 100ms, color 100ms';

        // Event listeners
        confirm.addEventListener('click', confirmName);
    }

    function createInvalidEmailMessage() {
        const msg = document.createElement('div');
        msg.classList.add('error-msg');

        // style the error message
        msg.style.position = 'absolute';
        msg.style.top = 'calc(100% + .5rem)';
        msg.style.left = '1rem';
        msg.style.color = '#d94363';
        msg.style.backgroundColor = 'inherit';
        msg.style.fontSize = '12px';
        msg.style.display = 'none';
        msg.textContent = 'Please enter a valid email address';
        newsletter.appendChild(msg);
    }

    function displayInvalidEmail() {
        const msg = document.querySelector('.error-msg');

        msg.style.display = 'block';
    }

    function handleSubscriptionEvent(e) {
        e.preventDefault();

        const input = this.querySelector('#newsletter-input')
        const section = this.parentElement;

        // verify email
        if (isValidEmail(input.value)) {
            section.innerHTML = `<h2>Thank you for subscribing!</h2>`;
        } else {
            displayInvalidEmail();
        }
    }

    function confirmName(e) {
        e.preventDefault();

        // update the Log In button
        login.textContent = `Hello, ${this.form.name.value}`;

        // clear the form then close it
        this.form.reset();
        this.form.style.display = 'none';
    }

    function handleLoginEvent() {
        // select the login panel
        const panel = document.querySelector('.login-panel');

        panel.style.display = 'flex';
    }

    // Event Listeners
    login.addEventListener('click', handleLoginEvent);
    newsletter.addEventListener('submit', handleSubscriptionEvent);
    mediaQuery.addListener(handleMediaQuery);

    // on page load ...
    createHamburgerMenu();
    createInvalidEmailMessage();
    createLoginPanel();

    // Media Query
    handleMediaQuery(mediaQuery)
    
}

document.addEventListener('DOMContentLoaded', loadContent);