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

const foodTotal = document.getElementById("foodTotal");
const travelTotal = document.getElementById("travelTotal");
const shoppingTotal = document.getElementById("shoppingTotal");
const billsTotal = document.getElementById("billsTotal");
const entertainmentTotal = document.getElementById("entertainmentTotal");
const othersTotal = document.getElementById("othersTotal");

const budgetInput = document.getElementById("budgetInput");
const saveBudget = document.getElementById("saveBudget");

// ===============================
// Variables
// ===============================
let budget = Number(localStorage.getItem("budget")) || 0;

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

let total = 0;

let editIndex = -1;

let expenseChart;

// ===============================
// Display Expenses Function
// ===============================
function displayExpenses() {


    expenseTable.innerHTML = "";

    total = 0;

    let food = 0;
let travel = 0;
let shopping = 0;
let bills = 0;
let entertainment = 0;
let others = 0;

    expenses.forEach(function(expense, index) {

        total += expense.amount;

        if (expense.category === "Food") {
    food += expense.amount;
}
else if (expense.category === "Travel") {
    travel += expense.amount;
}
else if (expense.category === "Shopping") {
    shopping += expense.amount;
}
else if (expense.category === "Bills") {
    bills += expense.amount;
}
else if (expense.category === "Entertainment") {
    entertainment += expense.amount;
}
else {
    others += expense.amount;
}

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${expense.date}</td>
            <td>${expense.category}</td>
            <td>${expense.description}</td>
            <td>₹${expense.amount}</td>
            <td>
    <button onclick="editExpense(${index})">✏️</button>
    <button onclick="deleteExpense(${index})">❌</button>
</td>
        `;

        expenseTable.appendChild(row);

    });

    foodTotal.textContent = "🍔 Food : ₹" + food;
travelTotal.textContent = "🚌 Travel : ₹" + travel;
shoppingTotal.textContent = "🛍 Shopping : ₹" + shopping;
billsTotal.textContent = "📄 Bills : ₹" + bills;
entertainmentTotal.textContent = "🎬 Entertainment : ₹" + entertainment;
othersTotal.textContent = "📦 Others : ₹" + others;

    totalExpense.textContent = "₹" + total;
    remainingBudget.textContent = "₹" + (budget - total);
}

    function updateChart(food, travel, shopping, bills, entertainment, others) {

    if (expenseChart) {
        expenseChart.destroy();
    }

    const ctx = document.getElementById("expenseChart");

    expenseChart = new Chart(ctx, {

        type: "pie",

        data: {

            labels: [
                "Food",
                "Travel",
                "Shopping",
                "Bills",
                "Entertainment",
                "Others"
            ],

            datasets: [{

                data: [
                    food,
                    travel,
                    shopping,
                    bills,
                    entertainment,
                    others
                ],

                backgroundColor: [
                    "#8B5CF6",
                    "#3B82F6",
                    "#06B6D4",
                    "#F59E0B",
                    "#EF4444",
                    "#10B981"
                ]

            }]

        }

    });

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
expenseForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let expenseAmount = Number(amount.value);

    let expense = {
        amount: expenseAmount,
        category: category.value,
        date: date.value,
        description: description.value
    };

    if (editIndex === -1) {
        expenses.push(expense);
    } else {
        expenses[editIndex] = expense;
        editIndex = -1;
    }

    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();

    expenseForm.reset();

});

// ===============================
// Run When Page Opens
// ===============================
displayExpenses();

function deleteExpense(index) {

    expenses.splice(index, 1);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();

}   

function editExpense(index) {

    let expense = expenses[index];

    amount.value = expense.amount;
    category.value = expense.category;
    date.value = expense.date;
    description.value = expense.description;

    editIndex = index;

    alert("Editing expense #" + index);

}