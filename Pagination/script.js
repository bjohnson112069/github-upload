
function loadContent() {

    // Marcin Malecki's thumbnail hack
    if (navigator.userAgent.includes("Headless")) {
        document.body.style.setProperty("padding-block-end", "0");
        document.body.style.setProperty("margin-block-start", "152px");
        document.body.style.setProperty("min-block-size", "0");
        document.body.style.setProperty("block-size", "calc(100vh - 304px)");
        document.body.style.setProperty("position", "relative");
    }

    function createPaginationModule(module) {

        if (!(module instanceof Element)) {
            throw new Error('No module passed in');
        }

        const paginationNumbers = module.querySelector("#pagination-numbers");
        const nextButton = module.querySelector("#next-button");
        const prevButton = module.querySelector("#prev-button");
        const itemCount = module.querySelector('.paginated-list').dataset.itemCount;
        const paginationLimit = 10;
        const pageCount = Math.ceil(itemCount / paginationLimit);
        let currentPage;

        function appendPageNumber(index) {
            const pageNumber = document.createElement("button");
            pageNumber.className = "btn pagination-number";
            pageNumber.innerHTML = index;
            pageNumber.setAttribute("page-index", index);
            pageNumber.setAttribute("aria-label", "Page " + index);
            paginationNumbers.appendChild(pageNumber);
        };

        function getPaginationNumbers() {
            for (let i = 1; i <= pageCount; i++) {
                appendPageNumber(i);
            }
        };

        function handleActivePageNumber() {
            const numbers = module.querySelectorAll(".pagination-number");

            // iterate through all the numbers ...
            // mark the current page active
            numbers.forEach(number => {
                const pageIndex = parseInt(number.getAttribute("page-index"));
                pageIndex == currentPage ? 
                    number.classList.add("active") : 
                    number.classList.remove("active");
            });
        };

        function disableButton(button) {
            button.classList.add("disabled");
            button.setAttribute("disabled", true);
        };

        function enableButton(button) {
            button.classList.remove("disabled");
            button.removeAttribute("disabled");
        };

        function handlePageButtonsStatus() {
            if (currentPage === 1) {
                disableButton(prevButton);
            } else {
                enableButton(prevButton);
            }

            if (pageCount === currentPage) {
                disableButton(nextButton);
            } else {
                enableButton(nextButton);
            }
        };

        function setCurrentPage(pageNum) {
            currentPage = pageNum;

            handleActivePageNumber();
            handlePageButtonsStatus();

            const prevRange = (pageNum - 1) * paginationLimit;
            const currRange = pageNum * paginationLimit;

            // iterative through all the list items ...
            // display/unhide items within range

            // listItems.forEach((item, index) => {
            //     item.classList.add("hidden");
            //     if (index >= prevRange && index < currRange) {
            //         item.classList.remove("hidden");
            //     }
            // });
            
        };



        // on instantiation ...
        getPaginationNumbers();
        setCurrentPage(1);

        // Event Listeners
        const numbers = module.querySelectorAll(".pagination-number");
        numbers.forEach(number => {
            const pageIndex = parseInt(number.getAttribute("page-index"));

            if (pageIndex) {
                number.addEventListener("click", () => setCurrentPage(pageIndex));
            }
        });

        prevButton.addEventListener("click", () => setCurrentPage(currentPage - 1));
        nextButton.addEventListener("click", () => setCurrentPage(currentPage + 1));
        

    }



    // On page load... 
    const modules = document.querySelectorAll('.pagination');
    modules.forEach(module => createPaginationModule(module));
}

window.addEventListener('DOMContentLoaded', loadContent);