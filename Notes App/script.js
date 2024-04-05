
let DATA = [
   {
      name: 'Intro',
      words: 150,
      page: 0,
      content: `
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum doloremque voluptates nemo obcaecati tempora deserunt nobis incidunt repellat. Aperiam nam minima, nulla placeat omnis culpa ab excepturi dicta doloribus nostrum!
   
         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio cum architecto tempora eligendi ex modi aspernatur excepturi, voluptatem ipsum impedit distinctio error nobis alias reiciendis unde, eum placeat! Facilis, magni!

         Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis dolor pariatur necessitatibus veritatis ratione doloribus architecto, molestiae autem perferendis repellendus quod nostrum explicabo deserunt porro temporibus nam, ab animi quasi!

         Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, magni cupiditate, pariatur sed asperiores natus voluptatum beatae laborum porro obcaecati ipsa. Maxime vero exercitationem quas accusamus magnam fugiat reprehenderit quam.

         Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus alias repellendus nemo ducimus laboriosam, sed at consectetur facere voluptatibus amet blanditiis vero sapiente adipisci, unde eius dolorum corporis repellat nulla.
      `
   },
   {
      name: 'Chapter 1',
      words: 150,
      page: 1,
      content: `
         Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus error ipsum nam distinctio! Impedit hic tenetur, magni distinctio nesciunt obcaecati vel non cumque corrupti voluptatibus nobis earum expedita quae ea?
   
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt id tempore sint quaerat libero quo labore itaque reprehenderit, tenetur odio? Aut dolores nisi voluptatem necessitatibus, nihil tenetur libero autem quia?

         Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique, nemo adipisci? Dolore placeat temporibus dicta illum nobis quae eveniet quos ullam pariatur numquam suscipit repudiandae, corrupti, deserunt voluptatem consectetur. Sit?
         
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit eveniet unde atque optio maxime, in blanditiis. Voluptates, officiis? Excepturi aspernatur facere, beatae nihil hic vero odit quis labore. Sapiente, repellat.

         Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, ex quas a porro tempore, consectetur autem incidunt soluta vero molestiae optio cumque dolores accusamus ducimus? Maiores ipsam amet hic at?
      `
   },
   {
      name: 'Chapter 2',
      words: 150,
      page: 2,
      content: `
         Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis, ipsam eligendi. A veritatis qui quidem vero commodi molestias temporibus accusantium minima nisi animi pariatur dolorem, culpa, necessitatibus quibusdam ullam hic.
   
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos voluptatibus minima cum ea. Itaque, pariatur dolorem sequi obcaecati consectetur excepturi est, voluptatem autem ipsum neque voluptate vitae porro dolore mollitia.
         
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam nam eius similique obcaecati dolorem. Eligendi commodi tempore ratione dolorem, reiciendis nemo molestiae, officia dicta libero repellendus explicabo amet excepturi voluptatum?

         Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum magni, quia voluptas autem porro eligendi fugiat temporibus aperiam similique ea, vitae nihil velit incidunt quos cupiditate, repudiandae rerum minus unde.

         Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quis ratione facilis? Beatae maxime magnam eligendi modi, corporis officia earum. Sint perferendis sequi natus. Assumenda, reprehenderit? Sint nemo facere harum?
      `
   },
   {
      name: 'Chapter 3',
      words: 150,
      page: 3,
      content: `
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto alias, aut laboriosam reprehenderit dicta quis sequi aperiam ea corporis sed necessitatibus animi. Assumenda, similique dicta maxime blanditiis aliquam nostrum eius.
   
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda ipsa maiores aliquam voluptatum doloribus voluptates delectus corporis impedit maxime nobis sunt quo, ipsum eos enim veniam autem, laborum officia quibusdam.

         Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum debitis, dicta voluptatibus maxime ipsa, quis reprehenderit corrupti aut molestiae maiores amet eos! Accusamus et praesentium dolore, distinctio modi natus voluptatem?

         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id impedit, pariatur doloremque aliquam itaque laudantium, deleniti facere excepturi vero aspernatur et ad velit. Facere dolores dignissimos accusamus quis consectetur! Dolorem.

         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam accusantium perferendis corrupti consequatur fugiat molestiae suscipit praesentium accusamus doloremque, deleniti sit, cupiditate iure beatae? Debitis eius provident pariatur quasi nobis!
      `
   }
];



