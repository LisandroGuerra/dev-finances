const transactions = [
    {
        id: 1,
        description: "Energy",
        amount: -50010,
        date: "23/01/2021"
    },
    {
        id: 2,
        description: "Free lance work",
        amount: 500020,
        date: "24/01/2021"
    },
    {
        id: 3,
        description: "Internet service",
        amount: -20030,
        date: "25/01/2021"
    },
    {
        id: 4,
        description: "Consulting service",
        amount: 200040,
        date: "26/01/2021"
    }
]

const Transaction = {
    revenues() {
        let revenues = 0;
        transactions.forEach(transaction => {
            if (transaction.amount > 0) {
                revenues += transaction.amount
            }
        })

        return revenues
    },

    expenses(){
        let expenses = 0;
        transactions.forEach(transaction => {
            if (transaction.amount < 0) {
                expenses += transaction.amount
            }
        })
        return expenses
    },

    total(){
        return this.revenues() + this.expenses()
    }
}

const table = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = table.innerHTMLTransaction(transaction)

        table.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "revenue" : "expense"

        const amount = utils.formatCurrency(transaction.amount)

        const row = `
            <td class="description">${transaction.description}</td>
            <td class=${CSSclass}>${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remove Transaction">
            </td>
            `
        return row
    }
}

const balance = {
    updateBalance() {
        document
            .getElementById('balanceRevenue')
            .innerHTML = utils.formatCurrency(Transaction.revenues())

        document
            .getElementById('balanceExpense')
            .innerHTML = utils.formatCurrency(Transaction.expenses())

        document
            .getElementById('balanceTotal')
            .innerHTML = utils.formatCurrency(Transaction.total())
    }
}

const utils = {
    formatCurrency(value) {
        return (Number(value) / 100)
            .toLocaleString("en", {
                style: "currency",
                currency: "USD"
            })
    }
}

transactions.forEach(transaction => {
    table.addTransaction(transaction)
    balance.updateBalance()
});

