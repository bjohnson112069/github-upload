const panels = document.querySelectorAll(".panel");

// when someone clicks on a panel
panels.forEach((panel) => {
     panel.addEventListener("click", () => {
          removeActiveClasses();
          panel.classList.add("active");
          const panelContent = panel.querySelector(".panel--content");
          panelContent.classList.remove("hidden");
     });
});

const removeActiveClasses = () => {
     panels.forEach((panel) => {
          panel.classList.remove("active");
          const panelContent = panel.querySelector(".panel--content");
          panelContent.classList.add("hidden");
     });
};
