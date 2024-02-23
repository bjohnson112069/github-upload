const view = document.querySelector("#view-collection");

view.addEventListener("click", () => {
          const collection = document.querySelector("#collection");

          collection.scrollIntoView({  behavior: "smooth", block: "start", inline: "nearest" });
})