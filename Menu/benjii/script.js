const toggleSubmenu = document.getElementById("open-submenu");
toggleSubmenu.addEventListener("click", () => {
    const subMenu = toggleSubmenu.querySelector("div");
    const icon = toggleSubmenu.querySelector("i");
    subMenu.classList.toggle("max-h-[500px]");


    if (subMenu.classList.contains("max-h-[500px]")) {
        icon.classList = "fa fa-chevron-down";
    } else {
        icon.classList = "fa fa-chevron-up";
    }
});