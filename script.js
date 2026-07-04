// ===============================
// Select Elements
// ===============================
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

// ===============================
// Variables
// ===============================
let budget = Number(localStorage.getItem("budget")) || 0;

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

let total = 0;

// ===============================
// Display Expenses Function
// ===============================
function displayExpenses() {

    expenseTable.innerHTML = "";

    total = 0;

    expenses.forEach(function(expense) {

        total += expense.amount;

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${expense.date}</td>
            <td>${expense.category}</td>
            <td>${expense.description}</td>
            <td>₹${expense.amount}</td>
            <td>❌</td>
        `;

        expenseTable.appendChild(row);

    });

    totalExpense.textContent = "₹" + total;
    remainingBudget.textContent = "₹" + (budget - total);
}

// ===============================
// Save Budget
// ===============================
saveBudget.addEventListener("click", function () {

    budget = Number(budgetInput.value);

    localStorage.setItem("budget", budget);

    remainingBudget.textContent = "₹" + (budget - total);

    budgetInput.value = "";

});

// ===============================
// Add Expense
// ===============================
expenseForm.addEventListener("submit", function(event){

    event.preventDefault();

    let expense = {

        amount: Number(amount.value),
        category: category.value,
        date: date.value,
        description: description.value

    };

    expenses.push(expense);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();

    expenseForm.reset();

});

// ===============================
// Run When Page Opens
// ===============================
displayExpenses();