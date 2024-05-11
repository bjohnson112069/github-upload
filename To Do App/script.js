
function loadContent() {
        const MONTHS = [ 'JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC' ];
    const DAYS = [ 'Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const date = document.querySelector('#date');
    const add = document.querySelector('#add-task-btn');
    const list = document.querySelector('.task-list');

    function updateTaskCount() {
        const counter = document.querySelector('#task-counter');
        const items = Array.from(document.querySelectorAll('.task-item'));

        const count = items.reduce((acc, item) => {
            return (!item.matches('.completed')) ? acc + 1 : acc;
        }, 0);

        counter.textContent = count;
    }

    function toggleCompletion(e) {

        if ( e.target.matches('.task-item') || 
            e.target.matches('.task-name') || 
            e.target.matches('.checkmark') ) {

            const item = e.target.closest('.task-item');
            item.classList.toggle('completed');
        }

        // update the counter
        updateTaskCount();
    }
    
    function addTask() {
        const input = document.querySelector('#new-task-input');
        const li = document.createElement('li');

        // close the modal
        toggleModal();

        li.setAttribute('data-task-item', '');
        li.classList.add('task-item');
        li.innerHTML = `<p data-task-name class="task-name">${input.value}</p>
        <div class="checkmark-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" class="checkmark" width="24" height="24" viewBox="0 0 24 24"
                stroke-width="3.5" stroke="currentColor" fill="none" stroke-linecap="round"
                stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l5 5l10 -10" />
            </svg>
        </div>`;
        list.appendChild(li);

        // update the counter
        updateTaskCount();
    }
    
    function toggleModal() {
        const modal = document.querySelector('#modal-wrapper');
        const confirm = document.querySelector('#confirm-task-btn');

        if (modal.matches('.hidden')) {
            modal.classList.remove('hidden');
            confirm.addEventListener('click', addTask);
        } else {
            modal.classList.add('hidden');
            confirm.removeEventListener('click', addTask);
        }
        
        
    }

    // On page load... 

    // update the date in the header
    const now = new Date;
    date.textContent = `${DAYS[now.getDay()]} ${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;

    // update the counter
    updateTaskCount();

    // Event Listeners
    add.addEventListener('click', toggleModal);

    // Event delegation on the <ul> list element
    list.addEventListener('click', toggleCompletion);
}

window.addEventListener('DOMContentLoaded', loadContent);