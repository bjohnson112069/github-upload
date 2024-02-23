const nav = document.querySelector(".nav-list");
const links = nav.querySelectorAll("li");
const sections = document.querySelectorAll("section");

function handleNavClick() {
          links.forEach(link => {
                    link.classList.remove("active");
                    this.classList.add("active");
          })
}

links.forEach(link => link.addEventListener("click", handleNavClick));
          

if (history.scrollRestoration) {
                    history.scrollRestoration = 'manual';
          } else {
                    window.onbeforeunload = function () {
                    window.scrollTo(0, 0);
          }
}

window.addEventListener("scroll", () => {
          sections.forEach(section => {
                    const top = Math.round(window.scrollY);
                    const offset = section.offsetTop - 150;
                    const height = section.offsetHeight;
                    const id = section.id;

                    console.log(`top: ${top}, sectionTop: ${offset}, sectionBottom: ${offset + height}`)

                    // if scollY value is within the section...
                    if (top >= offset && top < offset + height) {
                              const anchor = nav.querySelector(`[href="#${id}"]`);
                              const activeLink = anchor.parentElement;
                              links.forEach(link => {
                                        link.classList.remove("active");
                              })
                              activeLink.classList.add("active");
                    }
          })
})


