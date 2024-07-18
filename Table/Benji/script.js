const data = [
    { "first_name": "Neil", "last_name": "Hellsdon", "email": "nhellsdon0@sbwire.com", "created": "10/03/2021" },
    { "first_name": "Jemima", "last_name": "Monger", "email": "jmonger1@europa.eu", "created": "10/01/2021" },
    { "first_name": "Jory", "last_name": "Wilmore", "email": "jwilmore2@icq.com", "created": "13/10/2021" },
    { "first_name": "Letisha", "last_name": "Gringley", "email": "lgringley3@webnode.com", "created": "30/05/2022" },
    { "first_name": "Prudence", "last_name": "Whitebrook", "email": "pwhitebrook4@skype.com", "created": "10/05/2022" },
    { "first_name": "Meier", "last_name": "Endacott", "email": "mendacott5@google.fr", "created": "14/10/2020" },
    { "first_name": "Blinny", "last_name": "Cartwight", "email": "bcartwight6@devhub.com", "created": "16/02/2021" },
    { "first_name": "Sheelah", "last_name": "Matyasik", "email": "smatyasik7@state.gov", "created": "17/06/2020" },
    { "first_name": "Alasdair", "last_name": "Cure", "email": "acure8@slideshare.net", "created": "29/12/2020" },
    { "first_name": "Chaddie", "last_name": "Anstiss", "email": "canstiss9@unesco.org", "created": "27/04/2020" },
    { "first_name": "Ozzy", "last_name": "Gunstone", "email": "ogunstonea@simplemachines.org", "created": "06/09/2021" },
    { "first_name": "Lonna", "last_name": "Harverson", "email": "lharversonb@jiathis.com", "created": "14/06/2020" },
    { "first_name": "Ddene", "last_name": "O'Carney", "email": "docarneyc@hibu.com", "created": "13/03/2022" },
    { "first_name": "Sileas", "last_name": "Greenmon", "email": "sgreenmond@wisc.edu", "created": "29/07/2020" },
    { "first_name": "Karla", "last_name": "Guerrero", "email": "kguerreroe@domainmarket.com", "created": "03/01/2021" },
    { "first_name": "Christina", "last_name": "Houten", "email": "choutenf@hhs.gov", "created": "20/07/2022" },
    { "first_name": "Marlo", "last_name": "Dalrymple", "email": "mdalrympleg@1und1.de", "created": "29/07/2020" },
    { "first_name": "Adrea", "last_name": "Mazella", "email": "amazellah@squarespace.com", "created": "14/06/2020" },
    { "first_name": "Prue", "last_name": "Weins", "email": "pweinsi@independent.co.uk", "created": "14/06/2021" },
    { "first_name": "Renault", "last_name": "Lievesley", "email": "rlievesleyj@reverbnation.com", "created": "27/10/2021" },
    { "first_name": "Gaby", "last_name": "Howlin", "email": "ghowlink@feedburner.com", "created": "23/04/2021" },
    { "first_name": "Lauretta", "last_name": "Remmers", "email": "lremmersl@delicious.com", "created": "16/01/2022" },
    { "first_name": "Evelyn", "last_name": "Frichley", "email": "efrichleym@symantec.com", "created": "07/06/2020" },
    { "first_name": "Dmitri", "last_name": "Attwood", "email": "dattwoodn@tinyurl.com", "created": "19/07/2022" },
    { "first_name": "Jo-anne", "last_name": "Favill", "email": "jfavillo@businesswire.com", "created": "05/05/2021" },
    { "first_name": "Maxwell", "last_name": "Southwick", "email": "msouthwickp@nationalgeographic.com", "created": "03/11/2022" },
    { "first_name": "Corny", "last_name": "Carlson", "email": "ccarlsonq@globo.com", "created": "12/04/2020" },
    { "first_name": "Christiano", "last_name": "Clayfield", "email": "cclayfieldr@twitpic.com", "created": "09/07/2021" },
    { "first_name": "Lorri", "last_name": "Yurenin", "email": "lyurenins@cnbc.com", "created": "05/04/2020" },
    { "first_name": "Giraldo", "last_name": "Pymar", "email": "gpymart@xing.com", "created": "24/09/2020" },
    { "first_name": "Ricard", "last_name": "Keming", "email": "rkemingu@intel.com", "created": "06/08/2021" },
    { "first_name": "Nance", "last_name": "Date", "email": "ndatev@trellian.com", "created": "04/09/2020" },
    { "first_name": "Ophelie", "last_name": "Loughman", "email": "oloughmanw@fc2.com", "created": "25/02/2021" },
    { "first_name": "Chastity", "last_name": "Gromley", "email": "cgromleyx@woothemes.com", "created": "21/07/2021" },
    { "first_name": "Wilhelmina", "last_name": "Isac", "email": "wisacy@java.com", "created": "26/09/2021" },
    { "first_name": "Margaretha", "last_name": "Martijn", "email": "mmartijnz@typepad.com", "created": "03/06/2020" },
    { "first_name": "Domini", "last_name": "Kitter", "email": "dkitter10@pcworld.com", "created": "12/07/2020" },
    { "first_name": "Millisent", "last_name": "Mawman", "email": "mmawman11@tiny.cc", "created": "17/06/2022" },
    { "first_name": "Fionnula", "last_name": "Feldmesser", "email": "ffeldmesser12@hp.com", "created": "22/03/2020" },
    { "first_name": "Sherrie", "last_name": "Brummitt", "email": "sbrummitt13@yelp.com", "created": "23/02/2022" },
    { "first_name": "Ciel", "last_name": "Roches", "email": "croches14@cam.ac.uk", "created": "14/01/2020" },
    { "first_name": "Lynne", "last_name": "Mendes", "email": "lmendes15@csmonitor.com", "created": "08/12/2021" },
    { "first_name": "Siouxie", "last_name": "Honsch", "email": "shonsch16@smh.com.au", "created": "20/07/2020" },
    { "first_name": "Korey", "last_name": "Kibbel", "email": "kkibbel17@cbslocal.com", "created": "20/12/2022" },
    { "first_name": "Michelle", "last_name": "Pittendreigh", "email": "mpittendreigh18@eepurl.com", "created": "28/03/2020" },
    { "first_name": "Lucita", "last_name": "Mallabone", "email": "lmallabone19@google.com.br", "created": "20/04/2020" },
    { "first_name": "Dur", "last_name": "Sapir", "email": "dsapir1a@bandcamp.com", "created": "16/12/2021" },
    { "first_name": "Ardisj", "last_name": "Wimmer", "email": "awimmer1b@ow.ly", "created": "11/10/2021" },
    { "first_name": "Whitby", "last_name": "O'Kinedy", "email": "wokinedy1c@people.com.cn", "created": "30/08/2021" },
    { "first_name": "Cyrus", "last_name": "Ondrich", "email": "condrich1d@hexun.com", "created": "06/12/2021" }
];

