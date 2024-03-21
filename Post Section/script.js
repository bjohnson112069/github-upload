const links = document.querySelectorAll('a');
const messages = document.querySelector('.messages');
const textarea = document.querySelector('#message');
const buttons = document.querySelectorAll('.btn');

function handleKeyPress(e) {

          if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    const li = document.createElement('li')
                    li.classList.add('msg', 'move');
                    li.textContent = this.value;
                    messages.appendChild(li);

                    setTimeout(() => {
                              li.classList.remove('move');
                    }, 200);

                    this.form.reset();

                    messages.scrollTop = messages.scrollHeight - messages.clientHeight;
          }

}

textarea.addEventListener("keypress", handleKeyPress);
links.forEach(link => link.addEventListener("click", (e) => e.preventDefault()));
buttons.forEach(button => button.addEventListener("click", (e) => e.preventDefault()));
