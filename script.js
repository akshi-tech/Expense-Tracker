// Select Elements
const expenseForm = document.getElementById("expenseForm");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const date = document.getElementById("date");
const description = document.getElementById("description");

const expenseTable = document.getElementById("expenseTable");

const totalExpense = document.getElementById("totalExpense");
const remainingBudget = document.getElementById("remainingBudget");

// Budget
let budget = 5000;

// Current Total
let total = 0;

// When form is submitted
expenseForm.addEventListener("submit", function(event){

    event.preventDefault();

    let expenseAmount = Number(amount.value);

    total += expenseAmount;

    totalExpense.textContent = "₹" + total;
    remainingBudget.textContent = "₹" + (budget-total);

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