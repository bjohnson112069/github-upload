const classesToRemove = ['slide-left', 'slide-right', 'slide-up', 'slide-down', 'scale-up', 'scale-down'];
const links = document.querySelectorAll("a");
const tabs = document.querySelectorAll(".tab");

function handleTabClick() {
          const forms = document.querySelectorAll("form");

          forms.forEach(form => form.id === this.value ? 
                    form.classList.add("active") : 
                    form.classList.remove("active"));

          tabs.forEach(tab => tab === this ? 
                    tab.classList.add("active") :
                    tab.classList.remove("active"));
}

function handleSubmitEvent(e) {
          e.preventDefault();

          const hero = document.querySelector("#hero");

          hero.classList.add("scale-down");
          setTimeout(() => {
                    hero.classList.remove("scale-down");
          }, 3000);

          form.reset();
}

// form.addEventListener("submit", handleSubmitEvent);
tabs.forEach(tab => tab.addEventListener("click", handleTabClick));
links.forEach(link => link.addEventListener("click", (e) => e.preventDefault()));


