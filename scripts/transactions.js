const transactions = [
    {
        id: 1,
        description: "Energy",
        amount: -50000,
        date: "23/01/2021"
    },
    {
        id: 2,
        description: "Free lance work",
        amount: 500000,
        date: "24/01/2021"
    },
    {
        id: 3,
        description: "Internet service",
        amount: -20000,
        date: "25/01/2021"
    },
    {
        id: 4,
        description: "Consulting service",
        amount: 400000,
        date: "26/01/2021"
    }
]

const Transaction = {
    revenues() {

    },
    expenses(){

    },
    total(){

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

        const amount = Utils.formatCurrency(transaction.amount)

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

const Utils = {
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
});

