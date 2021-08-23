const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("transactions"))  || []
    },

    set(transactions) {
        localStorage.setItem("transactions", 
        JSON.stringify(transactions))
    }
}

const Transaction = {
    all: Storage.get(),

    add(transaction) {
        Transaction.all.push(transaction)
        App.reload()
    },

    remove(index) {
        Transaction.all.splice(index, 1)

        App.reload()
    },

    revenues() {
        let revenues = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.amount > 0) {
                revenues += transaction.amount
            }
        })

        return revenues
    },

    expenses(){
        let expenses = 0;
        Transaction.all.forEach(transaction => {
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

const Balance = {
    updateBalance() {
        document
            .getElementById('balanceRevenue')
            .innerHTML = Utils.formatCurrency(Transaction.revenues())

        document
            .getElementById('balanceExpense')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())

        document
            .getElementById('balanceTotal')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    }
}

const Table = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = Table.innerHTMLTransaction(transaction, index)
        tr.dataset.index = index

        Table.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction, index) {
        const CSSclass = transaction.amount > 0 ? "revenue" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const row = `
            <td class="description">${transaction.description}</td>
            <td class=${CSSclass}>${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remove Transaction">
            </td>
            `
        return row
    },

    clearTable() {
        Table.transactionsContainer.innerHTML = ""
    }
}

const Utils = {
    formatAmount(amount) {
        return Number(amount) * 100
    },

    formatDate(date) {
        date = new Date(date)
        return date.toLocaleDateString('pt', {timeZone: 'UTC'})
    },

    formatCurrency(value) {
        return (Number(value) / 100)
            .toLocaleString("ger", {
                style: "currency",
                currency: "EUR"
            })
    }
}

const Form = {
    description: document.querySelector('#description'),
    amount: document.querySelector('#amount'),
    date: document.querySelector('#date'),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    validateFields() {
        const {description, amount, date} = Form.getValues()

        if (description.trim() === "" ||
            amount.trim() === "" ||
            date.trim() === "") {
                throw new Error ("Fill all fields, please.")
            }
    },

    formatData() {
        let {description, amount, date} = Form.getValues()

        amount = Utils.formatAmount(amount)
        
        date = Utils.formatDate(date)
    
        return {
            description,
            amount,
            date
        }
    },

    saveTransaction(transaction) {
        Transaction.add(transaction)
    },

    clearFields() {
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event) {
        event.preventDefault()

        try {
            Form.validateFields()

            const transaction = Form.formatData()

            Form.saveTransaction(transaction)

            Form.clearFields()

            Modal.close( )

        } catch (error) {
            alert(error.message)
        }
        
    },

    
}

const App = {
    init() {
        Transaction.all.forEach(transaction => {
            Table.addTransaction(transaction)
        })

        Balance.updateBalance()

        Storage.set(Transaction.all)
    },

    reload(){
        Table.clearTable()
        App.init()
    },
}

App.init()