function loadContent() {
   const links = document.querySelectorAll('a');
   const list = document.querySelector('.sessions');
   const content = document.querySelector('.content__wrapper');
   const add = document.querySelector('.add__session');
   const search = document.querySelector('.search__session');
   
   function getWordCount(str) { 

      // remove trailing spaces and split on white space
      const array = str.trim().split(/\s+/); 
      return array.length; 
   }

   function updateTotalWordsCount() {
      const words = document.querySelectorAll('.total-words')
      const total = DATA.reduce((sum, item) => {
         sum += item.words;
         return sum;
      }, 0);

      words.forEach(word => word.textContent = total)
   }

   function updateSessionCount() {
      const counts = document.querySelectorAll('.session-count');

      counts.forEach(count => count.textContent = DATA.length);
   }

   function handleSessionInput() {
      const index = this.parentElement.dataset.session;

      DATA[index].content = this.value;
      DATA[index].words = getWordCount(this.value);

      const item = document.querySelector(`.session[data-session="${index}"`);
      const words = item.querySelector('.word-count');

      words.textContent = DATA[index].words;

      list.dispatchEvent(new CustomEvent('wordsUpdated'));
   }

   function toggleEdit() {
      const input = this.closest('.session__content').querySelector('.session__content-text');
      const readOnly = input.readOnly === true;

      input.readOnly = !readOnly;
      input.focus();
   }

   function toggleFullScreen() {
      const isExpanded = content.getAttribute("aria-expanded") === "true";
  
      content.setAttribute("aria-expanded", `${!isExpanded}`);

      if (isExpanded) {
         content.style.position = 'relative';
      } else {
         content.style.position = 'absolute';
      }

   }
   
   function displaySections() {
      if (!DATA.length) return;

      const html = DATA.map((item, index) => `
         <section class="session__content" data-session="${index}">
            <header class="session__content-header">
               <h1 class="session__content-title session__name">${item.name}</h1>
               <div class="session__content-icons">
                  <button class="icon edit">
                     <svg class="icon__img"><use xlink:href="#pencil-solid"></use></svg>
                  </button>
                  <button class="icon maximize">
                     <svg class="icon__img"><use xlink:href="#maximize-solid"></use></svg>
                  </button>
                  <button class="icon more">
                     <svg class="icon__img"><use xlink:href="#ellipsis-vertical-solid"></use></svg>
                  </spbuttonn>
               </div>    
            </header>
            <textarea name="session-text" id="session-text" class="session__content-text" placeholder="Click Edit and start typing" readonly>${item.content}</textarea>
         </section>`)
         .join('');
         content.innerHTML = html;

         const inputs = content.querySelectorAll('.session__content-text');
         inputs.forEach(input => input.addEventListener('input', handleSessionInput));

         const pencils = document.querySelectorAll('.edit');
         pencils.forEach(pencil => pencil.addEventListener('click', toggleEdit));

         const maxs = document.querySelectorAll('.maximize');
         maxs.forEach(max => max.addEventListener('click', toggleFullScreen));
   }

   function displayItems(e) {
      if (!e.detail.length) return;

      const html = e.detail.map(item => {
         return `
         <li class="session" data-session="${item.page}">
            <h2 class="session__name">${item.name}</h2>
            <span><span class="word-count">${item.words}</span> words</span>
         </li>`;
      }).join('');
      
      list.innerHTML = html;
      
      const sessions = document.querySelectorAll('.session');
      sessions.forEach(session => session.addEventListener('click', displaySession));

   }

   function displaySession() {
      const wrapper = document.querySelector('.content__wrapper');
      const y = DATA[this.dataset.session].page;

      wrapper.style.top = `${-1 * (parseInt(y) * 100)}%`;
   }

   function findSession(str, sessions) {
      const criteria = str.trim().toLowerCase();

      return sessions.filter(session => session.name.trim().toLowerCase().includes(criteria));
   }

   function newSession(str, sessions) {
      const obj = {
         name: str,
         words: 0,
         page: sessions.length,
         content: ``
      }
      
      sessions.push(obj);
      
      list.dispatchEvent(new CustomEvent('itemsUpdated', { detail: DATA }));
      content.dispatchEvent(new CustomEvent('itemsUpdated'));

   }

   function handleUserInput(e) {
      e.preventDefault();

      if (this.input.dataset.id === 'search') {
         const results = findSession(this.input.value, DATA);
         list.dispatchEvent(new CustomEvent('itemsUpdated', { detail: results }));
      }

      if (this.input.dataset.id === 'add') {
         newSession(this.input.value, DATA);
      }
   }


   function displayUserInput(e) {
      const input = document.querySelector('#aside__header-input');
      const header = document.querySelector('.session__header');
      const buttons = header.querySelectorAll('button');

      buttons.forEach(button => button === this ? 
            button.classList.add('active') : 
            button.classList.remove('active'));

      // (always) enable the input element
      input.disabled = false;

      // associate an ID on the input to determine 'add' or 'search' button click
      input.dataset.id = this.dataset.id;
      input.value = '';

      // Event Listener
      input.form.addEventListener('submit', handleUserInput);

   }
   
   // Event Listeners
   links.forEach(link => link.addEventListener('click', (e) => e.preventDefault()));
   add.addEventListener('click', displayUserInput);
   search.addEventListener('click', displayUserInput);
   list.addEventListener('itemsUpdated', displayItems);
   content.addEventListener('itemsUpdated', displaySections);

   // achnoring the session count and total word count to the list element
   list.addEventListener('itemsUpdated', updateSessionCount);
   list.addEventListener('wordsUpdated', updateTotalWordsCount);

   
   // on page load ... (must go after event listeners)
   list.dispatchEvent(new CustomEvent('itemsUpdated', { detail: DATA }));
   list.dispatchEvent(new CustomEvent('wordsUpdated'));
   content.dispatchEvent(new CustomEvent('itemsUpdated'));
}

document.addEventListener('DOMContentLoaded', loadContent);
