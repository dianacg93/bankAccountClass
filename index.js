class BankAccount {
    constructor(type, money, backupAccount=null){
        this.type = type;
        this.money = money;
        this.transactionHistory = [];
        this.backupAccount = backupAccount;
    }

    withdraw(amount) {
        const previousBalance = this.money;
        this.money = this.money - amount;

        this.transactionHistory.push({
            previousBalance: previousBalance,
            transactionType: 'withdrawal',
            transactionAmount: amount,
            currentBalance: this.money,
        })

        if (this.money < 0){
            //change  to positive number
            const overdrawnAmount = this.money * -1;
            // withdraw from savings (backup acct)
            this.backupAccount.withdraw(overdrawnAmount);

            //deposit from savings to checking
            this.deposit(overdrawnAmount);

            console.log('--overdraft--');
        }
    }

    deposit(amount) {
        const previousBalance = this.money;
        this.money = this.money + amount;

        this.transactionHistory.push({
            previousBalance: previousBalance,
            transactionType: "deposit",
            transactionAmount: amount,
            currentBalance: this.money,
        })
    }

    showBalance() {
        return this.money;
    }
}

const checkingAccount = new BankAccount('checkings', 1200);
console.log(checkingAccount)

checkingAccount.deposit(50)
console.log(checkingAccount)

checkingAccount.withdraw(2000)
console.log(checkingAccount)