let showEntries = 10;
let currentPage = 1;
let currentSortColumn = '';
let currentSortOrder = 'asc';

const list = document.getElementById("list");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const entriesSelect = document.getElementById("entriesSelect");
const filterButtons = document.querySelectorAll(".filter-btn");

const createListItem = (firstName, lastName, email, created) => {
    return `
                <li class="group grid grid-cols-3 items-center md:grid-cols-5 bg-white p-2 rounded-sm overflow-hidden text-xs transition-all hover:scale-110">
                    <span>${firstName}</span>
                    <span>${lastName}</span>
                    <span class="hidden md:inline truncate">${email}</span>
                    <span>${created}</span>
                    <button class="ml-auto border border-blue-600 rounded-sm p-2 hidden md:block opacity-0 group-hover:opacity-100">Go to workplace</button>
                </li>
            `;
};

const sortData = (data, column, order) => {
    console.log(column, order)
    return data.sort((a, b) => {
        const valA = a[column].toLowerCase();
        const valB = b[column].toLowerCase();
        if (valA < valB) return order === 'asc' ? -1 : 1;
        if (valA > valB) return order === 'asc' ? 1 : -1;
        return 0;
    });
};

const renderList = () => {
    list.innerHTML = '';
    const start = (currentPage - 1) * showEntries;
    const end = Math.min(start + showEntries, data.length);

    const sortedData = currentSortColumn ? sortData(data.slice(), currentSortColumn, currentSortOrder) : data;

    console.log(sortedData);

    for (let i = start; i < end; i++) {
        list.innerHTML += createListItem(sortedData[i].first_name, sortedData[i].last_name, sortedData[i].email, sortedData[i].created);
    }
};

const updateButtons = () => {
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage * showEntries >= data.length;
};

const changePage = (direction) => {
    currentPage += direction;
    renderList();
    updateButtons();
};

prevBtn.addEventListener("click", () => changePage(-1));
nextBtn.addEventListener("click", () => changePage(1));

entriesSelect.addEventListener("change", (event) => {
    showEntries = parseInt(event.target.value, 10);
    currentPage = 1;
    renderList();
    updateButtons();
});

filterButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        debugger
        const column = event.currentTarget.dataset.sort;
        const order = event.currentTarget.dataset.order;
        currentSortColumn = column;
        currentSortOrder = order === 'asc' ? 'desc' : 'asc';
        event.currentTarget.dataset.order = currentSortOrder;

        filterButtons.forEach(btn => {
            const icon = btn.querySelector('i');
            icon.classList.remove('rotate-180');
            btn.querySelector('i').removeAttribute('data-active-filter');
        });

        const icon = event.currentTarget.querySelector('i');
        if (currentSortOrder === 'desc') {
            icon.classList.add('rotate-180');
        } else {
            icon.classList.remove('rotate-180');
        }
        icon.setAttribute('data-active-filter', 'true');

        renderList();
    });
});

renderList();
updateButtons();