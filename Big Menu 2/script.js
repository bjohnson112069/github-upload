
function loadContent() {
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenu = document.querySelector('#mobile-menu');
    const data = [
        {
            name: 'furniture',
            menus: [
                {
                    heading: 'adipiscing ',
                    items: [
                        'ipsum dolor', 'sit amet', 'adipiscing', 'sed do eiusmod', 'tempor ', 'incididunt'
                    ]
                },
                {
                    heading: 'consectetur',
                    items: [
                        'magna aliqua', 'Ut enim', 'ad minim', 'veniam', 'quis nostrud', 'exercitation', 'ullamco', 'laboris'
                    ]
                }
            ]
        },
        {
            name: 'lighting',
            menus: [
                {
                    heading: 'Maecenas',
                    items: [
                        'phasellus ', 'odio ', 'quam aliquam', 'fusce ex', 'Pharetra', 'egestas'
                    ]
                },
                {
                    heading: 'Volutpat',
                    items: [
                        'elementum', 'consectetur', 'erat', 'curabitur', 'mus aptent', 'faucibus', 'nulla', 'litora'
                    ]
                },
                {
                    heading: 'Suspendisse',
                    items: [
                        'cras', 'arcu', 'porttitor', 'vel facilisis', 'lectus', 'enim', 'venenatis', 'eleifend', 'justo', 'sodales'
                    ]
                }
            ]
        },
        {            
            name: 'decor',
            menus: [
                {
                    heading: 'Decoration',
                    items: [
                        'Vases', 'Jars', 'Posers', 'Photo frames', 'Sculptures', 'Wall', 'Bordur', 'Alarm clocks', 'Pictures', 'Picture frames'
                    ]
                },
                {
                    heading: 'Office & Small Storage',
                    items: [
                        'Boxes', 'Door Stoppers', 'Curves', 'Weekly magazine storage', 'Wood storage', 'Umbrella stand', 'Key cabinet', 'Calendars & notebooks', 'Pedal Buckets'
                    ]
                },
                {
                    heading: 'Bathroom fittings',
                    items: [
                        'Scented candles', 'Candlesticks', 'Lanterns', 'Candelabra', 'Kerosene & Oil Lamps', 'Laundry baskets', 'Accessories'
                    ]
                },
                {
                    heading: 'More fittings',
                    items: [
                        'Toothbrush holders', 'Toilet roll holders', 'Toilet brushes', 'Soap pumps', 'Soap cups', 'Laundry baskets', 'Towel rails'
                    ]
                }
            ]
        },
        {
            name: 'service',
            menus: [
                {
                    heading: 'adipiscing',
                    items: [
                        'Libero', 'aptent', 'finibus', 'viverra', 'arcu dictum', 'morbi', 'odor', 'amet'
                    ]
                },
                {
                    heading: 'Inceptos ',
                    items: [
                        'blandit', 'etiam', 'eleifend', 'volutpat', 'magnis lobortis', 'condimentum', 'dis potenti', 'diam', 'nascetur'
                    ]
                },
                {
                    heading: 'condimentum',
                    items: [
                        'sodales', 'arcu', 'Blandit', 'vel class', 'vitae', 'vulputate', 'ridiculus', 'aenean', 'elit vel'
                    ]
                }
            ]
        },
        {
            name: 'textiles',
            menus: [
                {
                    heading: 'Natoque',
                    items: [
                        'tempus', 'bibendum', 'vulputate', 'pharetra', 'egestas'
                    ]
                },
                {
                    heading: 'vehicula',
                    items: [
                        'Varius', 'sagittis', 'blandit'
                    ]
                },
                {
                    heading: 'Faucibus ',
                    items: [
                        'risus', 'at fringilla', 'et placerat', 'nostra', 'facilisis', 'nibh placerat', 'dolor', 'ligula'
                    ]
                },
                {
                    heading: 'Sem gravida',
                    items: [
                        'cursus', 'nisi finibus', 'faucibus', 'ad morbi', 'mollis', 'elit erat'
                    ]
                }
            ]
        },
        {
            name: 'jewlery',
            menus: [
                {
                    heading: 'facilisi',
                    items: [
                        'Vehicula', 'vivamus', 'volutpat', 'molestie', 'nascetur', 'ultricies', 'rutrum', 'ridiculus'
                    ]
                },
                {
                    heading: 'Nibh elementum',
                    items: [
                        'velit', 'sed nibh', 'litora', 'dis imperdiet', 'natoque', 'convallis', 'pellentesque', 'iaculis', 'platea'
                    ]
                },
                {
                    heading: 'Porttitor',
                    items: [
                        'ut ornare', 'ligula', 'quam', 'ullamcorper', 'mi class', 'placerat', 'varius', 'scelerisque', 'consectetur'
                    ]
                }
            ]
        },
        {
            name: 'outdoor',
            menus: [
                {
                    heading: 'Aeget diam',
                    items: [
                        'fames', 'nam pretium', 'magnis', 'gravida', 'dapibus primis', 'vivamus, nulla', 'at nam porta', 'ipsum'
                    ]
                }
            ]

        }
    ];
    
    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function generateMenus(num) {
        const item = data[num];
        const menus = item.menus;

        const HTML = menus.map((menu, index) => {
            const li = document.createElement('li');
            li.classList.add('menu');
            li.setAttribute('id', `menu-${index}`)

            const h1 = document.createElement('h1');
            h1.textContent = menu.heading;
            li.appendChild(h1);

            const list = document.createElement('ul');
            list.classList.add('menu-items');

            const items = menu.items;
            list.innerHTML = items.map(item => `<li class="menu-item">
                <a href="#" class="btn menu-link">${item}</a>
                </li>`).join('');

            li.appendChild(list);

            return li.outerHTML;
        }).join('');

        return HTML;
    }

    function handleNavLinkEvent(e) {
        e.preventDefault();

        const selectedItem = this.closest('.nav-item');
        navLinks.forEach(link => {
            const navItem = link.closest('.nav-item');
            const menus =navItem.querySelector('.menus');
            if (navItem === selectedItem) {
                navItem.classList.add('active');
                menus.innerHTML = generateMenus(Number(link.dataset.value));
            } else {
                navItem.classList.remove('active');
                menus.innerHTML = '';
            }
        });

    }

    // On page load... 

    // Event Listeners
    navLinks.forEach(link => link.addEventListener ('click', handleNavLinkEvent));
    mobileMenu.addEventListener('click', (e) => {
        e.target.classList.toggle('expanded');
    });
}

window.addEventListener('DOMContentLoaded', loadContent);