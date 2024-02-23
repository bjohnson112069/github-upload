const transactions = document.querySelectorAll(".transaction");

function handleTransactionClick() {
          const invoice = document.querySelector("#invoice");

          invoice.classList.toggle("active");
}

transactions.forEach(transaction => transaction.addEventListener("click", handleTransactionClick));