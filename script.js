// Select Elements
const expenseForm = document.getElementById("expenseForm");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const date = document.getElementById("date");
const description = document.getElementById("description");

const expenseTable = document.getElementById("expenseTable");

const totalExpense = document.getElementById("totalExpense");
const remainingBudget = document.getElementById("remainingBudget");

const budgetInput = document.getElementById("budgetInput");
const saveBudget = document.getElementById("saveBudget");

// Budget
let budget = 0;

// Current Total
let total = 0;

// Save Budget
saveBudget.addEventListener("click", function () {

    budget = Number(budgetInput.value);

    remainingBudget.textContent = "₹" + (budget - total);

    budgetInput.value = "";

});

// Add Expense
expenseForm.addEventListener("submit", function (event) {

    event.preventDefault();

    let expenseAmount = Number(amount.value);

    total += expenseAmount;

    totalExpense.textContent = "₹" + total;
    remainingBudget.textContent = "₹" + (budget - total);

    let row = document.createElement("tr");

    row.innerHTML = `
        <td>${date.value}</td>
        <td>${category.value}</td>
        <td>${description.value}</td>
        <td>₹${expenseAmount}</td>
        <td>❌</td>
    `;

    expenseTable.appendChild(row);

    expenseForm.reset();

});