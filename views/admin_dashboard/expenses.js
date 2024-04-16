const expenseForm = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const totalAmountElement = document.getElementById("total-amount");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function renderExpenses() {
    expenseList.innerHTML = "";
    let totalAmount = 0;
  
    expenses.forEach((expense, i) => {
        const expenseRow = document.createElement("tr");
        expenseRow.innerHTML = `
            <td>${expense.name}</td>
            <td> ₹${expense.amount}</td>
            <td class="delete-btn" data-id="${i}">Delete</td>
        `;
        expenseList.appendChild(expenseRow);
        totalAmount += expense.amount;
    });

    totalAmountElement.textContent = totalAmount.toFixed(2);
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addExpense(event) {
    event.preventDefault();
  
    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseName = expenseNameInput.value;
    const expenseAmount = parseFloat(expenseAmountInput.value);
  
    expenseNameInput.value = "";
    expenseAmountInput.value = "";
  
    if (!expenseName || isNaN(expenseAmount)) {
        alert("Please enter valid expense details.");
        return;
    }
  
    expenses.push({ name: expenseName, amount: expenseAmount });
    renderExpenses();
}

function deleteExpense(event) {
    if (event.target.classList.contains("delete-btn")) {
        const expenseIndex = parseInt(event.target.getAttribute("data-id"));
        expenses.splice(expenseIndex, 1);
        renderExpenses();
    }
}

expenseForm.addEventListener("submit", addExpense);
expenseList.addEventListener("click", deleteExpense);

renderExpenses();
